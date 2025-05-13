import { BadRequestError, InternalServerError } from "x-zen";
import { getVideoInfo, streamDownloadAsMp3, streamDownloadAsMp4 } from "../../common/utils/ytdlt.util";

export class ConverterService {
  constructor() { }

  async getInfo(url: string) {
    if (!url) throw new BadRequestError("url not provided");

    try {
      const info = await getVideoInfo(url);
      return info;
    } catch (err) {
      throw new InternalServerError(`Error fetching video info ${err}`);
    }
  }

  async download(url: string, type: 'audio' | 'video', res: any) {

    if (!url || typeof url !== "string" || !["audio", "video"].includes(type as string)) {
      throw new BadRequestError("Invalid parameters");
    }

    try {
      const { title } = await getVideoInfo(url);
      const safeTitle = title.replace(/[^\w\s]/gi, "");
      const fileExt = type === "audio" ? "mp3" : "mp4";

      res.setHeader("Content-Disposition", `attachment; filename="${safeTitle}.${fileExt}"`);
      res.setHeader("Content-Type", type === "audio" ? "audio/mpeg" : "video/mp4");

      if (type === "audio") {
        const mp3Stream = streamDownloadAsMp3(url);
        return mp3Stream.pipe(res);
      } else {
        const videoStream = streamDownloadAsMp4(url);

        videoStream.stderr.on("data", (data) => {
          console.error("yt-dlp stderr:", data.toString());
        });

        videoStream.on("error", (err) => {
          console.error("yt-dlp process error:", err);
          throw new InternalServerError("Error executing yt-dlp" + err);
        });
        return videoStream.stdout.pipe(res);
      }

    } catch (err) {
      throw new InternalServerError(`Error downloading video ${err}`);
    }
  }
}
