<script lang="ts">
  import { Err } from "../ts/engine/error";
</script>

<div class="statusbar">
  {#if $Err}
    <div class="error">
      {$Err.message} (line {$Err.line}, segment {$Err.seg})
    </div>
  {/if}
  <div class="right">
    <button class="material-icons-round">delete</button>
    <button class="material-icons-round">save</button>
    <button class="material-icons-round">archive</button>
  </div>
</div>
