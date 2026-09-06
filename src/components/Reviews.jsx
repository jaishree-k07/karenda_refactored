const reviews = [
  { name: "Ananya R.", trip: "Pondicherry", rating: 5, text: "I picked a beach vibe and Karenda instantly gave me a weekend idea. The budget view was surprisingly useful!" },
  { name: "Rahul S.", trip: "Kodaikanal", rating: 5, text: "The experience feels much easier than opening ten travel tabs. I loved the quick itinerary." },
  { name: "Meera K.", trip: "Mysuru", rating: 4, text: "Simple, clean and fun to use. The Surprise Me button is my favourite part." }
];

export default function Reviews() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="section-heading centered">
        <p className="eyebrow">TRAVELER STORIES</p>
        <h2>Weekend plans people loved.</h2>
        <p>Realistic mock reviews for the frontend demo.</p>
      </div>
      <div className="review-grid">
        {reviews.map(r => (
          <article className="review-card" key={r.name}>
            <div className="stars">{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div>
            <p>"{r.text}"</p>
            <div className="reviewer"><span>{r.name[0]}</span><div><strong>{r.name}</strong><small>{r.trip} · Weekend traveler</small></div></div>
          </article>
        ))}
      </div>
    </section>
  );
}