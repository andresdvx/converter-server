import { spawn } from "child_process";
import path from "path";
import os from "os";
import ffmpeg from "fluent-ffmpeg";

const isWindows = os.platform() === "win32";
const ytDlpCmd = isWindows
  ? path.join(__dirname, "..", "yt-dlp.exe")
  : "yt-dlp";

export interface VideoFormat {
  format_id: string;
  ext: string;
  format_note?: string;
  acodec: string;
  vcodec: string;
  filesize?: number;
  height?: number;
  width?: number;
  fps?: number;
  tbr?: number; 
}

export interface VideoInfo {
  title: string;
  thumbnail: string;
  formats: VideoFormat[];
}

export function getVideoInfo(url: string): Promise<VideoInfo> {
  return new Promise((resolve, reject) => {
    const process = spawn(ytDlpCmd, ["-j", url]);

    let data = "";
    process.stdout.on("data", chunk => (data += chunk.toString()));
    process.stderr.on("data", err => console.error("yt-dlp error:", err.toString()));
    process.on("close", () => {
      try {
        const json = JSON.parse(data);
        resolve({
          title: json.title,
          thumbnail: json.thumbnail,
          formats: json.formats
        });
      } catch (err) {
        reject(err);
      }
    });
  });
}

export const getDownloadOptions = (formats: VideoFormat[]) => {
  const videoOptions = formats
    .filter(f => f.vcodec !== "none" && f.acodec === "none" && f.ext === "mp4")
    .map(f => ({
      id: f.format_id,
      ext: f.ext,
      resolution: `${f.height}p`,
      sizeMB: f.filesize ? (f.filesize / 1024 / 1024).toFixed(1) : "N/A",
    }));

  const audioOptions = formats
    .filter(f => f.acodec !== "none" && f.vcodec === "none")
    .map(f => ({
      id: f.format_id,
      ext: f.ext,
      bitrate: f.tbr,
      sizeMB: f.filesize ? (f.filesize / 1024 / 1024).toFixed(1) : "N/A",
    }));

  return { videoOptions, audioOptions };
}


export function streamDownloadAsMp3(url: string) {
  const ytProcess = spawn(ytDlpCmd, [
    url,
    "--no-playlist",
    "-f", "bestaudio",
    "-o", "-",
  ]);

  return ffmpeg(ytProcess.stdout)
    .format("mp3")
    .audioBitrate(128)
    .on("error", (err: any) => {
      console.error("FFmpeg error:", err);
    });
}

export function streamDownloadAsMp4(url: string, formatId: string) {
  return spawn(ytDlpCmd, [
    url,
    "--no-playlist",
    "-f", formatId,
    "-o", "-",
  ]);
}
