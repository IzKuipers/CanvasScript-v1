<script>
  import {
    CanvasPaneVisible,
    EditorVisible,
    KeywordPaneVisible,
    VariablePaneVisible,
  } from "../../ts/ui/main";
  import { PublicVariableStore } from "../../ts/var/main";
  import Toggle from "./Right/Toggle.svelte";
</script>

<div class="right">
  <Toggle
    store={VariablePaneVisible}
    caption="Variables"
    disabled={!Object.entries($PublicVariableStore).length}>view_in_ar</Toggle
  >
  <Toggle store={CanvasPaneVisible} caption="Show Canvas">visibility</Toggle>
  <Toggle store={KeywordPaneVisible} caption="Keywords">account_tree</Toggle>
</div>
