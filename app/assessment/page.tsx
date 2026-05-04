'use client';

import { Suspense, useEffect, useReducer, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  INITIAL_STATE,
  WIZARD_STEPS,
  clearWizard,
  persistWizard,
  readWizard,
  wizardReducer,
  type StepNumber,
} from './_components/wizard-state';
import { WizardShell } from './_components/wizard-shell';
import { Step1Welcome, isStep1Valid } from './_components/step-1-welcome';
import { Step2BasicInfo, isStep2Valid } from './_components/step-2-basic-info';
import { Step3Location, isStep3Valid } from './_components/step-3-location';
import { Step4RedFlags } from './_components/step-4-red-flags';
import { Step5Onset, isStep5Valid } from './_components/step-5-onset';
import { Step6Quality, isStep6Valid } from './_components/step-6-quality';
import { Step7Pattern, isStep7Valid } from './_components/step-7-pattern';
import { Step8Functional, isStep8Valid } from './_components/step-8-functional';
import { Step9FreeText } from './_components/step-9-free-text';
import { Step10Submit } from './_components/step-10-submit';
import type { BodyRegion } from '@/lib/logic-engine';
import { BODY_REGIONS } from '@/lib/logic-engine/types';

export default function AssessmentPage() {
  return (
    <Suspense fallback={<div className="container-content min-h-screen pt-32" aria-busy="true" />}>
      <AssessmentWizard />
    </Suspense>
  );
}

