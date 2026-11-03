import Link from "next/link";
import { site } from "@data/site";
import { BookIntroButton } from "@/components/book-intro";
import { SmartLink } from "@/components/smart-link";
import { Button } from "@/components/ui/button";

export function WorkCtas({
  secondaryHref = "/work",
  secondaryLabel = "See client work",
  size = "lg",
}: {
  secondaryHref?: string;
  secondaryLabel?: string;
  size?: "default" | "sm" | "lg";
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button asChild size={size}>
        <Link href="/contact">Tell me about your project</Link>
      </Button>
      <BookIntroButton size={size} variant="outline" />
      <Button asChild size={size} variant="ghost">
        <Link href={secondaryHref}>{secondaryLabel}</Link>
      </Button>
    </div>
  );
}

export function ScopeCta({
  title = "Have something to launch? Let's scope it.",
  text = "Format, audience, and what it's for. I'll write back.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="font-display text-3xl text-cream md:text-4xl">{title}</h2>
        <p className="mt-3 max-w-xl text-muted">{text}</p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <BookIntroButton size="lg" variant="default" />
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Tell me about your project</Link>
          </Button>
          <SmartLink href={`mailto:${site.email}`} className="text-sm text-ember hover:underline">
            Email me
          </SmartLink>
        </div>
      </div>
    </section>
  );
}
