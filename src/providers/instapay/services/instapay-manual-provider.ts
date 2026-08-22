import instapayManualBase from "../core/instapay-manual-base";

class InstapayManualProvider extends instapayManualBase {
  static identifier = "instapay-manual";

  constructor(
    container: Record<string, unknown>,
    options: Record<string, unknown>
  ) {
    super(container, options);
  }
}

export default InstapayManualProvider;
