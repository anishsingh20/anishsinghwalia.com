import { award, lastUpdated, site, socials, legacyProfiles } from "@data/site";
import { mediaItems } from "@data/media";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#anish`,
    name: site.name,
    alternateName: site.alternateName,
    jobTitle: site.jobTitle,
    description: site.description,
    url: site.url,
    image: `${site.url}/images/anish.webp`,
    email: site.email,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: site.email,
      ...(site.bookingUrl ? { url: site.bookingUrl } : {}),
      availableLanguage: ["English", "Hindi"],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.locality,
      addressRegion: site.location.region,
      addressCountry: site.location.country,
    },
    worksFor: {
      "@type": "Organization",
      name: site.employer,
      url: site.employerUrl,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: site.education.school,
    },
    award: [award.short, "Medium Top Writer (twice)"],
    subjectOf: [
      {
        "@type": "WebPage",
        name: `${award.name} ${award.edition} winners`,
        url: award.href,
      },
      ...mediaItems.map((item) => ({
        "@type": item.category === "Podcast" ? "PodcastEpisode" : "Article",
        name: item.title,
        url: item.href,
      })),
    ],
    knowsAbout: [
      "Technical content creation",
      "Technical writing",
      "Developer documentation",
      "Video production",
      "LinkedIn ghostwriting",
      "Newsletters",
      "Content strategy",
      "SEO",
      "Generative engine optimization",
      "AI search visibility",
      "AI inference",
      "Site reliability engineering",
      "Kubernetes",
      "Linux",
    ],
    sameAs: [...socials.map((item) => item.href), ...legacyProfiles.map((item) => item.href)],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    dateModified: lastUpdated,
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateModified: lastUpdated,
    mainEntity: { "@id": `${site.url}/#anish` },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}
