export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x))
export const smooth = (a, b, x) => {
  x = clamp((x - a) / (b - a))
  return x * x * (3 - 2 * x)
}
// Shared state read by the scroll-driven sky: hero day/night amount (0 = sunset, 1 = night)
export const store = { k: 1 }
