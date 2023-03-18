type ColorStop = { offset: number, color: string }

/**
 * Creates a canvas linear gradient from a canvas 2d context.
 * @param ctx the canvas context
 * @param x0 X start position
 * @param y0 Y start position
 * @param x1 X end position
 * @param y1 Y end position
 * @param colorStops solor stops
 * @returns {CanvasGradient}
 */
export function createLinearGradient (ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, colorStops: ColorStop[]) {
  const gradient = ctx.createLinearGradient(x0, y0, x1, y1);

  colorStops.forEach(({ offset, color }) => {
    gradient.addColorStop(offset, color);
  });

  return gradient;
}

/**
 * Creates a canvas radial gradient from a canvas `2d` context
 * @param ctx the canvas context
 * @param x X radial center position
 * @param y Y radial center position
 * @param r0 start radius
 * @param r1 end radius
 * @param colorStops color stops
 * @returns {CanvasGradient}
 */
export function createRadialGradient (ctx: CanvasRenderingContext2D, x: number, y: number, r0: number, r1: number, colorStops: ColorStop[]) {
  const gradient = ctx.createRadialGradient(x, y, r0, x, y, r1);

  colorStops.forEach(({ offset, color }) => {
    gradient.addColorStop(offset, color);
  });

  return gradient;
}

export function rgbToHsl (red: number, green: number, blue: number): [number, number, number] {
  red /= 255
  green /= 255
  blue /= 255

  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)

  let hue: number = 0;
  let saturation: number = 0;
  const lightness = (max + min) / 2

  if (max !== min) {
    const delta = max - min

    saturation = lightness > 0.5 ? (delta / (2 - max - min)) : (delta / (max + min))
    
    switch (max) {
      case red:
        hue = (green - blue) / delta + (green < blue ? 6 : 0)
        break
      case green:
        hue = (blue - red) / delta + 2
        break
      case blue:
        hue = (red - green) / delta + 4
        break
    }
    hue /= 6
  }
  return [hue, saturation, lightness]
}

export function rgbToHsb (red: number, green: number, blue: number): [number, number, number] {
  red = red / 255
  green = green / 255
  blue = blue / 255

  let hue = 0;
  const max = Math.max(red, green, blue)
  const min = Math.min(red, green, blue)
  const brightness = max
  const delta = max - min
  const saturation = max === 0 ? 0 : delta / max

  if (max !== min) {
    switch (max) {
      case red:
        hue = (green - blue) / delta + (green < blue ? 6 : 0)
        break
      case green:
        hue = (blue - red) / delta + 2
        break
      case blue:
        hue = (red - green) / delta + 4
        break
    }
    hue /= 6
  }
  return [hue, saturation, brightness]
}

export function hsbToRgb (hue: number, saturation: number, brightness: number): [number, number, number] {
  let r = 0;
  let g = 0;
  let b = 0;

  const i = Math.floor(hue * 6);
  const f = hue * 6 - i;
  const p = brightness * (1 - saturation);
  const q = brightness * (1 - f * saturation);
  const t = brightness * (1 - (1 - f) * saturation);

  switch (i % 6) {
    case 0:
      r = brightness
      g = t
      b = p
      break
    case 1:
      r = q
      g = brightness
      b = p
      break
    case 2:
      r = p
      g = brightness
      b = t
      break
    case 3:
      r = p
      g = q
      b = brightness
      break
    case 4:
      r = t
      g = p
      b = brightness
      break
    case 5:
      r = brightness
      g = p
      b = q
      break
  }

  return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)]
}

export function hexToRgb (hex: string): [number, number, number] {
  hex = hex.charAt(0) === "#" ? hex.substring(1, 7) : hex

  return [
    parseInt(hex.substring(0, 2), 16), // red
    parseInt(hex.substring(2, 4), 16), // green
    parseInt(hex.substring(4, 6), 16), // blue
  ];
}