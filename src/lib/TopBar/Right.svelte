<script>
  import {
    CanvasPaneVisible,
    EditorVisible,
    KeywordPaneVisible,
    VariablePaneVisible,
  } from "../../ts/ui/main";
  import Toggle from "./Right/Toggle.svelte";
</script>

<div class="right">
  <Toggle store={VariablePaneVisible} caption="Variables">view_in_ar</Toggle>
  <Toggle store={CanvasPaneVisible} caption="Show Canvas">visibility</Toggle>
  <Toggle store={KeywordPaneVisible} caption="Keywords">account_tree</Toggle>
</div>
