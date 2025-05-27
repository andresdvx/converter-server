import { Request, Response } from "express";
import { RestController, RestMethod, UseMiddleware, Get, Post, ErrorHandler, Logger } from "x-zen";
import { ConverterService } from "./converter.service";
import { authMiddleware } from "./middlewares/authMiddleware";

@UseMiddleware(authMiddleware)
@RestController("converter")
export class ConverterController {
  private logger = new Logger({ context: ConverterController.name, timestamp: true });
  
  constructor(private converterService: ConverterService) { }
  
  @Get("info")
  @RestMethod({ statusCode: 200, message: "File Info" })
  private async getInfo(req: Request, res: Response) {
    this.logger.log("Fetching file info");
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
      this.logger.error("Error downloading file" + err);
      ErrorHandler(err, res);
    }
  }
}
