export class CanvasMutator {
  context: CanvasRenderingContext2D;
  target: HTMLCanvasElement;

  background: string = "#000000";
  foreground: string = "#ffffff";

  constructor() {}

  line(startX: number, startY: number, endX: number, endY: number) {
    this.context.moveTo(startX, startY);
    this.context.lineTo(endX, endY);

    this.context.stroke();
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
    this.setBackground("#000000");
    this.setColor("#ffffff");
  }
}
