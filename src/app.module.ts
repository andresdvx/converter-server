import { Application } from "express";
import { UserModule } from "./modules/converter/converter.module";

export class AppModule {
  private modules = [new UserModule()];

  constructor() {}

  configure(app: Application) {
    for (let module of this.modules) {
      module.configure(app);
    }
  }
}
