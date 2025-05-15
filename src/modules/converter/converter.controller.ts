import { Request, Response } from "express";
import { ConverterService } from "./converter.service";
import { RestController, RestMethod, Get } from "x-zen";

@RestController("/converter")
export class ConverterController {
  constructor(private converterService: ConverterService) {}

  @Get("/info")
  @RestMethod({ statusCode: 200, message: "ok" })
  private async getInfo(req: Request, res: Response) {
    const { url } = req.query;
    return await this.converterService.getInfo(url as string);
  }

  @Get("/download")
  public async download(req: Request, res: Response) {
    try {
      const { url, type } = req.query;
      return await this.converterService.download(
        url as string,
        type as "audio" | "video",
        res
      );
    } catch (err: any) {
      res.status(500).json({
        statusCode: 500,
        errorMessage: "Internal Server Error",
        error: err.message,
      });
    }
  }
}
