/**
 * Creates an HTML Canvas Element.
 * @param width canvas width
 * @param height canvas height (default: equal to `width`)
 * @returns {HTMLCanvasElement}
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