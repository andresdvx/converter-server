import { spawn } from "child_process";
import path from "path";
import os from "os";
import ffmpeg from "fluent-ffmpeg";

const isWindows = os.platform() === "win32";
const ytDlpCmd = isWindows
  ? path.join(__dirname, "..", "yt-dlp.exe")
  : "yt-dlp";

export function getVideoInfo(url: string): Promise<{ title: string; thumbnail: string }> {
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
        });
      } catch (err) {
        reject(err);
      }
    });
  });
}

export function streamDownloadAsMp3(url: string) {
  const ytProcess = spawn(ytDlpCmd, [
    url,
    "--no-playlist",
    "-f", "bestaudio",
    "-o", "-", // output to stdout
  ]);

  return ffmpeg(ytProcess.stdout)
    .format("mp3")
    .audioBitrate(128)
    .on("error", (err: any) => {
      console.error("FFmpeg error:", err);
    });
}

export function streamDownloadAsMp4(url: string) {
  return spawn(ytDlpCmd, [
    url,
    "--no-playlist",
    "-f", "bestvideo+bestaudio",
    "-o", "-",
  ]);
}
