import { site } from "@data/site";

/** Public booking URL. Empty string means the booking CTA is hidden. */
export function bookingUrl(): string {
  return site.bookingUrl;
}

export function hasBooking(): boolean {
  return Boolean(site.bookingUrl);
}
