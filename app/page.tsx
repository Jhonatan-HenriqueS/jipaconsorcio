import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileSearch,
  Landmark,
  MapPin,
  MessageCircle,
  Scale,
} from "lucide-react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { BrandPartnerCard } from "@/components/shared/brand-partner-card";
import { ConsortiumSimulator } from "@/components/shared/consortium-simulator";
import { ReviewsMarquee } from "@/components/shared/reviews-marquee";
import { ScrollRevealLoader } from "@/components/shared/scroll-reveal-loader";
import { SectionHeading } from "@/components/shared/section-heading";
import { SimulatorAnchorNavigation } from "@/components/shared/simulator-anchor-navigation";
import { faqItems } from "@/data/faq";
import { siteConfig } from "@/lib/site-config";
import { getLocalBusinessJsonLd } from "@/lib/structured-data";

const description =
  "Consórcio em Ji-Paraná com orientação clara e personalizada para planejar imóveis, veículos, motos, serviços e patrimônio.";

export const metadata: Metadata = {
  title: { absolute: "Consórcio em Ji-Paraná | JIPA Consórcios" },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Consórcio em Ji-Paraná | JIPA Consórcios",
    description,
    url: "/",
    siteName: "JIPA Consórcios",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Consórcio em Ji-Paraná | JIPA Consórcios",
    description,
    images: ["/opengraph-image"],
  },
};

const categories = [
  {
    title: "Imóveis",
    description: "Compre, construa ou reforme com planejamento.",
    image: "/images/modalidades/imoveis.webp",
    number: "01",
    featured: false,
  },
  {
    title: "Motos",
    description: "Planeje a sua próxima moto com mais clareza.",
    image: "/images/modalidades/motos.webp",
    number: "02",
    featured: false,
  },
  {
    title: "Veículos",
    description: "Troque de carro com crédito e prazo planejados.",
    image: "/images/modalidades/veiculos.webp",
    number: "03",
    featured: true,
  },
  {
    title: "Serviços",
    description: "Organize reformas, viagens e outros projetos.",
    image: "/images/modalidades/servicos.webp",
    number: "04",
    featured: false,
  },
  {
    title: "Planejamento patrimonial",
    description: "Estruture objetivos de médio e longo prazo.",
    image: "/images/modalidades/planejamento-patrimonial.webp",
    number: "05",
    featured: false,
  },
] as const;

const consortiumBrands = [
  {
    name: "Disal Consórcio",
    slug: "disal",
    image: "/images/marcas/disal.png",
    imageAlt: "Logotipo da Disal Consórcio",
    strength: "Especialista em veículos",
    title: "Mais liberdade para escolher seu próximo veículo.",
    description:
      "Planos automotivos conectados a uma ampla rede de concessionárias e marcas.",
  },
  {
    name: "Yamaha Consórcio",
    slug: "yamaha",
    image: "/images/marcas/yamaha.png",
    imageAlt: "Logotipo do Yamaha Consórcio",
    strength: "Universo duas rodas",
    title: "Sua próxima Yamaha começa com planejamento.",
    description:
      "Consórcio oficial da marca para conquistar sua motocicleta no seu ritmo.",
  },
  {
    name: "HS Consórcios",
    slug: "hs",
    image: "/images/marcas/hs.png",
    imageAlt: "Logotipo da HS Consórcios",
    strength: "Projetos que crescem",
    title: "Do primeiro bem à construção de patrimônio.",
    description:
      "Soluções flexíveis para imóveis, veículos e investimentos em diferentes fases da vida.",
  },
] as const;

const benefits = [
  "Compare caminhos sem precisar decifrar tudo sozinho.",
  "Entenda como parcelas, taxas, lances e contemplação funcionam.",
  "Escolha uma modalidade coerente com seu objetivo.",
  "Receba atendimento próximo antes e depois da contratação.",
  "Converse com uma equipe local, em Ji-Paraná.",
  "Comece com uma simulação simples, sem obrigação de contratar.",
];

const steps = [
  {
    title: "A conversa começa pelo seu objetivo",
    description:
      "A equipe entende o que você quer realizar e qual orçamento faz sentido.",
    icon: MessageCircle,
  },
  {
    title: "Você compara possibilidades",
    description:
      "Crédito, prazo, taxas, lances e condições são apresentados com clareza.",
    icon: FileSearch,
  },
  {
    title: "A escolha acontece com contexto",
    description:
      "Você lê a proposta e o contrato antes de decidir se deseja continuar.",
    icon: ClipboardCheck,
  },
] as const;

