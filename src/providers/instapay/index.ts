import { ModuleProvider, Modules } from "@medusajs/framework/utils";
import { InstapayManualProvider } from "./services";

const services = [InstapayManualProvider];

export default ModuleProvider(Modules.PAYMENT, {
  services,
});
