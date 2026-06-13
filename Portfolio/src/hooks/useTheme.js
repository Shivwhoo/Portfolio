// Theme hook — replaced with poster-only design system.
// Dark mode toggle is no longer used; the Living Poster aesthetic
// is always on. This hook is kept as a no-op to avoid breaking Redux state.
export default function useTheme() {
  // No-op: poster palette defined entirely in global.css via CSS variables.
  // The dark class being added/removed no longer affects the new design system.
}