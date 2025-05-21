import express from "express";
import { AppModule } from "./app.module";
import { Logger } from "x-zen";

function Bootstrap() {
  const app = express();
  const logger = Logger.getInstance({context: "BootStrap Application", timestamp: true});
  app.use(express.json());
  app.use(express.urlencoded({extended: false}))

  const appModule = new AppModule();
  appModule.configure(app);

  app.listen(4000, () => logger.log("🚀 server running on port 4000"));
}

Bootstrap();
