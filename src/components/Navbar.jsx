import { useState } from "react";

export default function Navbar({ favoritesCount, onNavigate }) {
  const [open, setOpen] = useState(false);

  function go(id) {
    onNavigate(id);
    setOpen(false);
  }

  return (
    <nav className="navbar" aria-label="Main navigation">
      <button className="logo" onClick={() => go("home")} aria-label="Karenda home">
        <span aria-hidden="true">旅</span> KARENDA
      </button>
      <button
        className="hamburger"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? "✕" : "☰"}
      </button>
      <div className={open ? "nav-links open" : "nav-links"}>
        <button onClick={() => go("discover")}>Discover</button>
        <button onClick={() => go("planner")}>Budget Planner</button>
        <button onClick={() => go("reviews")}>Reviews</button>
        <button onClick={() => go("contact")}>Contact</button>
        <button
          className="favorite-nav"
          onClick={() => go("favorites")}
          aria-label={`View ${favoritesCount} saved favorites`}
        >
          <span aria-hidden="true">♥</span> {favoritesCount}
        </button>
      </div>
    </nav>
  );
}
