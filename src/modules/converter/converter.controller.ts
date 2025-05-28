import { Request, Response } from "express";
import { ZenController, RestMethod, UseMiddleware, Get, Post, ErrorHandler } from "x-zen";
import { ConverterService } from "./converter.service";
import { LoggerMiddleware } from "../../shared/middlewares/Logge.middleware";
import { UsersService } from "../users/users.service";

@ZenController("converter")
export class ConverterController {
  
  constructor(
    private converterService: ConverterService,
    private userService: UsersService
  ) { }
  
  @Get("info")
  @UseMiddleware(LoggerMiddleware)
  @RestMethod({ statusCode: 200, message: "File Info" })
  private async getInfo(req: Request, res: Response) {
    const { url } = req.query;
    const users = await this.userService.getUsers();
    console.log("Users:", users);
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
