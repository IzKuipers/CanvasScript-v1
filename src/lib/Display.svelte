<script lang="ts">
  import { Pane } from "svelte-splitpanes";
  import { CanvasScriptLang } from "../ts/lang/main";
  import { CanvasScript } from "../ts/engine/main";
  import { Err } from "../ts/engine/error";
  import { onMount } from "svelte";
  import type { Writable } from "svelte/store";

  export let content: Writable<string>;
  export let lang: CanvasScriptLang;

  let engine: CanvasScript;
  let canvas: HTMLCanvasElement;

  onMount(update);

  content.subscribe(update);

  function update() {
    if (!canvas) return;
    $Err = null;
    engine = new CanvasScript(canvas);
    lang = new CanvasScriptLang($content, engine);
  }
</script>

{#if content}
  <Pane minSize={25} maxSize={75}>
    <div class="content">
      <canvas bind:this={canvas} />
    </div>
  </Pane>
{/if}
