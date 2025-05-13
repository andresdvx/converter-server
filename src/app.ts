import express from "express";
import { AppModule } from "./app.module";

function Bootstrap() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({extended: false}))

  const appModule = new AppModule();
  appModule.configure(app);

  app.listen(4000, () => console.log("server running on port 4000"));
}

Bootstrap();
