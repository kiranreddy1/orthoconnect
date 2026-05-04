import { DISCLAIMER_TEXT, URGENT_TEXT } from '@/components/disclaimer';

export const metadata = {
  title: 'Disclaimer & privacy',
  description:
    'Full medical disclaimer, privacy policy, and accessibility statement for OrthoConnect.',
};

export default function DisclaimerPage() {
  return (
    <main className="container-content min-h-screen pt-32 pb-section">
      <div className="max-w-3xl">
        <p className="text-fg-secondary text-sm uppercase tracking-widest">Disclaimer & privacy</p>
        <h1 className="font-display text-display-lg text-fg-primary mt-4">
          Read this carefully.
        </h1>

        <section className="mt-section space-y-4">
          <h2 className="font-display text-fg-primary text-2xl">Medical disclaimer</h2>
          <p className="text-lg leading-relaxed">{DISCLAIMER_TEXT}</p>
          <p className="text-lg leading-relaxed">{URGENT_TEXT}</p>
        </section>

        <section className="mt-section space-y-4">
          <h2 className="font-display text-fg-primary text-2xl">Awareness levels are not diagnoses</h2>
          <p className="text-lg leading-relaxed">
            OrthoConnect produces an &quot;Awareness Level&quot; (Green / Yellow / Orange / Red),
            not a clinical diagnosis. Pattern templates always say &quot;pattern consistent with
            X&quot; — never &quot;you have X.&quot; Only a licensed healthcare provider can
            diagnose an injury.
          </p>
        </section>

        <section className="mt-section space-y-4">
          <h2 className="font-display text-fg-primary text-2xl">Privacy</h2>
          <ul className="list-disc space-y-3 pl-6 text-lg leading-relaxed">
            <li>OrthoConnect does not require an account to use.</li>
            <li>Assessment data is stored against an anonymous identifier, not a name.</li>
            <li>
              Email addresses (if you choose to provide one) are kept in a separate table and used
              only for the purposes you opted into.
            </li>
            <li>No data is sold to third parties.</li>
            <li>Assessments older than 12 months are automatically deleted.</li>
            <li>
              No tracking pixels, no Google Analytics, no third-party cookies. We use a
              privacy-respecting analytics product or none at all.
            </li>
          </ul>
        </section>

        <section className="mt-section space-y-4">
          <h2 className="font-display text-fg-primary text-2xl">Age</h2>
          <p className="text-lg leading-relaxed">
            OrthoConnect is currently intended for users aged 13 and older. If you are under 13,
            please ask a parent or guardian for help and have them complete the assessment with
            you. We do not knowingly collect data from children under 13 without parental
            involvement.
          </p>
        </section>

        <section className="mt-section space-y-4">
          <h2 className="font-display text-fg-primary text-2xl">Accessibility</h2>
          <p className="text-lg leading-relaxed">
            OrthoConnect is built to WCAG 2.1 AA standards. Body-map regions have keyboard
            equivalents (Tab to focus, Enter or Space to select). All form inputs have visible
            labels. Color is never the only indicator of awareness level — text labels accompany
            the colors.
          </p>
        </section>

        <section className="mt-section space-y-4">
          <h2 className="font-display text-fg-primary text-2xl">No PHI / no insurance integration</h2>
          <p className="text-lg leading-relaxed">
            OrthoConnect is positioned as a general consumer wellness tool. It is not a HIPAA
            covered entity. Do not enter protected health information in the free-text field;
            anything you submit may be stored. We automatically remove email addresses and phone
            numbers from free-text submissions before storage as an additional safeguard.
          </p>
        </section>

        <section className="mt-section space-y-4">
          <h2 className="font-display text-fg-primary text-2xl">Open source</h2>
          <p className="text-lg leading-relaxed">
            OrthoConnect&apos;s logic engine and source code are open under the MIT license at{' '}
            <a
              href="https://github.com/kiranreddy1/orthoconnect"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              github.com/kiranreddy1/orthoconnect
            </a>
            . You can inspect the rules, citations, and data model directly.
          </p>
        </section>
      </div>
    </main>
  );
}
