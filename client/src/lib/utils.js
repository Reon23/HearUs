// src/lib/utils.ts (or utils.js)

export function cn(...inputs) {
  return inputs.filter(Boolean).join(" ");
}