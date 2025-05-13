import { Application, Request, Response } from "express";
import { ConverterService } from "./converter.service";
import { ResMethod } from "x-zen";
import { IController } from "../../core/interfaces/controller.interface";


export class ConverterController implements IController {
  constructor(private converterService: ConverterService) { }

  Router(app: Application) {
    app.get("/info", this.getInfo.bind(this));
    app.get("/download", this.download.bind(this));
  }

  @ResMethod({ statusCode: 200, message: "ok" })
  private async getInfo(req: Request, res: Response) {
    const { url } = req.query;
    return await this.converterService.getInfo(url as string);
  }

  public async download(req: Request, res: Response) {
    try {
      const { url, type } = req.query;
      return await this.converterService.download(url as string, type as 'audio' | 'video', res);
    } catch (err: any) {
      res.status(500).json({
        statusCode: 500,
        errorMessage: "Internal Server Error",
        error: err.message,
      });
    }
  }

}
