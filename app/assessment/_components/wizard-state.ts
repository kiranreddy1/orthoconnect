'use client';

import type { AssessmentInput } from '@/lib/logic-engine';

export const WIZARD_STORAGE_KEY = 'orthoconnect.wizard.v1';
export const WIZARD_STEPS = 10;

export type StepNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type WizardAnswers = Partial<AssessmentInput> & {
  acknowledgedDisclaimer: boolean;
  acknowledgedAge: boolean;
};

export interface WizardState {
  step: StepNumber;
  answers: WizardAnswers;
  savedAt?: number;
}

export const INITIAL_STATE: WizardState = {
  step: 1,
  answers: {
    redFlags: [],
    worseTriggers: [],
    betterTriggers: [],
    acknowledgedDisclaimer: false,
    acknowledgedAge: false,
  },
};

const MAX_AGE_MS = 24 * 60 * 60 * 1000;

export type WizardAction =
  | { type: 'set'; field: keyof WizardAnswers; value: WizardAnswers[keyof WizardAnswers] }
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'goto'; step: StepNumber }
  | { type: 'restore'; state: WizardState }
  | { type: 'reset' };

export function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'set':
      return { ...state, answers: { ...state.answers, [action.field]: action.value } };
    case 'next': {
      const next = Math.min(state.step + 1, WIZARD_STEPS) as StepNumber;
      return { ...state, step: next };
    }
    case 'prev': {
      const prev = Math.max(state.step - 1, 1) as StepNumber;
      return { ...state, step: prev };
    }
    case 'goto':
      return { ...state, step: action.step };
    case 'restore':
      return action.state;
    case 'reset':
      return INITIAL_STATE;
  }
}

export function persistWizard(state: WizardState): void {
  if (typeof window === 'undefined') return;
  try {
    const withTs: WizardState = { ...state, savedAt: Date.now() };
    window.localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify(withTs));
  } catch {
    // storage may be unavailable (private mode, full quota); silent fail is fine
  }
}

export function readWizard(): WizardState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(WIZARD_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WizardState;
    if (typeof parsed.step !== 'number' || parsed.step < 1 || parsed.step > WIZARD_STEPS) return null;
    // A saved session at the submit step is almost always an aborted/expired flow.
    // Don't dump the user there silently — start fresh.
    if (parsed.step === WIZARD_STEPS) return null;
    if (parsed.savedAt && Date.now() - parsed.savedAt > MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function clearWizard(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(WIZARD_STORAGE_KEY);
  } catch {
    // ignore
  }
}
