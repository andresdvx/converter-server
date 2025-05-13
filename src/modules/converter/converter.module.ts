import { Application } from "express";
import { ConverterController } from "./converter.controller";
import { ConverterService } from "./converter.service";

export class UserModule {
  private converterController: ConverterController;
  private converterService: ConverterService;

  constructor() {
    this.converterService = new ConverterService();
    this.converterController = new ConverterController(this.converterService);
  }

  configure(app: Application) {
    this.converterController.Router(app);
  }
}
