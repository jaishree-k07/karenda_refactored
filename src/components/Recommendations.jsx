export default function Recommendations({ items, favorites, onFavorite, onExplore, basedOnFavorites }) {
  if (!items.length) return null;

  return (
    <section className="recommendations-section" id="recommended" aria-label="Personalized recommendations">
      <div className="section-heading">
        <div>
          <p className="eyebrow">JUST FOR YOU</p>
          <h2>Recommended weekend picks.</h2>
          <p className="rec-subtext">
            {basedOnFavorites
              ? "Based on the vibe of the escapes you've already saved."
              : "Top-rated escapes to help you get started."}
          </p>
        </div>
      </div>

      <div className="destination-grid recommendations-grid">
        {items.map(d => (
          <article className="destination-card recommendation-card" key={d.id}>
            <div className="card-image">
              <img src={d.image} alt={d.name} />
              <button
                className={favorites.includes(d.id) ? "heart active" : "heart"}
                onClick={() => onFavorite(d.id)}
                aria-label={favorites.includes(d.id) ? `Remove ${d.name} from favorites` : `Save ${d.name} to favorites`}
                aria-pressed={favorites.includes(d.id)}
              >
                {favorites.includes(d.id) ? "♥" : "♡"}
              </button>
              <span className="vibe-tag">{d.vibe}</span>
              <span className="rec-badge">Recommended</span>
            </div>
            <div className="card-body">
              <div className="title-row">
                <div>
                  <h3>{d.name}</h3>
                  <p>📍 {d.location}</p>
                </div>
                <span className="rating">★ {d.rating}</span>
              </div>
              <p className="description">{d.description}</p>
              <button className="outline-btn" onClick={() => onExplore(d)}>
                Explore destination →
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
