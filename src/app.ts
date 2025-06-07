import express from "express";
import { Logger, ZenApplication } from "x-zen";
import { ConverterModule } from "./modules/converter/converter.module";

async function Bootstrap() {
  const app = express();
  const logger = new Logger({
    context: "BootStrap Application",
    timestamp: true,
  });
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const zenApp = new ZenApplication(app, ConverterModule);
  await zenApp.start();
  zenApp.showAppGraph();

  app.listen(4000, () => logger.log("🚀 server running on port 4000"));
}

Bootstrap();
