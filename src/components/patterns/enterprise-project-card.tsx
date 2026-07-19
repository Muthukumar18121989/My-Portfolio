import type { EnterpriseShowcaseCard } from "@/lib/content";

// Enterprise project showcase card — always dark, regardless of the site's
// light/dark theme toggle, matching the reference layout's fixed dark
// treatment (the same pattern as a code block staying dark in a light UI).
// Text-only: screenshots live in the password-gated Application Screens
// section instead, not here.
export interface EnterpriseProjectCardProps {
  card: EnterpriseShowcaseCard;
}

function EnterpriseProjectCard({ card }: EnterpriseProjectCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0f] p-8 lg:p-10">
      <div className="flex flex-col gap-6">
        <div>
          <span className="inline-block rounded-full bg-blue-500/15 px-3 py-1 font-mono text-[0.625rem] font-medium tracking-[0.1em] text-blue-400 uppercase">
            {card.tag}
          </span>
          <h3 className="mt-3 font-display text-2xl font-extrabold text-white">{card.title}</h3>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-mono text-[0.625rem] tracking-[0.2em] text-white/40 uppercase">
            Overview:
          </p>
          <p className="max-w-3xl text-sm leading-relaxed text-white/70">{card.overview}</p>
        </div>

        <div className="flex flex-col gap-2.5">
          <p className="font-mono text-[0.625rem] tracking-[0.2em] text-white/40 uppercase">
            My UX Contributions:
          </p>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-1.5 sm:grid-cols-2">
            {card.contributions.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-white/70">
                <span
                  className="mt-1.5 size-1 shrink-0 rounded-full bg-blue-400"
                  aria-hidden="true"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {card.toolkit && (
          <div className="flex flex-col gap-2.5">
            <p className="font-mono text-[0.625rem] tracking-[0.2em] text-white/40 uppercase">
              Design Toolkit:
            </p>
            <div className="flex flex-wrap gap-2">
              {card.toolkit.map((tool) => (
                <span
                  key={tool}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="rounded-lg border-l-4 border-blue-500 bg-white/5 p-4">
          <p className="font-mono text-[0.625rem] tracking-[0.15em] text-blue-400 uppercase">
            Business Impact
          </p>
          <p className="mt-1.5 text-sm font-medium text-white">{card.businessImpact}</p>
        </div>
      </div>
    </article>
  );
}

export { EnterpriseProjectCard };
