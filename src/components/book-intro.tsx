import { bookingLabel, site } from "@data/site";
import { Button } from "@/components/ui/button";
import { SmartLink } from "@/components/smart-link";

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
      <SmartLink href={site.bookingUrl}>
        {bookingLabel}
      </SmartLink>
    </Button>
  );
}

export function BookIntroText({ className = "text-sm text-ember hover:underline" }: { className?: string }) {
  if (!site.bookingUrl) return null;
  return (
    <SmartLink href={site.bookingUrl} className={className}>
      {bookingLabel}
    </SmartLink>
  );
}
