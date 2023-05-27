<script lang="ts">
  import type { Writable } from "svelte/store";

  export let store: Writable<boolean>;
  export let caption = "";
  export let disabled = false;

  function toggle() {
    $store = !$store;
  }

  $: {
    if (disabled) $store = false;
  }
</script>

<button
  class="material-icons-round toggle"
  class:active={$store}
  on:click={toggle}
  title={caption}
  {disabled}
>
  <slot />
</button>
