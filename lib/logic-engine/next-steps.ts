import type { AwarenessLevel, AssessmentInput } from './types';

const SHARED_WHEN_TO_SEE_PRO = [
  'You cannot bear weight on the affected limb',
  'You notice visible deformity or the joint feels unstable',
  'You have new numbness, tingling, or loss of sensation',
  'You have rapid swelling within an hour of injury',
  'You heard or felt a "pop" at the moment of injury',
  'Pain wakes you from sleep',
  'You have a fever along with joint pain',
];

export function nextStepsFor(level: AwarenessLevel, input: AssessmentInput): string[] {
  switch (level) {
    case 'green':
      return [
        'Patterns look mild. Continue normal activity but watch for changes.',
        'Apply a light load reduction (skip sprints or jumping for 2–3 days) if symptoms bother you.',
        'Re-assess in 3–5 days. If anything is worse — pain, swelling, or function — escalate to a sports medicine evaluation.',
      ];
    case 'yellow':
      return [
        'Reduce the activity that triggers the pain for the next 5–7 days.',
        'Try ice for 15–20 minutes after activity, with breaks. Avoid heat in the first week of new pain.',
        'Re-assess in 5–7 days. If pain is the same or worse, consider a sports medicine evaluation.',
        'If pain is interfering with sleep, school, or daily activities, see a professional sooner.',
      ];
    case 'orange':
      return [
        'Pause the activity that triggers the pain.',
        'Plan to see a sports medicine professional within the next 1–2 weeks.',
        'Bring this report to the visit — it is a useful starting point for the conversation.',
        input.age < 18
          ? 'Talk to a parent and (if you have one) your athletic trainer before returning to play.'
          : 'Avoid pushing through this pattern; pushing through is the most common way these become bigger problems.',
      ];
    case 'red':
      return [
        'Stop the activity that triggers the pain.',
        'Plan to see a professional soon — same-day or urgent care if symptoms are severe.',
        'Avoid weight-bearing or high-impact loading on the affected area until you have been evaluated.',
        'Bring this report and your detailed history with you to the visit.',
      ];
  }
}

export function whenToSeeAProfessional(level: AwarenessLevel): string[] {
  const base = SHARED_WHEN_TO_SEE_PRO;
  switch (level) {
    case 'green':
      return ['Even with mild patterns, see a professional if any of the following develop:', ...base];
    case 'yellow':
      return [
        'Reasons to escalate the timeline and see a professional sooner:',
        'The pattern is not improving after 5–7 days of load reduction',
        ...base,
      ];
    case 'orange':
      return [
        'Schedule a sports medicine evaluation within 1–2 weeks. Seek care sooner if any of the following are true:',
        ...base,
      ];
    case 'red':
      return [
        'Seek care soon. Treat this as urgent if any of the following apply:',
        ...base,
      ];
  }
}
