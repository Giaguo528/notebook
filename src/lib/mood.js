// Colors the mood spectrum runs through, left (down) to right (happy).
const STOPS = [
  { at: 0, color: [90, 160, 245] }, // blue
  { at: 28, color: [120, 195, 245] }, // sky
  { at: 50, color: [96, 208, 160] }, // mint
  { at: 70, color: [255, 214, 70] }, // sunshine
  { at: 100, color: [255, 138, 61] }, // orange
];

const toCss = (rgb) => `rgb(${rgb.map(Math.round).join(",")})`;

export function moodColor(value) {
  const v = Math.min(100, Math.max(0, value));
  for (let i = 1; i < STOPS.length; i++) {
    const a = STOPS[i - 1];
    const b = STOPS[i];
    if (v <= b.at) {
      const t = (v - a.at) / (b.at - a.at);
      return toCss(a.color.map((c, k) => c + (b.color[k] - c) * t));
    }
  }
  return toCss(STOPS[STOPS.length - 1].color);
}

export const MOOD_GRADIENT = `linear-gradient(90deg, ${STOPS.map((s) => `${toCss(s.color)} ${s.at}%`).join(", ")})`;

export function moodLabel(value) {
  if (value < 15) return "Really down";
  if (value < 35) return "A bit low";
  if (value < 65) return "Okay";
  if (value < 85) return "Good";
  return "Super happy";
}
