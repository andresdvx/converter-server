import { Request, Response } from "express";
import { ConverterService } from "./converter.service";
import { RestController, RestMethod, Get, ErrorHandler, Post } from "x-zen";

@RestController("converter")
export class ConverterController {
  constructor(private converterService: ConverterService) { }

  @Get("info")
  @RestMethod({ statusCode: 200, message: "File Info" })
  private async getInfo(req: Request, res: Response) {
    const { url } = req.query;
    return await this.converterService.getInfo(url as string);
  }

  @Post("download")
  public async download(req: Request, res: Response) {
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
