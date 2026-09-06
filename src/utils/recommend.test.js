import { describe, it, expect } from "vitest";
import { getRecommendations } from "./recommend";

const destinations = [
  { id: 1, tags: ["Beach"], rating: 4.5 },
  { id: 2, tags: ["Nature"], rating: 4.8 },
  { id: 3, tags: ["Beach", "Relax"], rating: 4.2 }
];

describe("getRecommendations", () => {
  it("falls back to top-rated when no favorites or vibe set", () => {
    const result = getRecommendations(destinations, [], { vibe: "Any" }, 2);
    expect(result[0].id).toBe(2);
  });

  it("scores by tag overlap when favorites exist", () => {
    const result = getRecommendations(destinations, [1], { vibe: "Any" }, 2);
    expect(result.some(d => d.id === 3)).toBe(true);
  });

  it("excludes already-favorited destinations from results", () => {
    const result = getRecommendations(destinations, [1], { vibe: "Any" }, 3);
    expect(result.some(d => d.id === 1)).toBe(false);
  });

  it("uses stated vibe preference when there are no favorites yet", () => {
    const result = getRecommendations(destinations, [], { vibe: "Beach" }, 2);
    expect(result.every(d => d.tags.includes("Beach"))).toBe(true);
  });
});
