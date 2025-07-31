import instapayManualBase from "../core/instapay-manual-base";

class instapayManualProvider extends instapayManualBase {
  static identifier = "instapay-manual";

  constructor(_, options) {
    super(_, options);
  }
  get paymentOptions(): PaymentOptions {
    return {};
  }
}

export default instapayManualProvider;
