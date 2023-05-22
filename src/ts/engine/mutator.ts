import type { Hex } from "../lang/interface";

export class CanvasMutator {
  context: CanvasRenderingContext2D;
  target: HTMLCanvasElement;

  background: Hex = "#000000";
  foreground: Hex = "#ffffff";
  multiplier: number = 0;

  constructor() {}

  line(
    width: number,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) {
    this.context.beginPath();
    this.context.moveTo(startX, startY);
    this.context.lineTo(endX, endY);

    const oWidth = this.context.lineWidth;

    this.context.lineWidth = width;
    this.context.stroke();
    this.context.lineWidth = oWidth;
  }

  rect(
    filled: boolean,
    width: number,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) {
    this.context.beginPath();
    if (filled)
      this.context.fillRect(startX, startY, endX - startX, endY - startY);
    else {
      const oWidth = this.context.lineWidth;

      this.context.lineWidth = width;
      this.context.strokeRect(startX, startY, endX - startX, endY - startY);
      this.context.lineWidth = oWidth;
    }
  }

  eclipse(
    filled: boolean,
    width: number,
    x: number,
    y: number,
    diameter: number
  ) {
    this.context.beginPath();
    const fillColor = this.foreground;

    this.setColor(this.background);
    this.context.arc(
      x + diameter / 2,
      y + diameter / 2,
      diameter / 2,
      0,
      Math.PI * 2
    );
    this.setColor(fillColor);

    if (filled) this.context.fill();
    else {
      const oWidth = this.context.lineWidth;

      this.context.lineWidth = width;
      this.context.stroke();
      this.context.lineWidth = oWidth;
    }
  }

  setColor(color: Hex) {
    this.foreground = color;
    this.context.strokeStyle = this.foreground;
    this.context.fillStyle = this.foreground;
  }

  setBackground(color: Hex) {
    this.background = color;
    this.context.fillStyle = this.background;

    this.context.fillRect(0, 0, this.target.width, this.target.height);
  }

  size(width: number, height: number) {
    this.target.width = width;
    this.target.height = height;
    this.setBackground(this.background);
    this.setColor(this.foreground);
  }

  multiplication(mult: number) {
    this.multiplier = mult;
  }
}
