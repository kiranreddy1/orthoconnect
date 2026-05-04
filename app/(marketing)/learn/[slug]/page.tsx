import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ARTICLES, getArticle } from '@/content/learn/articles';

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const a = getArticle(params.slug);
  if (!a) return { title: 'Not found' };
  return { title: a.title, description: a.summary };
}

function renderInline(text: string): React.ReactNode {
  // Renders **bold** spans without pulling in MDX. Single-pass split on ** markers.
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="text-fg-primary font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function LearnArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug);
  if (!article) notFound();

  return (
    <main className="container-content min-h-screen pt-32 pb-section">
      <div className="max-w-3xl">
        <Link
          href="/learn"
          className="text-fg-secondary hover:text-fg-primary inline-flex items-center gap-2 text-sm transition-colors"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
          All articles
        </Link>

        <p className="text-fg-secondary mt-12 font-mono text-xs">{article.estimatedReadingTime}</p>
        <h1 className="font-display text-display-md text-fg-primary mt-3">{article.title}</h1>
        <p className="text-fg-secondary mt-6 text-lg leading-relaxed">{article.summary}</p>

        <article className="mt-12 space-y-6 text-lg leading-relaxed">
          {article.body.map((para, i) =>
            para.startsWith('- ') ? (
              <ul key={i} className="list-disc space-y-2 pl-6">
                {para.split('\n').map((line, j) => (
                  <li key={j}>{renderInline(line.replace(/^- /, ''))}</li>
                ))}
              </ul>
            ) : (
              <p key={i}>{renderInline(para)}</p>
            ),
          )}
        </article>

        <p className="text-fg-secondary mt-section text-sm">
          This article is educational, not medical advice. If you are concerned about a specific
          symptom, please see a qualified healthcare provider.
        </p>
      </div>
    </main>
  );
}
