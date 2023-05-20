<script lang="ts">
  import type { OverlayOutput } from "../../../ts/editor/interface";
  import type { Parser } from "../../../ts/lang/parser";
  import Segment from "./Line/Segment.svelte";

  export let line: OverlayOutput[] = [];
  export let parser: Parser;
</script>

<div class="line" class:iscomment={line[0].content.startsWith("'")}>
  {#each line as seg}
    <Segment {seg} {parser} />
  {/each}
</div>
