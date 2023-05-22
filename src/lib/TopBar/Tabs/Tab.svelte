<script lang="ts">
  import { onMount } from "svelte";
  import type { Tab } from "../../../ts/tabs/interface";

  export let id: string;
  export let data: Tab;
</script>

<button class="tab">
  <p class="caption">{data.caption}</p>
  <button class="material-icons-round">close</button>
</button>
