const fallbackUrl = "http://localhost:3000";

function normalizeUrl(value?: string) {
  if (!value) return null;

  const candidate = value.startsWith("http") ? value : `https://${value}`;

  try {
    return new URL(candidate);
  } catch {
    return null;
  }
}

export function getSiteUrl() {
  return (
    normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL) ??
    normalizeUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ??
    new URL(fallbackUrl)
  );
}

export const siteConfig = {
  name: "JIPA Consórcios",
  legalName: "JIPA Consórcios",
  description:
    "Consórcio em Ji-Paraná com orientação clara para imóveis, veículos, motos, serviços e planejamento patrimonial.",
  phoneDisplay: "(69) 99307-7743",
  phoneE164: "+5569993077743",
  whatsappNumber: "5569993897171",
  instagram: "https://www.instagram.com/jipaconsorcio/",
  mapsUrl: "https://maps.app.goo.gl/kceszozqj7NNUJ526",
  address: {
    street: "Av. Mal. Rondon, 3026",
    district: "Bairro Centro",
    city: "Ji-Paraná",
    state: "RO",
    postalCode: "76900-864",
    country: "BR",
  },
  coordinates: {
    latitude: -10.8686698,
    longitude: -61.964454,
  },
} as const;

export const navigation = [
  { label: "Modalidades", href: "#modalidades" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Sobre nós", href: "#sobre" },
  { label: "Avaliações", href: "#avaliacoes" },
  { label: "Dúvidas", href: "#duvidas" },
  { label: "Localização", href: "#localizacao" },
] as const;

