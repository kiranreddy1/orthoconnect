import Link from 'next/link';
import { LogoMark } from './logo';

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 backdrop-blur-md">
      <div className="container-content flex h-16 items-center justify-between">
        <Link href="/" className="text-fg-primary">
          <LogoMark size="md" />
        </Link>
        <nav className="text-fg-secondary flex items-center gap-8 text-sm">
          <Link href="/learn" className="hover:text-fg-primary transition-colors">
            Learn
          </Link>
          <Link href="/about" className="hover:text-fg-primary transition-colors">
            About
          </Link>
          <Link
            href="/assessment"
            className="text-fg-primary border-fg-primary/15 hover:border-accent rounded-pill border px-4 py-1.5 transition-colors"
          >
            Start
          </Link>
        </nav>
      </div>
    </header>
  );
}
