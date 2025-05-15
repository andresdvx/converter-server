import { Application } from "express";
import { ConverterController } from "./converter.controller";
import { ConverterService } from "./converter.service";
import { registerControllers } from "x-zen";

export class UserModule {
  private converterController: ConverterController;
  private converterService: ConverterService;

  constructor() {
    this.converterService = new ConverterService();
    this.converterController = new ConverterController(this.converterService);
  }

  configure(app: Application) {
    registerControllers(app, [this.converterController]);
  }
}
