<script lang="ts">
  import { Pane } from "svelte-splitpanes";
  import type { Writable } from "svelte/store";
  import Overlay from "./TextArea/Overlay.svelte";
  import type { CanvasScriptLang } from "../ts/lang/main";

  export let content: Writable<string>;
  export let lang: CanvasScriptLang;
</script>

{#if content}
  <Pane>
    <textarea
      spellcheck={false}
      bind:value={$content}
      cols="80"
      rows="25"
      class="editor"
    />
    <Overlay {content} {lang} />
  </Pane>
{/if}
