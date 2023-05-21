<script lang="ts">
  import { Err } from "../ts/engine/error";
</script>

<div class="statusbar">
  {#if $Err}
    <div class="error">
      <span> Line {$Err.line}: {$Err.message}</span>
    </div>
  {:else}
    <div class="fine">
      <span>No issues found</span>
    </div>
  {/if}
  <div class="right">
    <button class="material-icons-round">delete</button>
    <button class="material-icons-round">save</button>
    <button class="material-icons-round">archive</button>
  </div>
</div>
