import { useState } from "react";

const vibes = ["Any", "Beach", "Nature", "Adventure", "Culture", "Relax"];
const budgets = [
  { label: "Budget", max: 4500 },
  { label: "Comfort", max: 6000 },
  { label: "Premium", max: 10000 }
];

export default function PreferenceSelector({ onApply, onClose }) {
  const [vibe, setVibe] = useState("Any");
  const [budget, setBudget] = useState(6000);
  const [travel, setTravel] = useState(6);

  return (
    <div className="preference-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">PERSONALIZE YOUR ESCAPE</p>
          <h2>Tell us what your weekend feels like.</h2>
        </div>
        <button className="close-btn" onClick={onClose} aria-label="Close preferences panel">×</button>
      </div>

      <label>1. Pick your vibe</label>
      <div className="choice-grid">
        {vibes.map(v => (
          <button
            key={v}
            className={vibe === v ? "choice active" : "choice"}
            onClick={() => setVibe(v)}
            aria-pressed={vibe === v}
          >
            {v === "Any" ? "✨ Any" : v === "Beach" ? "🌊 Beach" : v === "Nature" ? "🌿 Nature" : v === "Adventure" ? "⛰ Adventure" : v === "Culture" ? "🏛 Culture" : "☕ Relax"}
          </button>
        ))}
      </div>

      <label>2. Pick your budget</label>
      <div className="choice-grid">
        {budgets.map(b => (
          <button
            key={b.max}
            className={budget === b.max ? "choice active" : "choice"}
            onClick={() => setBudget(b.max)}
            aria-pressed={budget === b.max}
          >
            {b.label}<small> up to ₹{b.max.toLocaleString()}</small>
          </button>
        ))}
      </div>

      <label htmlFor="travel-range">3. Maximum travel time</label>
      <div className="range-row">
        <input
          id="travel-range"
          type="range"
          min="2"
          max="10"
          value={travel}
          onChange={e => setTravel(Number(e.target.value))}
          aria-valuemin={2}
          aria-valuemax={10}
          aria-valuenow={travel}
          aria-label={`Maximum travel time: ${travel} hours`}
        />
        <strong>{travel} hrs</strong>
      </div>

      <button className="primary-btn full" onClick={() => onApply({ vibe, budget, travel })}>
        Show My Weekend Matches →
      </button>
    </div>
  );
}