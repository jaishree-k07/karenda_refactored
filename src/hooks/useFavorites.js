import { useState } from "react";

const STORAGE_KEY = "karenda-favorites";

// Encapsulates favorites state + its localStorage persistence.
// Previously this logic lived inline inside App.jsx; pulling it into its
// own hook means App.jsx no longer needs to know *how* favorites are
// stored, only that `favorites` is a list of ids and `toggleFavorite`
// flips membership in that list.
export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  });

  function toggleFavorite(id) {
    setFavorites(prev => {
      const next = prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  return { favorites, toggleFavorite };
}
