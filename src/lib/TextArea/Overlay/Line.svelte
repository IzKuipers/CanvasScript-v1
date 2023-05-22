<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { OverlayOutput } from "../../../ts/editor/interface";
  import type { Parser } from "../../../ts/lang/parser";
  import Segment from "./Line/Segment.svelte";

  export let line: OverlayOutput[] = [];
  export let parser: Parser;
  export let content: Writable<string>;
  export let i: number;
</script>

<div class="line" class:iscomment={line[0].content.startsWith("'")}>
  <div class="linenr">{i + 1}</div>
  {#each line as seg}
    <Segment {seg} {parser} {content} />
  {/each}
</div>
