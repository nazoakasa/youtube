import express from "express";
import cors from "cors";
import { exec } from "child_process";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/video", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("url required");

  try {
    // yt-dlpで動画の直リンクを取得
    exec(`yt-dlp -f best -g ${url}`, (err, stdout, stderr) => {
      if (err) return res.status(500).send(stderr);
      const videoUrl = stdout.trim();
      res.json({ videoUrl });
    });
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
