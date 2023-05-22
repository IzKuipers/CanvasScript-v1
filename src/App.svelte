<script lang="ts">
  import { Splitpanes } from "svelte-splitpanes";
  import { writable } from "svelte/store";
  import "./css/main.css";
  import TextArea from "./lib/TextArea.svelte";
  import { Err } from "./ts/engine/error";
  import Display from "./lib/Display.svelte";
  import type { CanvasScriptLang } from "./ts/lang/main";
  import Statusbar from "./lib/Statusbar.svelte";
  import TopBar from "./lib/TopBar.svelte";
  import Variables from "./lib/Variables.svelte";
  import { onMount } from "svelte";

  let content = writable<string>("");
  let lang: CanvasScriptLang;
  let done = false;

  onMount(() => {
    done = false;
    setTimeout(() => {
      done = true;
    });
  });
</script>

<div class="app" class:done>
  <TopBar />
  <Splitpanes class="mainframe">
    <Variables {lang} />
    <TextArea {content} {lang} />
    <Display {content} bind:lang />
  </Splitpanes>
</div>
