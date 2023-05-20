<script lang="ts">
  import type { Writable } from "svelte/store";
  import type { OverlayOutput } from "../../ts/editor/interface";
  import type { CanvasScript } from "../../ts/engine/main";
  import { CanvasScriptLang } from "../../ts/lang/main";
  import { Parser } from "../../ts/lang/parser";

  export let content: Writable<string>;
  export let lang: CanvasScriptLang;

  let parser: Parser;
  let output: OverlayOutput[][] = [];

  content.subscribe((v) => {
    output = [];

    parser = new Parser(lang);

    const lines = v.split("\n");

    for (let l = 0; l < lines.length; l++) {
      output.push([]);
      const split = lines[l].replaceAll(" ", "&nbsp; ").split(" ");

      for (let i = 0; i < split.length; i++) {
        const x = split[i].replace("&nbsp;", "");

        output[l].push({
          class: `seg-${x}`,
          type: parser.getType(x),
          content: x,
        });
      }
    }
  });
</script>

<div class="editor-overlay">
  {#if parser && output && lang}
    {#each output as line}
      <div class="line">
        {#each line as seg}
          <div
            class="segment {seg.class} type-{seg.type}"
            class:iskey={!!parser.keywords[seg.content]}
          >
            {seg.content}&nbsp;
          </div>
        {/each}
      </div>
    {/each}
  {/if}
</div>
