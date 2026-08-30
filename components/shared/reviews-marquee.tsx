import { ExternalLink, Quote } from "lucide-react";

import { reviews } from "@/data/reviews";

function ReviewCard({ review }: { review: (typeof reviews)[number] }) {
  return (
    <article className="review-card">
      <Quote aria-hidden="true" />
      <blockquote>
        <p>“{review.quote}”</p>
      </blockquote>
      <footer>
        <cite>{review.author}</cite>
        <a href={review.source} target="_blank" rel="noreferrer">
          Avaliação publicada no Google
          <ExternalLink aria-hidden="true" />
        </a>
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
