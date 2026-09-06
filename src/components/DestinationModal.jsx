export default function DestinationModal({ destination, favorite, onFavorite, onClose, onPlan }) {
  if (!destination) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close destination details">×</button>
        <img className="modal-image" src={destination.image} alt={destination.name} />
        <div className="modal-content">
          <p className="eyebrow">{destination.vibe.toUpperCase()} ESCAPE</p>
          <div className="title-row">
            <div><h2>{destination.name}</h2><p>📍 {destination.location}</p></div>
            <span className="rating">★ {destination.rating}</span>
          </div>
          <p>{destination.description}</p>
          <h4>Highlights</h4>
          <div className="highlight-list">
            {destination.highlights.map(h => <span key={h}>✓ {h}</span>)}
          </div>
          <div className="modal-stats">
            <span>🚗 {destination.travel} hrs travel</span>
            <span>💰 ₹{destination.budget.toLocaleString()} estimated</span>
            <span>💬 {destination.reviews} reviews</span>
          </div>
          <div className="modal-actions">
            <button
              className="secondary-btn"
              onClick={() => onFavorite(destination.id)}
              aria-pressed={favorite}
            >
              {favorite ? "♥ Saved" : "♡ Save"}
            </button>
            <button className="primary-btn" onClick={() => onPlan(destination)}>🗓 Plan My Weekend</button>
          </div>
        </div>
      </div>
    </div>
  );
}