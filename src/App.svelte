<script lang="ts">
  import { Splitpanes } from "svelte-splitpanes";
  import { writable } from "svelte/store";
  import "./css/main.css";
  import TextArea from "./lib/TextArea.svelte";
  import { Err } from "./ts/engine/error";
  import Display from "./lib/Display.svelte";
  import type { CanvasScriptLang } from "./ts/lang/main";
  import Statusbar from "./lib/Statusbar.svelte";

  let content = writable<string>("");
  let lang: CanvasScriptLang;
</script>

<Splitpanes class="mainframe">
  <TextArea {content} {lang} />
  <Display {content} bind:lang />
</Splitpanes>
<Statusbar />
