import Link from 'next/link';
import { Disclaimer } from './disclaimer';

export function Footer() {
  return (
    <footer className="border-t border-black/10 mt-section-lg">
      <div className="container-content py-section">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
          <div>
            <p className="font-display text-fg-primary text-2xl">OrthoConnect</p>
            <p className="text-fg-secondary mt-2 text-sm">Built by Aarush Nibbaragandla.</p>
            <div className="mt-8 max-w-xl">
              <Disclaimer includeUrgent />
            </div>
          </div>
          <nav className="grid grid-cols-2 gap-y-3 gap-x-8 text-sm md:justify-self-end md:text-right">
            <Link href="/about" className="text-fg-secondary hover:text-fg-primary transition-colors">
              About
            </Link>
            <Link href="/learn" className="text-fg-secondary hover:text-fg-primary transition-colors">
              Learn
            </Link>
            <Link href="/feedback" className="text-fg-secondary hover:text-fg-primary transition-colors">
              Feedback
            </Link>
            <Link href="/disclaimer" className="text-fg-secondary hover:text-fg-primary transition-colors">
              Disclaimer
            </Link>
            <a
              href="https://www.amssm.org/find-a-doctor"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-secondary hover:text-fg-primary transition-colors"
            >
              Find a doctor (AMSSM)
            </a>
            <a
              href="https://github.com/kiranreddy1/orthoconnect"
              target="_blank"
              rel="noopener noreferrer"
              className="text-fg-secondary hover:text-fg-primary transition-colors"
            >
              GitHub
            </a>
          </nav>
        </div>
        <p className="text-fg-secondary mt-section text-xs">
          © {new Date().getFullYear()} OrthoConnect. Built by Aarush Nibbaragandla.
        </p>
      </div>
    </footer>
  );
}
