# Canvas Drawing Tools

Varoius tools and helpers for working with HTML Canvases.

## Helpers

### Common

#### `createCanvas(width, height)`

Returns a new HTML Canvas

#### `getCanvasContect(canvasOrId)`

Returns the canvas 2D context.


#### `drawToCanvas(width, height, drawCallback)`

Returns a new HTML canvas, after passing its context to the draw callback.

#### `rotateContext(context, angle)`

Rotates a 2D context around its center.

### Colors

#### `createLinearGradient(context, x0, y0, x1, y1, colorStops)`

Creates a linear gradient from a context.
`colorStops` is an array of objects `{ color: string, offset: number }`.
This allows to create a gradient in one single function call.

#### `createRadialGradient(context, x, y, r0, r1, colrStops)`

Creates a radial gradient from a context.

#### `getColorValues(color)`

Returns RGBA numeric values from a valid CSS color string. 

#### `rgbToHsl(red, green, blue)`

Converts a color from RGB to HSL.

#### `rgbToHsb(red, green, blue)`

Converts a color from RGB to HSB.

#### `hsbToRgb(hue, saturation, brightness)`

Converts a color from HSB to RGB.

#### `hexToRgb(color)`

Converts a color from HEX to RGB.