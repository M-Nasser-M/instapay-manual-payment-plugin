import { ModuleProvider, Modules } from "@medusajs/framework/utils";
import { instapayManualProvider } from "./services";

const services = [instapayManualProvider];

export default ModuleProvider(Modules.PAYMENT, {
  services,
});
