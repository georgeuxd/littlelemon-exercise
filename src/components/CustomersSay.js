
const reviews = [
  {
    name: "Alex M.",
    quote: "Fresh flavors, beautifully presented dishes and a welcoming atmosphere.",
  },
  {
    name: "Maria D.",
    quote: "A lovely place for a relaxed dinner. Every detail felt thoughtful.",
  },
  {
    name: "Daniel R.",
    quote: "Excellent food and warm service. A restaurant I would happily revisit.",
  },
];

export default function CustomersSay() {
  return (
    <section className="testimonials">
      <p className="eyebrow">Kind words from our guests</p>
      <h2>Made to Be Remembered</h2>

      <div className="testimonials-grid">
        {reviews.map((review) => (
          <article className="testimonial-card" key={review.name}>
            <div className="testimonial-stars" aria-label="5 out of 5 stars">
              ★★★★★
            </div>

            <p>“{review.quote}”</p>
            <h3>{review.name}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
