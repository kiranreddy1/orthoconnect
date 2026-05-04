import { FeedbackForm } from './_components/feedback-form';

export const metadata = {
  title: 'Feedback',
  description:
    'Tell us what is working, what is not, and what to add. OrthoConnect is built by a high schooler — your feedback genuinely shapes the product.',
};

export default function FeedbackPage() {
  return (
    <main className="container-content min-h-screen pt-32 pb-section">
      <div className="max-w-2xl">
        <p className="text-fg-secondary text-sm uppercase tracking-widest">Feedback</p>
        <h1 className="font-display text-display-lg text-fg-primary mt-4">
          Tell us what to improve.
        </h1>
        <p className="text-fg-secondary mt-6 text-lg leading-relaxed">
          OrthoConnect is in active development by a high-school student. Your feedback genuinely
          shapes what gets built next. Coaches, athletic trainers, and clinicians especially —
          please share what you would change.
        </p>

        <div className="mt-section">
          <FeedbackForm />
        </div>
      </div>
    </main>
  );
}
