<script lang="ts">
  import { onMount } from "svelte";
  import { CanvasScript } from "./ts/engine/main";

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const engine = new CanvasScript(canvas);

    engine.line(10, 10, 30, 30);
    engine.setColor("#f0f");
    engine.rect(true, 30, 30, 60, 60);
  });
</script>

<canvas bind:this={canvas} />

<style scoped>
  canvas {
    image-rendering: pixelated;
  }
</style>
