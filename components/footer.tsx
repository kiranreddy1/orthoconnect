import Link from 'next/link';
import { Disclaimer } from './disclaimer';
import { LogoMark } from './logo';

export function Footer() {
  return (
    <footer className="mt-section-lg">
      <div className="flex h-1 w-full">
        <span className="bg-awareness-green flex-1" />
        <span className="bg-awareness-yellow flex-1" />
        <span className="bg-awareness-orange flex-1" />
        <span className="bg-awareness-red flex-1" />
      </div>
      <div className="border-t border-black/10">
      <div className="container-content py-section">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="text-fg-primary">
              <LogoMark size="lg" />
            </div>
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
          </nav>
        </div>
        <p className="text-fg-secondary mt-section text-xs">
          © {new Date().getFullYear()} OrthoConnect. Built by Aarush Nibbaragandla.
        </p>
      </div>
      </div>
    </footer>
  );
}
