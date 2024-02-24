import { drawToCanvas } from "./common";

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

/**
 * Retrieve color data in RGBA order from a color string
 * @param color A valid CSS color string
 * @returns Returns the one-dimensional array containing the data in RGBA order, as integers in the range 0 to 255.
 */
export function getColorValues(color: string): [number, number, number, number] {
  const lookupBuffer = drawToCanvas(1, 1, function (ctx) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(0, 0, 1, 1);
    ctx.fill();
  });

  const colorData = lookupBuffer.getContext("2d")!.getImageData(0, 0, 2, 2).data;

  return [colorData[0], colorData[1], colorData[2], colorData[3]];
}

/**
 * Convert a color from RGB to HSL
 * @param red Red value [0-255]
 * @param green Green value [0-255]
 * @param blue Blue color values [0-255]
 * @returns HSL color values
 */
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

/**
 * Convert a color from RGB to HSB
 * @param red Red value [0-255]
 * @param green Green value [0-255]
 * @param blue Blue color values [0-255]
 * @returns HSB color values
 */
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

/**
 * Convert a color from HSB to RGB
 * @param hue Hue value
 * @param saturation Saturation value
 * @param brightness Brightness value
 * @returns RGB color values
 */
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

/**
 * Convert a color from HEX to RGB
 * @param hex HEX color string
 * @returns RGB color values
 */
export function hexToRgb (hex: string): [number, number, number] {
  hex = hex.startsWith("#") ? hex.substring(1, 7) : hex

  return [
    parseInt(hex.substring(0, 2), 16), // red
    parseInt(hex.substring(2, 4), 16), // green
    parseInt(hex.substring(4, 6), 16), // blue
  ];
}
