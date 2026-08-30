import Image from "next/image";
import { ArrowRight } from "lucide-react";

type BrandPartnerCardProps = {
  name: string;
  slug: string;
  image: string;
  imageAlt: string;
  strength: string;
  title: string;
  description: string;
};

export function BrandPartnerCard({
  name,
  slug,
  image,
  imageAlt,
  strength,
  title,
  description,
}: BrandPartnerCardProps) {
  const titleId = `brand-${slug}-title`;

  return (
    <article
      className={`brand-card brand-card-${slug}`}
      aria-labelledby={titleId}
    >
      <div className="brand-card-logo">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 679px) 85vw, (max-width: 899px) 45vw, 360px"
        />
      </div>

      <div className="brand-card-copy">
        <p className="brand-card-strength">{strength}</p>
        <h3 id={titleId}>{title}</h3>
        <p>{description}</p>
      </div>

      <a
        className="brand-card-link"
        href="#simulador"
        aria-label={`Conhecer opções da ${name}`}
      >
        Conhecer opções
        <span aria-hidden="true">
          <ArrowRight />
        </span>
      </a>
    </article>
  );
}
