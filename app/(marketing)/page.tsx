export default function HomePage() {
  return (
    <main className="container-content min-h-screen py-section">
      <div className="flex min-h-[60vh] flex-col justify-center gap-6">
        <p className="text-fg-secondary text-sm uppercase tracking-widest">OrthoConnect</p>
        <h1 className="font-display text-display-xl text-fg-primary max-w-[900px]">
          Your pain has a pattern. Let&apos;s decode it.
        </h1>
        <p className="text-fg-secondary max-w-[600px] text-xl">
          A free, structured awareness tool for athletes — built by an aspiring orthopedic
          surgeon.
        </p>
        <p className="text-fg-secondary mt-12 text-sm">
          Scaffold in place. Homepage, assessment, and report pages land in subsequent commits.
        </p>
      </div>
    </main>
  );
}
