import { cn } from '@/lib/utils';

export const DISCLAIMER_TEXT =
  'OrthoConnect is an educational tool only. It does not diagnose injuries, replace medical advice, or recommend treatment. Always consult a licensed healthcare provider for any injury, pain, or symptom that concerns you.';

export const URGENT_TEXT =
  'If you experience severe pain, sudden swelling, inability to bear weight, numbness, or any symptom that worries you — stop activity and seek medical attention immediately.';

export function Disclaimer({ className, includeUrgent = false }: { className?: string; includeUrgent?: boolean }) {
  return (
    <div className={cn('text-fg-secondary text-sm leading-relaxed', className)}>
      <p>{DISCLAIMER_TEXT}</p>
      {includeUrgent ? <p className="mt-3">{URGENT_TEXT}</p> : null}
    </div>
  );
}
