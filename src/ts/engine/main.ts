import { CanvasError } from "./error";
import { CanvasMutator } from "./mutator";

export class CanvasScript extends CanvasMutator {
  constructor(target: HTMLCanvasElement) {
    super();

    if (!target)
      throw new CanvasError("Can't initialize class without valid <canvas>");

    this.target = target;

    this.init();
  }

  public init() {
    this.context = this.target.getContext("2d");
    this.setBackground(this.background);
    this.setColor(this.foreground);
    this.size(512, 512);
  }
}
