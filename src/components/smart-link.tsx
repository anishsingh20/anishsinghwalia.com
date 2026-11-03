import Link from "next/link";
import type { ComponentProps } from "react";
import { isExternalHref, toInternalPath } from "@/lib/href";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
} & Omit<ComponentProps<"a">, "href">;

/**
 * Internal paths stay in this tab. http(s) off-site opens a new tab.
 */
export function SmartLink({ href, children, className, target, rel, ...rest }: Props) {
  if (!href) return null;
  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }
  if (isExternalHref(href)) {
    return (
      <a {...rest} href={href} className={className} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  const path = toInternalPath(href);
  return (
    <Link href={path} className={className} target={target} rel={rel} {...rest}>
      {children}
    </Link>
  );
}
