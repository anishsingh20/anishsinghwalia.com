import { linkedInRecommendationsUrl, tileLabel, type Testimonial } from "@data/testimonials";
import { BrandLogo } from "@/components/brand-logo";
import { SmartLink } from "@/components/smart-link";
import { SocialIcon } from "@/components/social-icon";

export function TestimonialGrid({
  items,
  detailed = false,
}: {
  items: Testimonial[];
  detailed?: boolean;
}) {
  return (
    <div>
      <ul className="grid gap-4 md:grid-cols-2">
        {items.map((item) => {
          const tile = tileLabel(item);
          const designation = [item.role, item.company].filter(Boolean).join(", ");
          return (
            <li key={item.id} id={item.id} className="flex h-full scroll-mt-24 flex-col rounded-2xl border border-line bg-panel p-6 target:border-orange/60">
              <div className="flex items-center gap-3">
                {item.company ? <BrandLogo name={item.company} size="md" /> : null}
                <div>
                  <p className="font-display text-2xl leading-tight tracking-tight text-cream">{tile}</p>
                  {detailed ? <p className="mt-0.5 text-xs text-faint">{item.relationship} · {item.dateLabel}</p> : null}
                </div>
              </div>
              <div className="mt-4 h-px w-12 bg-orange" aria-hidden="true" />
              {item.quote ? (
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-cream/95">
                  <p>“{item.quote}”</p>
                </blockquote>
              ) : (
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                  {item.name} recommended me on LinkedIn. The full text is on {item.linkedin ? "the profile linked below" : "my recommendations page"}.
                </p>
              )}
              <footer className="mt-6 flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-cream">{item.name}</p>
                  {designation ? <p className="mt-1 text-sm text-muted">{designation}</p> : null}
                </div>
                {item.linkedin ? (
                  <SmartLink
                    href={item.linkedin}
                    className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-line text-cream/80 transition hover:border-orange/60 hover:text-ember"
                    aria-label={`${item.name} on LinkedIn`}
                  >
                    <SocialIcon id="linkedin" />
                  </SmartLink>
                ) : null}
              </footer>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-sm">
        <SmartLink href={linkedInRecommendationsUrl} className="text-ember hover:underline">
          Read all of them on LinkedIn
        </SmartLink>
      </p>
    </div>
  );
}
