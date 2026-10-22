import { absoluteUrl, isPlaceholder, site } from "@/config/site";
import type { FaqItem } from "@/content/faq";
import type { Service } from "@/content/services";

const ORG_ID = `${site.url}/#organisatie`;

export function organizationSchema() {
  const { email, phoneHref, kvk } = site.contact;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/icons/icon-512.png"),
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    slogan: site.slogan,
    email,
    telephone: phoneHref,
    address: { "@type": "PostalAddress", addressLocality: site.city, addressCountry: "NL" },
    areaServed: { "@type": "City", name: "Rotterdam" },
    knowsAbout: ["Microsoft 365", "Microsoft Entra ID", "Microsoft Intune", "Applicatiebeheer", "IT-advies"],
    ...(isPlaceholder(kvk) ? {} : { identifier: { "@type": "PropertyValue", propertyID: "KvK-nummer", value: kvk } }),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: site.url,
    name: site.name,
    inLanguage: "nl-NL",
    publisher: { "@id": ORG_ID },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function servicesSchema(services: Service[], pagePath: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.summary,
        url: absoluteUrl(`${pagePath}#${service.slug}`),
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "City", name: "Rotterdam" },
      },
    })),
  };
}