function AssessmentWizard() {
  const router = useRouter();
  const params = useSearchParams();
  const [state, dispatch] = useReducer(wizardReducer, INITIAL_STATE);
  const [hydrated, setHydrated] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    const restored = readWizard();
    if (restored) {
      dispatch({ type: 'restore', state: restored });
    } else {
      const region = params.get('region');
      if (region && BODY_REGIONS.includes(region as BodyRegion)) {
        dispatch({ type: 'set', field: 'bodyRegion', value: region as BodyRegion });
      }
    }
    setHydrated(true);
  }, [params]);

  useEffect(() => {
    if (hydrated) persistWizard(state);
  }, [state, hydrated]);

  const setField = (field: string, value: unknown) =>
    dispatch({ type: 'set', field: field as Parameters<typeof dispatch>[0] extends { field: infer F } ? F : never, value: value as never });

  const a = state.answers;
  const hasRedFlags = (a.redFlags ?? []).length > 0;

  async function handleSubmit() {
    setSubmitStatus('submitting');
    setSubmitError(null);
    try {
      const payload = {
        age: a.age,
        sexAtBirth: a.sexAtBirth,
        heightCm: a.heightCm,
        weightKg: a.weightKg,
        sport: a.sport,
        activityFrequency: a.activityFrequency,
        bodyRegion: a.bodyRegion,
        bodySubregion: a.bodySubregion,
        redFlags: a.redFlags ?? [],
        onset: a.onset,
        duration: a.duration,
        painQuality: a.painQuality,
        severity: a.severity,
        worstWhen: a.worstWhen,
        worseTriggers: a.worseTriggers ?? [],
        betterTriggers: a.betterTriggers ?? [],
        functionalImpact: a.functionalImpact,
        progression: a.progression,
        freeText: a.freeText,
      };
      const res = await fetch('/api/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error ?? 'Could not generate your report.');
      }
      const data = (await res.json()) as { id: string };
      clearWizard();
      router.push(`/report/${data.id}`);
    } catch (err) {
      setSubmitStatus('error');
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  function nextOrJump() {
    if (state.step === 4 && hasRedFlags) {
      dispatch({ type: 'goto', step: 10 });
    } else {
      dispatch({ type: 'next' });
    }
  }

  function startOver() {
    if (typeof window !== 'undefined') {
      const ok = window.confirm('Start over? Your current answers will be cleared.');
      if (!ok) return;
    }
    clearWizard();
    dispatch({ type: 'reset' });
  }

  const back = state.step > 1 ? () => dispatch({ type: 'prev' }) : undefined;
  const startOverHandler = state.step > 1 ? startOver : undefined;

  if (!hydrated) {
    return <div className="container-content min-h-screen pt-32" aria-busy="true" />;
  }

  switch (state.step) {
    case 1:
      return (
        <WizardShell
          step={1}
          title="Welcome."
          subtitle="A short questionnaire that ends with a personalized awareness report."
          onNext={() => dispatch({ type: 'next' })}
          nextDisabled={!isStep1Valid(!!a.acknowledgedDisclaimer, !!a.acknowledgedAge)}
        >
          <Step1Welcome
            acknowledgedDisclaimer={!!a.acknowledgedDisclaimer}
            acknowledgedAge={!!a.acknowledgedAge}
            setField={(f, v) => dispatch({ type: 'set', field: f, value: v as never })}
          />
        </WizardShell>
      );
    case 2:
      return (
        <WizardShell
          step={2}
          title="Tell us a bit about you."
          onPrev={back}
          onStartOver={startOverHandler}
          onNext={() => dispatch({ type: 'next' })}
          nextDisabled={!isStep2Valid({ age: a.age, sport: a.sport, activityFrequency: a.activityFrequency })}
        >
          <Step2BasicInfo
            age={a.age}
            sexAtBirth={a.sexAtBirth}
            heightCm={a.heightCm}
            weightKg={a.weightKg}
            sport={a.sport}
            activityFrequency={a.activityFrequency}
            setField={(f, v) => dispatch({ type: 'set', field: f, value: v as never })}
          />
        </WizardShell>
      );
    case 3:
      return (
        <WizardShell
          step={3}
          title="Where does it hurt?"
          subtitle="Pick a region first, then tell us where in that region."
          onPrev={back}
          onStartOver={startOverHandler}
          onNext={() => dispatch({ type: 'next' })}
          nextDisabled={!isStep3Valid({ bodyRegion: a.bodyRegion, bodySubregion: a.bodySubregion })}
        >
          <Step3Location
            bodyRegion={a.bodyRegion}
            bodySubregion={a.bodySubregion}
            setField={(f, v) => dispatch({ type: 'set', field: f, value: v as never })}
          />
        </WizardShell>
      );
    case 4:
      return (
        <WizardShell
          step={4}
          title="Anything urgent?"
          onPrev={back}
          onStartOver={startOverHandler}
          onNext={nextOrJump}
          nextLabel={hasRedFlags ? 'Skip ahead to my report' : 'Continue'}
        >
          <Step4RedFlags
            redFlags={a.redFlags}
            setField={(f, v) => dispatch({ type: 'set', field: f, value: v as never })}
          />
        </WizardShell>
      );
    case 5:
      return (
        <WizardShell
          step={5}
          title="When did this start?"
          onPrev={back}
          onStartOver={startOverHandler}
          onNext={() => dispatch({ type: 'next' })}
          nextDisabled={!isStep5Valid({ onset: a.onset, duration: a.duration })}
        >
          <Step5Onset
            onset={a.onset}
            duration={a.duration}
            setField={(f, v) => dispatch({ type: 'set', field: f, value: v as never })}
          />
        </WizardShell>
      );
    case 6:
      return (
        <WizardShell
          step={6}
          title="What does it feel like?"
          onPrev={back}
          onStartOver={startOverHandler}
          onNext={() => dispatch({ type: 'next' })}
          nextDisabled={!isStep6Valid({ painQuality: a.painQuality, severity: a.severity })}
        >
          <Step6Quality
            painQuality={a.painQuality}
            severity={a.severity}
            setField={(f, v) => dispatch({ type: 'set', field: f, value: v as never })}
          />
        </WizardShell>
      );
    case 7:
      return (
        <WizardShell
          step={7}
          title="What is the pattern?"
          onPrev={back}
          onStartOver={startOverHandler}
          onNext={() => dispatch({ type: 'next' })}
          nextDisabled={!isStep7Valid({ worstWhen: a.worstWhen })}
        >
          <Step7Pattern
            worstWhen={a.worstWhen}
            worseTriggers={a.worseTriggers}
            betterTriggers={a.betterTriggers}
            setField={(f, v) => dispatch({ type: 'set', field: f, value: v as never })}
          />
        </WizardShell>
      );
    case 8:
      return (
        <WizardShell
          step={8}
          title="How is it affecting you?"
          onPrev={back}
          onStartOver={startOverHandler}
          onNext={() => dispatch({ type: 'next' })}
          nextDisabled={!isStep8Valid({ functionalImpact: a.functionalImpact, progression: a.progression })}
        >
          <Step8Functional
            functionalImpact={a.functionalImpact}
            progression={a.progression}
            setField={(f, v) => dispatch({ type: 'set', field: f, value: v as never })}
          />
        </WizardShell>
      );
    case 9:
      return (
        <WizardShell
          step={9}
          title="Anything else?"
          onPrev={back}
          onStartOver={startOverHandler}
          onNext={() => dispatch({ type: 'next' })}
          nextLabel="Continue to submit"
        >
          <Step9FreeText
            freeText={a.freeText}
            setField={(f, v) => dispatch({ type: 'set', field: f, value: v as never })}
          />
        </WizardShell>
      );
    case 10:
    default:
      return (
        <WizardShell
          step={WIZARD_STEPS as StepNumber}
          title={hasRedFlags ? 'Based on what you described, we want you to see someone soon.' : 'You\'re all set.'}
          subtitle={
            hasRedFlags
              ? 'We are skipping the rest of the questions and recommending professional evaluation.'
              : undefined
          }
          onPrev={back}
          onStartOver={startOverHandler}
          hideNext
        >
          <Step10Submit onSubmit={handleSubmit} status={submitStatus} error={submitError} />
        </WizardShell>
      );
  }
}
