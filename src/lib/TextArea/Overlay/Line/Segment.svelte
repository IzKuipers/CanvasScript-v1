<script lang="ts">
  import { onMount } from "svelte";
  import type { OverlayOutput } from "../../../../ts/editor/interface";
  import type { Parser } from "../../../../ts/lang/parser";
  import type { Writable } from "svelte/store";

  export let seg: OverlayOutput;
  export let parser: Parser;
  export let content: Writable<string>;

  let isvar = false;
  let iskey = false;
  let issetter = false;

  onMount(() => {
    const c = seg.content;
    const key = seg.content.replace("$", "");
    isvar = c.startsWith("$") && parser.lang.vars.get(key) != key;
    issetter = c.startsWith("@");
    iskey = !!parser.keywords[c];
  });
</script>

<div
  class="segment {seg.class} type-{seg.type}"
  class:iskey
  class:isvar
  class:issetter
>
  {seg.content}&nbsp;
</div>