export default function Home() {
  const jsonLd = getLocalBusinessJsonLd();
  const mapsEmbed = `https://www.google.com/maps?q=${siteConfig.coordinates.latitude},${siteConfig.coordinates.longitude}&z=16&output=embed`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ScrollRevealLoader />
      <SimulatorAnchorNavigation />
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <SiteHeader />

      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-architecture" aria-hidden="true" />
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">
                <span /> JIPA Consórcios · Ji-Paraná, RO
              </p>
              <h1 id="hero-title">
                Tire seus planos do papel com o <strong>consórcio</strong> ideal
                para você em Ji-Paraná.{" "}
              </h1>
              <div className="hero-actions">
                <a className="button button-primary" href="#simulador">
                  Simular meu consórcio
                  <ArrowRight aria-hidden="true" />
                </a>
                <a
                  className="button button-ghost-light"
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Falar com um especialista
                </a>
              </div>
            </div>

            <figure className="hero-person">
              <div className="hero-person-frame" aria-hidden="true" />
              <Image
                src="/images/diego-miranda.png"
                alt="Diego Miranda, especialista da JIPA Consórcios"
                width={760}
                height={950}
                sizes="(max-width: 767px) 82vw, (max-width: 1199px) 35vw, 28vw"
              />
              <figcaption>
                <strong>Diego Miranda</strong>
                <span>Atendimento JIPA</span>
              </figcaption>
            </figure>

            <ConsortiumSimulator />
          </div>
          <a
            href="#modalidades"
            className="hero-scroll"
            aria-label="Ir para modalidades"
          >
            Explore
            <ArrowDown aria-hidden="true" />
          </a>
        </section>

        <section
          className="clarity-section section-shell"
          aria-labelledby="clarity-title"
          data-reveal-stagger
        >
          <div className="clarity-statement">
            <p className="eyebrow">Clareza antes da escolha</p>
            <h2 id="clarity-title">
              Um bem importante pede uma decisão que caiba na vida real.
            </h2>
          </div>
          <div className="clarity-copy">
            <p>
              Escolher uma forma de comprar um bem importante gera dúvidas,
              principalmente quando aparecem prazos, lances, taxas e condições
              diferentes.
            </p>
            <strong>É por isso que clareza vem antes da escolha.</strong>
          </div>
        </section>

        <section
          className="categories-section"
          id="modalidades"
          aria-labelledby="modalidades-title"
        >
          <div className="categories-shell">
            <div className="categories-intro">
              <SectionHeading
                id="modalidades-title"
                eyebrow="Modalidades"
                title="Escolha o projeto que você quer realizar."
                inverse
              />
              <p className="categories-intro-copy" data-reveal>
                Cada objetivo pede um planejamento diferente. Conheça as
                modalidades e comece pela que mais combina com o seu momento.
              </p>
              <a
                className="categories-intro-link"
                href="#simulador"
                data-reveal
              >
                Simular agora <ArrowRight aria-hidden="true" />
              </a>
            </div>

            <div
              className="category-scroller"
              role="region"
              aria-label="Modalidades de consórcio"
              tabIndex={0}
            >
              <ul className="category-grid" data-reveal-stagger>
                {categories.map((category) => (
                  <li
                    className={`category-item${
                      category.featured ? " category-item-featured" : ""
                    }`}
                    key={category.title}
                  >
                    <a
                      href="#simulador"
                      className={`category-card${
                        category.featured ? " category-card-featured" : ""
                      }`}
                    >
                      <span className="category-badge" aria-hidden="true">
                        {category.featured ? "Destaque" : "Consórcio"}
                      </span>
                      <span className="category-code" aria-hidden="true">
                        JIPA—{category.number}
                      </span>
                      <h3>{category.title}</h3>
                      <span className="category-visual" aria-hidden="true">
                        <Image
                          src={category.image}
                          alt=""
                          width={720}
                          height={720}
                          sizes="(max-width: 679px) 82vw, (max-width: 899px) 44vw, (max-width: 1199px) 30vw, 340px"
                        />
                      </span>
                      <span className="category-link">
                        Simular agora <ArrowRight aria-hidden="true" />
                      </span>
                      <p>{category.description}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="categories-scroll-hint" data-reveal>
              Deslize para conhecer todas as modalidades
              <ArrowRight aria-hidden="true" />
            </p>
          </div>
        </section>

        <section className="brands-editorial" aria-labelledby="brands-title">
          <div className="brands-editorial-copy" data-reveal>
            <p className="eyebrow">Marcas parceiras</p>
            <h2 id="brands-title">
              Três especialistas. Mais caminhos para realizar.
            </h2>
            <p>
              Cada marca tem uma força. A JIPA ajuda você a comparar e escolher
              a opção que mais combina com o seu objetivo.
            </p>
          </div>
          <div
            className="brand-card-grid"
            role="group"
            aria-label="Marcas parceiras apresentadas"
            data-reveal-stagger
          >
            {consortiumBrands.map((brand) => (
              <BrandPartnerCard {...brand} key={brand.name} />
            ))}
          </div>
        </section>

        <section className="process-section section-shell" id="como-funciona">
          <SectionHeading
            eyebrow="Como a JIPA orienta"
            title="Na JIPA, a conversa começa pelo seu plano, não por uma cota pronta."
            description="Você não precisa entender tudo sobre consórcio para dar o primeiro passo. Precisa de alguém que escute seu objetivo e explique as condições sem pressa."
            align="center"
          />
          <ol className="process-list" data-reveal-stagger>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title}>
                  <div className="process-icon">
                    <Icon aria-hidden="true" />
                    <span>0{index + 1}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </li>
              );
            })}
          </ol>
        </section>

        <section
          className="education-section"
          aria-labelledby="education-title"
        >
          <div className="education-intro" data-reveal>
            <p className="eyebrow">Entenda antes de decidir</p>
            <h2 id="education-title">
              O que é consórcio? Por que ele pode fazer sentido para você?
            </h2>
            <p>
              Consórcio é uma reunião de pessoas físicas ou jurídicas em grupo,
              promovida por administradora autorizada, para aquisição de bens ou
              serviços por autofinanciamento. A contemplação ocorre conforme o
              contrato, por sorteio ou lance.
            </p>
            <a
              className="source-link"
              href="https://www.bcb.gov.br/meubc/faqs/s/consorcio"
              target="_blank"
              rel="noreferrer"
            >
              Consulte as orientações do Banco Central
              <ArrowRight aria-hidden="true" />
            </a>
          </div>

          <div className="comparison-card" data-reveal>
            <div className="comparison-heading">
              <Scale aria-hidden="true" />
              <div>
                <span>Comparação qualitativa</span>
                <h3>Consórcio × financiamento</h3>
              </div>
            </div>
            <div
              className="comparison-table-wrap"
              role="region"
              aria-label="Comparação entre consórcio e financiamento"
              tabIndex={0}
            >
              <table>
                <thead>
                  <tr>
                    <th scope="col">Critério</th>
                    <th scope="col">Consórcio</th>
                    <th scope="col">Financiamento</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Acesso ao bem</th>
                    <td>Após contemplação por sorteio ou lance</td>
                    <td>Normalmente após aprovação e contratação</td>
                  </tr>
                  <tr>
                    <th scope="row">Custo principal</th>
                    <td>Taxa de administração e possíveis encargos</td>
                    <td>Juros e demais itens do CET</td>
                  </tr>
                  <tr>
                    <th scope="row">Previsibilidade</th>
                    <td>Não há data garantida de contemplação</td>
                    <td>Parcelas seguem as condições do contrato</td>
                  </tr>
                  <tr>
                    <th scope="row">Indicado para urgência?</th>
                    <td>Pode não ser adequado</td>
                    <td>Pode atender, sujeito à aprovação e custo</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="comparison-note">
              Não exibimos percentuais genéricos porque juros anuais e taxa
              total de administração não são métricas diretamente comparáveis.
              Analise propostas do mesmo período e modalidade.
            </p>
          </div>
        </section>

        <section
          className="benefits-section section-shell"
          aria-labelledby="benefits-title"
        >
          <div data-reveal>
            <p className="eyebrow">Atendimento próximo</p>
            <h2 id="benefits-title">
              Entenda as condições. Compare. Depois decida.
            </h2>
            <p>
              A JIPA começa entendendo o que você deseja conquistar, quanto
              pretende investir por mês e qual prazo faz sentido.
            </p>
          </div>
          <ul data-reveal-stagger>
            {benefits.map((benefit) => (
              <li key={benefit}>
                <Check aria-hidden="true" />
                {benefit}
              </li>
            ))}
          </ul>
        </section>

        <section
          className="about-section"
          id="sobre"
          aria-labelledby="about-title"
        >
          <div className="about-images" data-reveal>
            <figure className="about-interior">
              <Image
                src="/images/jipa-interior.webp"
                alt="Interior da JIPA Consórcios durante um atendimento"
                width={1200}
                height={676}
                sizes="(max-width: 767px) 100vw, 62vw"
              />
              <figcaption>Atendimento presencial em Ji-Paraná</figcaption>
            </figure>
            <figure className="about-facade">
              <Image
                src="/images/jipa-fachada.webp"
                alt="Fachada da JIPA Consórcios em Ji-Paraná"
                width={676}
                height={1200}
                sizes="(max-width: 767px) 72vw, 24vw"
              />
            </figure>
          </div>
          <div className="about-copy" data-reveal>
            <p className="eyebrow">Sobre a JIPA</p>
            <h2 id="about-title">Atendimento que explica antes de vender.</h2>
            <p>
              Na JIPA Consórcios, cada projeto começa com uma conversa clara.
              Diego e Paula recebem quem deseja planejar uma conquista, entendem
              o momento de cada pessoa e explicam as etapas sem pressa.
            </p>
            <p>
              A proposta é tornar o consórcio mais fácil de compreender — com
              atendimento próximo, transparência e acompanhamento.
            </p>
            <div className="about-proof">
              <BadgeCheck aria-hidden="true" />
              <span>
                <strong>Equipe local</strong>
                Atendimento presencial e pelo WhatsApp
              </span>
            </div>
            <a className="button button-primary" href="#localizacao">
              Conhecer a JIPA
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
        </section>

        <section
          className="reviews-section"
          id="avaliacoes"
          aria-labelledby="reviews-title"
        >
          <div className="section-shell">
            <SectionHeading
              id="reviews-title"
              eyebrow="Experiências reais"
              title="Quem conversa com a JIPA percebe a diferença."
              description="Atendimento claro, confiança e disponibilidade aparecem repetidamente nas experiências compartilhadas por clientes da empresa no Google."
              inverse
            />
          </div>
          <ReviewsMarquee />
        </section>

        <section className="faq-section section-shell" id="duvidas">
          <div className="faq-intro" data-reveal>
            <p className="eyebrow">Dúvidas frequentes</p>
            <h2>Respostas diretas para decidir com mais segurança.</h2>
            <p>
              Regras podem variar entre grupos. Leia o contrato e confirme cada
              condição com a administradora antes de contratar.
            </p>
            <a href="#simulador" className="text-link">
              Ainda tem dúvidas? Fale com a JIPA
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
          <div className="faq-accordion" data-reveal-stagger>
            {faqItems.map((item, index) => (
              <details
                className="faq-item"
                key={item.question}
                name="jipa-faq"
                open={index === 0}
              >
                <summary>
                  <span>0{index + 1}</span>
                  <strong>{item.question}</strong>
                  <ChevronDown aria-hidden="true" />
                </summary>
                <div className="faq-content">
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section
          className="location-section"
          id="localizacao"
          aria-labelledby="location-title"
        >
          <div className="location-info" data-reveal>
            <p className="eyebrow">Onde estamos</p>
            <h2 id="location-title">A JIPA está perto de você.</h2>
            <p>
              Visite a equipe em Ji-Paraná, em frente ao Supermercado Tai Max.
            </p>
            <address>
              <MapPin aria-hidden="true" />
              <span>
                <strong>{siteConfig.address.street}</strong>
                {siteConfig.address.district}, {siteConfig.address.city} —{" "}
                {siteConfig.address.state}
                <br />
                CEP {siteConfig.address.postalCode}
              </span>
            </address>
            <a
              className="button button-primary"
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noreferrer"
            >
              Encontre nossa empresa
              <ArrowRight aria-hidden="true" />
            </a>
          </div>
          <div className="map-frame" data-reveal>
            <iframe
              src={mapsEmbed}
              title="Mapa com a localização da JIPA Consórcios em Ji-Paraná"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </section>

        <section
          className="final-cta"
          aria-labelledby="final-cta-title"
          data-reveal-stagger
        >
          <div className="final-cta-icon" aria-hidden="true">
            <Landmark />
          </div>
          <div>
            <p className="eyebrow">Seu próximo passo</p>
            <h2 id="final-cta-title">
              Seu plano merece sair do papel com clareza.
            </h2>
            <p>
              Conte à JIPA o que você deseja conquistar e receba uma orientação
              inicial para comparar possibilidades.
            </p>
          </div>
          <a className="button button-light" href="#simulador">
            Quero fazer minha simulação
            <ArrowRight aria-hidden="true" />
          </a>
          <p className="final-ps">
            <strong>P.S.:</strong> você não precisa escolher uma cota sozinho.
            Comece entendendo as condições e avance apenas quando a decisão
            fizer sentido para você.
          </p>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
