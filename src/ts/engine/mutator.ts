export class CanvasMutator {
  context: CanvasRenderingContext2D;
  target: HTMLCanvasElement;

  background: string = "#000000";
  foreground: string = "#ffffff";

  constructor() {}

  line(
    width: number,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) {
    this.context.moveTo(startX, startY);
    this.context.lineTo(endX, endY);

    const oWidth = this.context.lineWidth;

    this.context.lineWidth = width;
    this.context.stroke();
    this.context.lineWidth = oWidth;
  }

  rect(
    filled: boolean,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) {
    if (filled)
      this.context.fillRect(startX, startY, endX - startX, endY - startY);
    else this.context.strokeRect(startX, startY, endX - startX, endY - startY);
  }

  eclipse(filled: boolean, x: number, y: number, diameter: number) {
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
    else this.context.stroke();
  }

  setColor(color: string) {
    this.foreground = color;
    this.context.strokeStyle = this.foreground;
    this.context.fillStyle = this.foreground;
  }

  setBackground(color: string) {
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
}
