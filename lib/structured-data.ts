import { getSiteUrl, siteConfig } from "@/lib/site-config";

export function getLocalBusinessJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": new URL("/#empresa", siteUrl).toString(),
    name: siteConfig.name,
    url: siteUrl.toString(),
    telephone: siteConfig.phoneE164,
    image: new URL("/images/jipa-fachada.webp", siteUrl).toString(),
    description: siteConfig.description,
    areaServed: {
      "@type": "City",
      name: "Ji-Paraná",
      containedInPlace: {
        "@type": "State",
        name: "Rondônia",
      },
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.coordinates.latitude,
      longitude: siteConfig.coordinates.longitude,
    },
    sameAs: [siteConfig.instagram, siteConfig.mapsUrl],
  };
}

