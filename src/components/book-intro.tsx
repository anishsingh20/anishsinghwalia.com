import { bookingLabel, site } from "@data/site";
import { Button } from "@/components/ui/button";

type Size = "default" | "sm" | "lg";

export function BookIntroButton({
  size = "lg",
  variant = "outline",
}: {
  size?: Size;
  variant?: "default" | "outline" | "ghost";
}) {
  if (!site.bookingUrl) return null;
  return (
    <Button asChild size={size} variant={variant}>
      <a href={site.bookingUrl} target="_blank" rel="noopener">
        {bookingLabel}
      </a>
    </Button>
  );
}

export function BookIntroText({ className = "text-sm text-ember hover:underline" }: { className?: string }) {
  if (!site.bookingUrl) return null;
  return (
    <a href={site.bookingUrl} target="_blank" rel="noopener" className={className}>
      {bookingLabel}
    </a>
  );
}
