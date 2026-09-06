export default function Hero({ onStart, onSurprise }) {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <p className="eyebrow">YOUR WEEKEND, YOUR WAY</p>
        <h1>Where will your <em>weekend</em> take you?</h1>
        <p className="hero-text">
          Karenda helps you discover a short escape based on your vibe,
          budget and travel time — then turns it into a simple weekend plan.
        </p>
        <div className="hero-actions">
          <button className="primary-btn" onClick={onStart}>✦ Find My Weekend</button>
          <button className="secondary-btn" onClick={onSurprise}>🎲 Surprise Me</button>
        </div>
        <div className="hero-stats">
          <span>✈ 6 curated escapes</span>
          <span>♥ Smart budget view</span>
          <span>✓ Weekend-ready plans</span>
        </div>
      </div>
      <div className="hero-card">
        <div className="floating-card top">☀️ Perfect weekend weather</div>
        <div className="hero-image-wrap">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80" alt="Weekend beach escape" />
        </div>
        <div className="floating-card bottom">
          <strong>Next escape</strong><br />Pondicherry · 3 hrs · ₹4.5k
        </div>
      </div>
    </section>
  );
}