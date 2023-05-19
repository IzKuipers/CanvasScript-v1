<script lang="ts">
  import { onMount } from "svelte";
  import { CanvasScript } from "./ts/engine/main";
  import { CanvasScriptLang } from "./ts/lang/main";
  import { writable } from "svelte/store";

  let canvas: HTMLCanvasElement;
  let content = writable<string>("");
  let lang: CanvasScriptLang;
  let engine: CanvasScript;

  onMount(() => {
    engine = new CanvasScript(canvas);
    lang = new CanvasScriptLang($content, engine);
  });

  content.subscribe((v) => {
    if (!v || !canvas) return;

    engine = new CanvasScript(canvas);
    lang = new CanvasScriptLang(v, engine);
  });
</script>

<canvas bind:this={canvas} />
<textarea bind:value={$content} cols="80" rows="25" />

<style scoped>
  canvas {
    image-rendering: pixelated;
  }
</style>
