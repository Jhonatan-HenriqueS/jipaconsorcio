import { ExternalLink, Quote } from "lucide-react";

import { reviews } from "@/data/reviews";

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  const authorInitial = review.author.trim().charAt(0).toLocaleUpperCase("pt-BR");

  return (
    <article className="review-card">
      <Quote aria-hidden="true" />
      <blockquote>
        <p>“{review.quote}”</p>
      </blockquote>
      <footer>
        <span className="review-avatar" aria-hidden="true">
          {authorInitial}
        </span>
        <div className="review-author">
          <cite>{review.author}</cite>
          <a href={review.source} target="_blank" rel="noreferrer">
            Avaliação publicada no Google
            <ExternalLink aria-hidden="true" />
          </a>
        </div>
      </footer>
    </article>
  );
}

export function ReviewsMarquee() {
  return (
    <div
      className="reviews-marquee"
      tabIndex={0}
      aria-label="Avaliações de clientes"
      data-reveal
    >
      <div className="reviews-track">
        <ul>
          {reviews.map((review) => (
            <li key={review.author}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
        <ul aria-hidden="true">
          {reviews.map((review) => (
            <li key={`copy-${review.author}`}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
