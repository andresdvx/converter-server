import { Request, Response } from "express";
import { ZenController, UseMiddleware, Get, Post, ErrorHandler } from "x-zen";
import { ConverterService } from "./converter.service";
import { LoggerMiddleware } from "../../shared/middlewares/Logge.middleware";

@ZenController("converter")
export class ConverterController {
  
  constructor(
    private converterService: ConverterService,
  ) { }
  
  @Get({path: "info", statusCode: 200, message: "Get video info"})
  @UseMiddleware(LoggerMiddleware)
  private async getInfo(req: Request, res: Response) {
    const { url } = req.query;
    return await this.converterService.getInfo(url as string);
  }

  @Post({path: "download", statusCode: 200, message: "Download video or audio"})
  public async downloadFile(req: Request, res: Response) {
    try {
      const { url, type } = req.query;
      const { formatId } = req.body;
      return await this.converterService.download(
        url as string,
        type as "audio" | "video",
        formatId as string,
        res
      );
    } catch (err: any) {
      ErrorHandler(err, res);
    }
  }
}
