function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]) {
  return `#${[r, g, b].map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;
}

// Mixes `hex` toward white (percent > 0) or black (percent < 0).
export function shade(hex, percent) {
  const [r, g, b] = hexToRgb(hex);
  const target = percent < 0 ? 0 : 255;
  const p = Math.abs(percent);
  return rgbToHex([r + (target - r) * p, g + (target - g) * p, b + (target - b) * p]);
}
