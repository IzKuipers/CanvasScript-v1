<script lang="ts">
  import "./css/main.css";
  import { onMount } from "svelte";
  import { CanvasScript } from "./ts/engine/main";
  import { CanvasScriptLang } from "./ts/lang/main";
  import { writable } from "svelte/store";
  import { Pane, Splitpanes } from "svelte-splitpanes";
  import { Err } from "./ts/engine/error";

  let canvas: HTMLCanvasElement;
  let content = writable<string>("");
  let lang: CanvasScriptLang;
  let engine: CanvasScript;

  onMount(update);

  content.subscribe(update);

  function update() {
    if (!canvas) return;
    $Err = null;
    engine = new CanvasScript(canvas);
    lang = new CanvasScriptLang($content, engine);
  }
</script>

<Splitpanes class="mainframe">
  <Pane>
    <textarea bind:value={$content} cols="80" rows="25" class="editor" /></Pane
  >
  <Pane minSize={25}>
    <div class="content">
      <canvas bind:this={canvas} />
    </div>
  </Pane>
</Splitpanes>
<div class="statusbar">
  {#if $Err}
    <div>{$Err.message}</div>
    <div class="right">
      <div>Error in {$Err.line}, {$Err.seg}</div>
    </div>
  {/if}
</div>

<style scoped>
  canvas {
    image-rendering: pixelated;
    max-width: 100%;
  }

  div.content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>
