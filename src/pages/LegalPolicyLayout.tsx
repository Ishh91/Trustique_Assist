import { Link } from 'react-router-dom';

interface LegalPolicyLayoutProps {
  title: string;
  lastUpdated?: string;
  pdfPath?: string;
  sections?: string[];
  children: React.ReactNode;
}

export default function LegalPolicyLayout({
  title,
  lastUpdated,
  pdfPath,
  sections = [],
  children,
}: LegalPolicyLayoutProps) {
  return (
    <section className="py-20 md:py-24 bg-bg-main">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-6 md:mb-8 bg-bg-card/95 rounded-2xl border border-border-subtle shadow-sm p-5 sm:p-6 md:p-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-primary hover:underline mb-4"
          >
            ← Back to Home
          </Link>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-white leading-tight">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-sm text-text-muted mt-2">Last updated: {lastUpdated}</p>
          )}
          {pdfPath && (
            <a
              href={pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 px-4 py-2.5 rounded-lg brand-gradient-bg text-white text-sm font-medium hover:shadow-lg transition-colors"
            >
              View Original PDF
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {sections.length > 0 && (
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="bg-bg-card rounded-2xl border border-border-subtle shadow-sm p-4 sm:p-5 lg:sticky lg:top-28">
                <h2 className="text-base font-semibold text-text-white mb-3">On this page</h2>
                <div className="lg:block overflow-x-auto">
                  <div className="flex lg:flex-col gap-2 min-w-max lg:min-w-0">
                    {sections.map((section, index) => (
                      <a
                        key={section}
                        href={`#section-${index + 1}`}
                        className="text-xs sm:text-sm text-text-muted hover:text-primary hover:bg-bg-secondary rounded-lg px-3 py-2 transition-colors whitespace-nowrap lg:whitespace-normal"
                      >
                        {section}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}

          <div className={sections.length > 0 ? 'lg:col-span-8 xl:col-span-9' : 'lg:col-span-12'}>
            <div className="bg-bg-card rounded-2xl border border-border-subtle shadow-sm p-5 sm:p-6 md:p-8">
              <div className="max-w-none space-y-6 md:space-y-8 text-text-muted leading-relaxed text-sm sm:text-base break-words [&>h2]:text-lg [&>h2]:sm:text-xl [&>h2]:font-bold [&>h2]:text-text-white [&>h2]:mt-8 [&>h2]:first:mt-0 [&>p]:mt-3 [&>ul]:mt-3 [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:pl-5 [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
