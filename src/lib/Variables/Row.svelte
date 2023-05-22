<script lang="ts">
  import { onMount } from "svelte";
  import type { CanvasScriptLang } from "../../ts/lang/main";
  import Overlay from "../TextArea/Overlay.svelte";
  import { writable } from "svelte/store";

  export let variable: [string, string];
  export let lang: CanvasScriptLang;

  let content = writable<string>("");

  onMount(() => {
    content.set(variable[1]);
  });
</script>

{#if variable && $content}
  <div class="row">
    <p class="key">{variable[0]}</p>
    <div class="value"><Overlay {lang} {content} /></div>
  </div>
{/if}
