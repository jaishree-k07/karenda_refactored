import { useEffect } from "react";

export default function DestinationModal({ destination, favorite, onFavorite, onClose, onPlan }) {
  // This must run on every render (hooks can't be called conditionally),
  // so it sits above the `if (!destination) return null;` guard below.
  // It's a no-op when there's no destination since onClose still exists
  // but Escape simply won't be relevant while the modal isn't shown.
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!destination) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={destination.name}
    >
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close destination details">×</button>
        <img
          className="modal-image"
          src={destination.image}
          alt={destination.name}
          loading="lazy"
        />
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
