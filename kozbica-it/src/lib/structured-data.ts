import { absoluteUrl, isPlaceholder, site } from "@/config/site";
import type { FaqItem } from "@/content/faq";
import type { Service } from "@/content/services";

const ORG_ID = `${site.url}/#organisatie`;
const WEBSITE_ID = `${site.url}/#website`;

/** Organisatie als ProfessionalService (LocalBusiness). Placeholders worden weggelaten. */
export function organizationSchema() {
  const { email, phone, kvk, btw } = site.contact;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/icons/icon-512.png"),
    image: absoluteUrl("/opengraph-image"),
    description: site.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.city,
      addressRegion: site.location.region,
      addressCountry: site.location.countryCode,
    },
    areaServed: [
      { "@type": "City", name: "Rotterdam" },
      { "@type": "AdministrativeArea", name: "Zuid-Holland" },
      { "@type": "Country", name: "Nederland" },
    ],
    knowsAbout: [
      "IT-beheer",
      "Systeembeheer",
      "Microsoft 365",
      "Microsoft Entra ID",
      "Microsoft Intune",
      "Microsoft Defender",
      "Microsoft Azure",
      "Cybersecurity",
      "Werkplekbeheer",
    ],
    ...(isPlaceholder(email) ? {} : { email }),
    ...(isPlaceholder(phone) ? {} : { telephone: phone }),
    ...(isPlaceholder(btw) ? {} : { vatID: btw }),
    ...(isPlaceholder(kvk)
      ? {}
      : { identifier: { "@type": "PropertyValue", propertyID: "KvK-nummer", value: kvk } }),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
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
        areaServed: { "@type": "Country", name: "Nederland" },
      },
    })),
  };
}
