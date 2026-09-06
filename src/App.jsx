import { useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PreferenceSelector from "./components/PreferenceSelector";
import DestinationCard from "./components/DestinationCard";
import DestinationModal from "./components/DestinationModal";
import Recommendations from "./components/Recommendations";
import BudgetPlanner from "./components/BudgetPlanner";
import Reviews from "./components/Reviews";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { destinations } from "./data/destinations";
import { getRecommendations } from "./utils/recommend";

const SORT_OPTIONS = [
  { value: "rating-desc", label: "Top rated" },
  { value: "budget-asc", label: "Budget: low to high" },
  { value: "budget-desc", label: "Budget: high to low" },
  { value: "travel-asc", label: "Travel time: shortest first" }
];

export default function App() {
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [filters, setFilters] = useState({ vibe: "Any", budget: 10000, travel: 10 });
  const [selected, setSelected] = useState(null);
  const [plannerDestination, setPlannerDestination] = useState(null);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("rating-desc");
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("karenda-favorites")) || []; }
    catch { return []; }
  });

  const visible = useMemo(() => {
    const filtered = destinations.filter(d => {
      const matchesSearch = `${d.name} ${d.location} ${d.vibe}`.toLowerCase().includes(search.toLowerCase());
      const matchesVibe = filters.vibe === "Any" || d.tags.includes(filters.vibe);
      return matchesSearch && matchesVibe && d.budget <= filters.budget && d.travel <= filters.travel;
    });

    const [field, direction] = sortBy.split("-");
    const sorted = [...filtered].sort((a, b) => {
      const diff = a[field] - b[field];
      return direction === "asc" ? diff : -diff;
    });

    return sorted;
  }, [search, filters, sortBy]);

  const recommended = useMemo(
    () => getRecommendations(destinations, favorites, filters),
    [favorites, filters]
  );

  function toggleFavorite(id) {
    setFavorites(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      localStorage.setItem("karenda-favorites", JSON.stringify(next));
      return next;
    });
  }

  function applyPreferences(next) {
    setFilters(next);
    setPreferencesOpen(false);
    setTimeout(() => document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  function surprise() {
    const random = destinations[Math.floor(Math.random() * destinations.length)];
    setSelected(random);
  }

  function navigate(id) {
    if (id === "favorites") {
      setSearch("");
      setFilters({ vibe: "Any", budget: 10000, travel: 10 });
      setTimeout(() => document.getElementById("discover")?.scrollIntoView({ behavior: "smooth" }), 50);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      <Navbar favoritesCount={favorites.length} onNavigate={navigate} />
      <main>
        <Hero onStart={() => setPreferencesOpen(true)} onSurprise={surprise} />

        {preferencesOpen && (
          <PreferenceSelector onApply={applyPreferences} onClose={() => setPreferencesOpen(false)} />
        )}

        <Recommendations
          items={recommended}
          favorites={favorites}
          onFavorite={toggleFavorite}
          onExplore={setSelected}
          basedOnFavorites={favorites.length > 0}
        />

        <section className="discover-section" id="discover">
          <div className="section-heading">
            <div>
              <p className="eyebrow">CURATED FOR YOUR WEEKEND</p>
              <h2>Find your next escape.</h2>
            </div>
            <button className="secondary-btn" onClick={() => setPreferencesOpen(true)}>✦ Change preferences</button>
          </div>

          <div className="search-row">
            <div className="search-box">
              ⌕ <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search destinations..."
                aria-label="Search destinations"
              />
            </div>
            <div className="sort-row">
              <label htmlFor="sort-select" className="sort-label">Sort by</label>
              <select
                id="sort-select"
                className="sort-select"
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                aria-label="Sort destinations"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <span>{visible.length} matches</span>
          </div>

          <div className="active-filters">
            <span>Vibe: <strong>{filters.vibe}</strong></span>
            <span>Budget: <strong>₹{filters.budget.toLocaleString()}</strong></span>
            <span>Travel: <strong>≤ {filters.travel} hrs</strong></span>
          </div>

          {visible.length ? (
            <div className="destination-grid">
              {visible.map(d => (
                <DestinationCard
                  key={d.id}
                  destination={d}
                  favorite={favorites.includes(d.id)}
                  onFavorite={toggleFavorite}
                  onExplore={setSelected}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>🧭</span>
              <h3>No perfect match yet.</h3>
              <p>Try increasing your budget or travel time.</p>
              <button className="primary-btn" onClick={() => setFilters({ vibe: "Any", budget: 10000, travel: 10 })}>Show all destinations</button>
            </div>
          )}

          {favorites.length > 0 && (
            <div className="favorites-strip">
              <strong>♥ Your saved escapes</strong>
              <span>{favorites.map(id => destinations.find(d => d.id === id)?.name).filter(Boolean).join(" · ")}</span>
            </div>
          )}
        </section>

        <BudgetPlanner destination={plannerDestination} />
        <Reviews />
        <Contact />
      </main>

      <Footer />

      <DestinationModal
        destination={selected}
        favorite={selected ? favorites.includes(selected.id) : false}
        onFavorite={toggleFavorite}
        onClose={() => setSelected(null)}
        onPlan={(d) => {
          setPlannerDestination(d);
          setSelected(null);
          setTimeout(() => document.getElementById("planner")?.scrollIntoView({ behavior: "smooth" }), 100);
        }}
      />
    </div>
  );
}