import { useMemo, useState } from "react";

export default function BudgetPlanner({ destination }) {
  const [budget, setBudget] = useState(destination?.budget || 5000);
  const [travel, setTravel] = useState(1200);
  const [stay, setStay] = useState(1800);
  const [food, setFood] = useState(1000);
  const [activities, setActivities] = useState(700);

  const total = useMemo(() => travel + stay + food + activities, [travel, stay, food, activities]);
  const difference = budget - total;
  const saved = difference > 0;

  return (
    <section className="budget-section" id="planner">
      <div className="section-heading centered">
        <p className="eyebrow">SPEND SMART</p>
        <h2>Will your weekend stay within budget?</h2>
        <p>Set your limit, estimate each expense and instantly see whether you are saving or overspending.</p>
      </div>

      <div className="budget-layout">
        <div className="budget-form">
          <h3>{destination ? `${destination.name} budget` : "Weekend budget"}</h3>
          <div className="input-group">
            <label>My total budget</label>
            <input type="number" value={budget} onChange={e => setBudget(Number(e.target.value))} />
          </div>
          <div className="input-group"><label>🚗 Travel</label><input type="number" value={travel} onChange={e => setTravel(Number(e.target.value))} /></div>
          <div className="input-group"><label>🏨 Stay</label><input type="number" value={stay} onChange={e => setStay(Number(e.target.value))} /></div>
          <div className="input-group"><label>🍜 Food</label><input type="number" value={food} onChange={e => setFood(Number(e.target.value))} /></div>
          <div className="input-group"><label>🎟 Activities</label><input type="number" value={activities} onChange={e => setActivities(Number(e.target.value))} /></div>
        </div>

        <div className={saved ? "budget-result saved" : "budget-result overspent"}>
          <span className="result-icon">{saved ? "✓" : "!"}</span>
          <p>{saved ? "You're within budget!" : "You're over budget"}</p>
          <h2>₹{Math.abs(difference).toLocaleString()}</h2>
          <span>{saved ? "estimated savings" : "extra amount needed"}</span>
          <div className="budget-bar">
            <div style={{ width: `${Math.min((total / Math.max(budget, 1)) * 100, 100)}%` }} />
          </div>
          <div className="budget-total">
            <span>Estimated spend</span><strong>₹{total.toLocaleString()}</strong>
          </div>
          <div className="budget-total">
            <span>Your budget</span><strong>₹{budget.toLocaleString()}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}