<script lang="ts">
  import { Splitpanes } from "svelte-splitpanes";
  import { writable } from "svelte/store";
  import "./css/main.css";
  import TextArea from "./lib/TextArea.svelte";
  import { Err } from "./ts/engine/error";
  import Display from "./lib/Display.svelte";
  import type { CanvasScriptLang } from "./ts/lang/main";

  let content = writable<string>("");
  let lang: CanvasScriptLang;
</script>

<Splitpanes class="mainframe">
  <TextArea {content} {lang} />
  <Display {content} bind:lang />
</Splitpanes>
<div class="statusbar">
  {#if $Err}
    <div>{$Err.message}</div>
    <div class="right">
      <div>Error in {$Err.line}, {$Err.seg}</div>
    </div>
  {/if}
</div>
