export default function Navbar({ favoritesCount, onNavigate }) {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <button className="logo" onClick={() => onNavigate("home")} aria-label="Karenda home">
        <span aria-hidden="true">旅</span> KARENDA
      </button>
      <div className="nav-links">
        <button onClick={() => onNavigate("discover")}>Discover</button>
        <button onClick={() => onNavigate("planner")}>Budget Planner</button>
        <button onClick={() => onNavigate("reviews")}>Reviews</button>
        <button onClick={() => onNavigate("contact")}>Contact</button>
        <button
          className="favorite-nav"
          onClick={() => onNavigate("favorites")}
          aria-label={`View ${favoritesCount} saved favorites`}
        >
          <span aria-hidden="true">♥</span> {favoritesCount}
        </button>
      </div>
    </nav>
  );
}