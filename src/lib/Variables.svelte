<script lang="ts">
  import { Pane } from "svelte-splitpanes";
  import { CanvasScriptLang } from "../ts/lang/main";
  import type { VariableStore } from "../ts/var/interface";
  import { PublicVariableStore } from "../ts/var/main";
  import Row from "./Variables/Row.svelte";
  import { VariablePaneVisible } from "../ts/ui/main";

  export let lang: CanvasScriptLang;

  let store: VariableStore = {};

  PublicVariableStore.subscribe((v) => {
    store = {};

    setTimeout(() => (store = v || {}));
  });
</script>

{#if $VariablePaneVisible}
  <Pane size={15} maxSize={25} minSize={10}>
    <div class="variable-pane">
      {#each Object.entries(store) as variable}
        <Row {variable} {lang} />
      {/each}
    </div>
  </Pane>
{/if}
