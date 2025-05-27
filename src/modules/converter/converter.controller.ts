import { Request, Response } from "express";
import { ZenController, RestMethod, UseMiddleware, Get, Post, ErrorHandler } from "x-zen";
import { ConverterService } from "./converter.service";
import { authMiddleware } from "./middlewares/authMiddleware";

@ZenController("converter")
export class ConverterController {
  
  constructor(
    private converterService: ConverterService
  ) { }
  
  @Get("info")
  @UseMiddleware(authMiddleware)
  @RestMethod({ statusCode: 200, message: "File Info" })
  private async getInfo(req: Request, res: Response) {
    const { url } = req.query;
    return await this.converterService.getInfo(url as string);
  }

  @Post("download")
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
