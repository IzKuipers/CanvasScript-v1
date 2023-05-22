<script lang="ts">
  import { tabStore } from "../../ts/tabs/store";
  import Tab from "./Tabs/Tab.svelte";

  let t: HTMLDivElement;

  //function for horizontal scrolling
  function event(e: WheelEvent) {
    if (!t) return;

    e.preventDefault();

    t.scrollLeft += e.deltaY / 1.75; // make it a tad slower than normal
  }
</script>

<div class="tabs" bind:this={t} on:wheel={event}>
  {#each Object.entries($tabStore) as tab}
    <Tab id={tab[0]} data={tab[1]} />
  {/each}
</div>
