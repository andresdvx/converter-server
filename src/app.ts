import express from "express";
import { Logger, StartZenApplication } from "x-zen";
import { ConverterModule } from "./modules/converter/converter.module";

async function Bootstrap() {
  const app = express();
  const logger = new Logger({
    context: "BootStrap Application",
    timestamp: true,
  });
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  await StartZenApplication(app, ConverterModule);

  app.listen(4000, () => logger.log("🚀 server running on port 4000"));
}

Bootstrap();
