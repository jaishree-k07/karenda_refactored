
export default function DestinationCard({ destination, favorite, onFavorite, onExplore }) {
  return (
    <article className="destination-card">
      <div className="card-image">
        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
          width="400"
          height="300"
        />
        <button
          className={favorite ? "heart active" : "heart"}
          onClick={() => onFavorite(destination.id)}
          aria-label={favorite ? `Remove ${destination.name} from favorites` : `Save ${destination.name} to favorites`}
          aria-pressed={favorite}
        >
          {favorite ? "♥" : "♡"}
        </button>
        <span className="vibe-tag">{destination.vibe}</span>
      </div>
      <div className="card-body">
        <div className="title-row">
          <div>
            <h3>{destination.name}</h3>
            <p>📍 {destination.location}</p>
          </div>
          <span className="rating">★ {destination.rating}</span>
        </div>
        <p className="description">{destination.description}</p>
        <div className="mini-info">
          <span>🚗 {destination.travel} hrs</span>
          <span>₹{destination.budget.toLocaleString()}</span>
          <span>💬 {destination.reviews}</span>
        </div>
        <button className="outline-btn" onClick={() => onExplore(destination)}>Explore destination →</button>
      </div>
    </article>
  );
}
