<script lang="ts">
  import { Err } from "../ts/engine/error";
</script>

<div class="statusbar">
  {#if $Err}
    <div class="right">
      <div class="error">
        {$Err.message} (line {$Err.line}, segment {$Err.seg})
      </div>
    </div>
  {/if}
</div>
