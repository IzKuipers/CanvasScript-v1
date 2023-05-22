<script lang="ts">
  import { Pane } from "svelte-splitpanes";
  import type { Writable } from "svelte/store";
  import Overlay from "./TextArea/Overlay.svelte";
  import type { CanvasScriptLang } from "../ts/lang/main";
  import Statusbar from "./Statusbar.svelte";
  import { onMount } from "svelte";
  import { EditorVisible } from "../ts/ui/main";

  let editor: HTMLTextAreaElement;

  export let content: Writable<string>;
  export let lang: CanvasScriptLang;

  content.subscribe(updateSize);
  onMount(updateSize);

  function updateSize() {
    if (!editor) return;

    editor.style.height = `${editor.scrollHeight}px`;
  }
</script>

{#if content && $EditorVisible}
  <Pane minSize={40}>
    <div class="editor-wrapper">
      <div>
        <textarea
          spellcheck={false}
          bind:value={$content}
          bind:this={editor}
          on:change={updateSize}
          on:input={updateSize}
          on:keydown={updateSize}
          on:keypress={updateSize}
          class="editor"
        />
        <Overlay {content} {lang} />
      </div>
    </div>

    <Statusbar />
  </Pane>
{/if}
