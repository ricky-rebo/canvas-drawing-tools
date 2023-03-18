type FillStrokeStyle = string | CanvasGradient | CanvasPattern

type MoveTo         = { step: 'move-to', x: number, y: number }
type LineTo         = { step: 'line-to', x: number, y: number }
type Arc            = { step: 'arc', x: number, y: number, radius: number, startAngle: number, endAngle: number, clockwise?: boolean }
type ArcTo          = { step: 'arc-to', x1: number, y1: number, x2: number, y2: number, radius: number }
type BeziereCurveTo = { step: 'beziere-curve-to', cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number }
type ClosePath      = { step: 'close' }

type DrawInstruction = MoveTo | LineTo | Arc | ArcTo | BeziereCurveTo | ClosePath

function drawSegment(ctx: CanvasRenderingContext2D, key: DrawInstruction) {
  switch (key.step) {
    case "move-to":
      ctx.moveTo(key.x, key.y)
      break
    case "line-to":
      ctx.lineTo(key.x, key.y)
      break
    case "arc":
      ctx.arc(key.x, key.y, key.radius, key.startAngle, key.endAngle, key.clockwise)
      break
    case "arc-to":
      ctx.arcTo(key.x1, key.y1, key.x2, key.y2, key.radius)
      break
    case "beziere-curve-to":
      ctx.bezierCurveTo(key.cp1x, key.cp1y, key.cp2x, key.cp2y, key.x, key.y)
      break
    case "close":
      ctx.closePath()
  }
}

export function drawPath (ctx: CanvasRenderingContext2D, pathInstructionSet: DrawInstruction[]) {
  ctx.beginPath()
  pathInstructionSet.forEach(
    instruction => drawSegment(ctx, instruction)
  )
}


export function fillPath (ctx: CanvasRenderingContext2D, fillStyle: FillStrokeStyle, pathInstructionSet: DrawInstruction[]) {
  ctx.save();

  ctx.fillStyle = fillStyle;

  drawPath(ctx, pathInstructionSet);

  ctx.fill();

  ctx.restore();
}


export function strokePath (ctx: CanvasRenderingContext2D, strokeStyle: FillStrokeStyle, pathInstructionSet: DrawInstruction[]) {
  ctx.save()

  ctx.strokeStyle = strokeStyle

  drawPath(ctx, pathInstructionSet);

  ctx.stroke()

  ctx.restore()
}
