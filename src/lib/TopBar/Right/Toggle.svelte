<script lang="ts">
  import type { Writable } from "svelte/store";

  export let store: Writable<boolean>;
  export let caption = "";

  function toggle() {
    $store = !$store;
  }
</script>

<button
  class="material-icons-round toggle"
  class:active={$store}
  on:click={toggle}
  title={caption}
>
  <slot />
</button>
