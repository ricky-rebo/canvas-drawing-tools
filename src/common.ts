/**
 * Creates an HTML Canvas Element.
 * @param width canvas width
 * @param height canvas height (default: equal to `width`)
 * @returns A newly created HTML canvas
 */
export function createCanvas (width: number, height: number = width) {
  const buffer = document.createElement('canvas');
  buffer.width = width;
  buffer.height = height;
  
  return buffer;
}


/**
 * Obtains the canvas context by passing the canvas element, o its ID.
 * @param elementOrId canvas element itself, or its ID
 * @returns {CanvasRenderingContext2D}
 * @throws {Error} if cannot obtain canvas context
 */
export function getCanvasContext (elementOrId: HTMLCanvasElement | string) {
  const element = (typeof elementOrId === 'string')
      ? document.getElementById(elementOrId) as HTMLCanvasElement
      : elementOrId

  const ctx = element?.getContext('2d');

  if (!ctx) {
    throw new Error("Unable to get canvas context!");
  }

  return ctx;
}

/**
 * Creates a canvas and draw into it
 * @param width Canvas width
 * @param height Canvas height
 * @param drawFunction Draw callback
 * @returns The resulting canvas
 */
export function drawToCanvas (width: number, height: number, drawFunction: (ctx: CanvasRenderingContext2D) => void) {
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw Error("Unable to get canvas context!")
  }

  drawFunction(ctx)

  return canvas
}

/**
 * Rotates a contex around its center
 * @param ctx Contect to rotate
 * @param angle Rotation angle
 * @param centerX Rotation center X
 * @param centerY Rotation center Y
 */
export function rotateContext (ctx: CanvasRenderingContext2D, angle: number, centerX = ctx.canvas.width/2, centerY = ctx.canvas.height/2) {
  ctx.translate(centerX, centerY)
  ctx.rotate(angle)
  ctx.translate(-centerX, -centerY)
}