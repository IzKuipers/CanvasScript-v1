<script lang="ts">
  import type { OverlayOutput } from "../../../../ts/editor/interface";
  import type { Parser } from "../../../../ts/lang/parser";

  export let seg: OverlayOutput;
  export let parser: Parser;
</script>

<div
  class="segment {seg.class} type-{seg.type}"
  class:iskey={!!parser.keywords[seg.content]}
>
  {seg.content}&nbsp;
</div>
