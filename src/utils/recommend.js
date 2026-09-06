// Personalized recommendation engine.
//
// This is intentionally separate from the manual search/filter logic in
// App.jsx. Filtering answers "show me destinations matching these exact
// criteria I picked." Recommendations answer "based on what you've already
// liked (or, if you haven't liked anything yet, your stated preferences),
// what else might you enjoy?" The two features use different inputs and
// different logic, so they aren't the same feature wearing two hats.
//
// Strategy, in priority order:
// 1. If the user has favorited destinations, build a "taste profile" from
//    the tags of those favorites (a simple frequency count), then score
//    every non-favorited destination by how many of its tags overlap with
//    that profile, using rating as a tiebreaker.
// 2. If there are no favorites yet but the user has applied a preference
//    (vibe other than "Any"), recommend the highest-rated destinations
//    that match that vibe.
// 3. If neither signal exists yet, fall back to the overall highest-rated
//    destinations, so the section is never empty.

export function getRecommendations(destinations, favoriteIds, filters, limit = 3) {
  const favorited = destinations.filter(d => favoriteIds.includes(d.id));

  if (favorited.length > 0) {
    const tasteProfile = {};
    favorited.forEach(d => {
      d.tags.forEach(tag => {
        tasteProfile[tag] = (tasteProfile[tag] || 0) + 1;
      });
    });

    return destinations
      .filter(d => !favoriteIds.includes(d.id))
      .map(d => {
        const overlapScore = d.tags.reduce((sum, tag) => sum + (tasteProfile[tag] || 0), 0);
        return { destination: d, score: overlapScore * 10 + d.rating };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(entry => entry.destination);
  }

  if (filters?.vibe && filters.vibe !== "Any") {
    return destinations
      .filter(d => d.tags.includes(filters.vibe))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit);
  }

  return [...destinations].sort((a, b) => b.rating - a.rating).slice(0, limit);
}
