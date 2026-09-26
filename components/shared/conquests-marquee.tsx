import Image from "next/image";

const conquests = [
  {
    src: "/images/conquistas/cliente-contemplado-01.jpeg",
    alt: "Cliente e representante da JIPA com certificado de contemplação",
    caption: "Cliente contemplado",
  },
  {
    src: "/images/conquistas/cliente-contemplado-02.jpeg",
    alt: "Cliente e representante da JIPA celebrando uma contemplação",
    caption: "Cliente contemplado",
  },
  {
    src: "/images/conquistas/cliente-contemplado-03.jpeg",
    alt: "Cliente com certificado de contemplação ao lado de representante da JIPA",
    caption: "Cliente contemplado",
  },
  {
    src: "/images/conquistas/cliente-contemplado-04.jpeg",
    alt: "Família e equipe celebrando uma contemplação",
    caption: "Conquista em família",
  },
  {
    src: "/images/conquistas/entrega-veiculo-01.jpeg",
    alt: "Casal com chave simbólica diante de um veículo",
    caption: "Veículo conquistado",
  },
  {
    src: "/images/conquistas/entrega-veiculo-02.jpeg",
    alt: "Cliente e representante ao lado de um veículo preparado para entrega",
    caption: "Veículo conquistado",
  },
  {
    src: "/images/conquistas/entrega-veiculo-03.jpeg",
    alt: "Cliente e representante ao lado de um carro branco",
    caption: "Veículo conquistado",
  },
] as const;

function ConquestCard({
  conquest,
  index,
  decorative = false,
}: {
  conquest: (typeof conquests)[number];
  index: number;
  decorative?: boolean;
}) {
  return (
    <figure className="conquest-card">
      <Image
        src={conquest.src}
        alt={decorative ? "" : conquest.alt}
        fill
        sizes="(max-width: 640px) 84vw, 360px"
      />
      <figcaption>
        <strong>{conquest.caption}</strong>
      </figcaption>
    </figure>
  );
}

export function ConquestsMarquee() {
  return (
    <div
      className="reviews-marquee conquests-marquee"
      tabIndex={0}
      aria-label="Fotos de clientes contemplados pela JIPA"
      data-reveal
    >
      <div className="reviews-track">
        <ul>
          {conquests.map((conquest, index) => (
            <li key={conquest.src}>
              <ConquestCard conquest={conquest} index={index} />
            </li>
          ))}
        </ul>
        <ul aria-hidden="true">
          {conquests.map((conquest, index) => (
            <li key={`copy-${conquest.src}`}>
              <ConquestCard conquest={conquest} index={index} decorative />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
