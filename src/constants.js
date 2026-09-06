// Shared default values used across the app.
// Kept in one place so App.jsx doesn't repeat the same literal object
// in three different spots (initial state, "reset" navigation, and the
// empty-state "show all destinations" button).

export const DEFAULT_FILTERS = { vibe: "Any", budget: 10000, travel: 10 };
