import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
  const app = express();

  // Support large base64 image uploads for video generation
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // API Config Status
  app.get('/api/config', (_req, res) => {
    const hasKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
    res.json({
      hasApiKey: hasKey,
      model: 'gemini-omni-1.1-flash',
      aspectRatios: ['16:9', '9:16'],
      durations: ['5s', '10s'],
      resolutions: ['720p', '1080p'],
    });
  });

  // Video Generation endpoint with gemini-omni-1.1-flash
  app.post('/api/generate-video', async (req, res) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
        return res.status(400).json({
          error: 'MISSING_API_KEY',
          message: 'GEMINI_API_KEY가 설정되지 않았습니다. AI Studio 환경 설정의 Secrets 패널에서 유효한 키를 설정해주세요.',
        });
      }

      const {
        image,         // base64 data string (optional if pure text-to-video, but required for image-to-video)
        mimeType = 'image/jpeg',
        prompt,        // Motion prompt or video prompt
        aspectRatio = '16:9',
        duration = '5s',
        resolution = '720p',
        mode = 'image-to-video', // 'image-to-video' | 'text-to-video'
      } = req.body;

      if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
        return res.status(400).json({ error: 'INVALID_PROMPT', message: '영상 생성 프롬프트가 필요합니다.' });
      }

      const validAspectRatios = ['16:9', '9:16'];
      const targetAspectRatio = validAspectRatios.includes(aspectRatio) ? aspectRatio : '16:9';

      const validDurations = ['5s', '10s'];
      const targetDuration = validDurations.includes(duration) ? duration : '5s';

      const validResolutions = ['720p', '1080p'];
      const targetResolution = validResolutions.includes(resolution) ? resolution : '720p';

      const ai = new GoogleGenAI({ apiKey });

      let inputPayload: any;

      if (mode === 'image-to-video' && image) {
        // Strip out data URL header if present
        let cleanBase64 = image;
        let detectedMime = mimeType;
        if (typeof image === 'string' && image.includes(';base64,')) {
          const parts = image.split(';base64,');
          cleanBase64 = parts[1];
          const match = parts[0].match(/data:(.*?)$/);
          if (match && match[1]) {
            detectedMime = match[1];
          }
        }

        inputPayload = [
          {
            type: 'image',
            mime_type: detectedMime,
            data: cleanBase64,
          },
          {
            type: 'text',
            text: prompt,
          },
        ];
      } else {
        inputPayload = prompt;
      }

      console.log(`[Video Generation] Requesting model: gemini-omni-1.1-flash, aspect_ratio: ${targetAspectRatio}, duration: ${targetDuration}, mode: ${mode}`);

      // Call Gemini Interactions API with gemini-omni-1.1-flash
      const interaction = await ai.interactions.create(
        {
          model: 'gemini-omni-1.1-flash',
          input: inputPayload,
          background: false,
          store: false,
          stream: false,
          response_format: {
            type: 'video',
            aspect_ratio: targetAspectRatio,
            duration: targetDuration,
            resolution: targetResolution,
          },
        },
        { timeout: 300000 } // 5 minutes timeout for video synthesis
      );

      // Extract generated video
      let videoBase64: string | null = null;
      let outputMimeType = 'video/mp4';
      let videoUri: string | null = null;

      const outputVideo = interaction.output_video;
      if (outputVideo) {
        if (outputVideo.data) {
          videoBase64 = outputVideo.data;
        }
        if (outputVideo.mime_type) {
          outputMimeType = outputVideo.mime_type;
        }
        if ((outputVideo as any).uri) {
          videoUri = (outputVideo as any).uri;
        }
      }

      // Check steps fallback
      if (!videoBase64 && !videoUri && Array.isArray(interaction.steps)) {
        for (const step of interaction.steps) {
          if (step.type === 'model_output' && Array.isArray(step.content)) {
            const v = (step.content as any[]).find((c: any) => c && c.type === 'video');
            if (v) {
              if (v.data) videoBase64 = v.data;
              if (v.mime_type) outputMimeType = v.mime_type;
              if (v.uri) videoUri = v.uri;
            }
          }
        }
      }

      if (!videoBase64 && !videoUri) {
        console.warn('[Video Generation] No video payload found in interaction response', interaction);
        return res.status(502).json({
          error: 'NO_VIDEO_DATA',
          message: '모델 응답에서 비디오 데이터를 추출하지 못했습니다.',
          rawStatus: interaction.status,
        });
      }

      return res.json({
        success: true,
        video: videoBase64 ? `data:${outputMimeType};base64,${videoBase64}` : null,
        videoUri: videoUri,
        mimeType: outputMimeType,
        aspectRatio: targetAspectRatio,
        duration: targetDuration,
        resolution: targetResolution,
        prompt: prompt,
      });
    } catch (err: any) {
      console.error('[Video Generation Error]:', err);
      const errMessage = err?.message || String(err);
      const isQuotaOrPaid =
        errMessage.includes('quota') ||
        errMessage.includes('billing') ||
        errMessage.includes('429') ||
        errMessage.includes('PERMISSION_DENIED') ||
        errMessage.includes('Resource has been exhausted');

      return res.status(500).json({
        error: isQuotaOrPaid ? 'PAID_TIER_REQUIRED' : 'GENERATION_FAILED',
        message: isQuotaOrPaid
          ? 'gemini-omni-1.1-flash 모델은 결제가 활성화된 프로젝트의 API 키가 필요하거나 현재 할당량이 초과되었습니다.'
          : `영상 생성 중 오류가 발생했습니다: ${errMessage}`,
        details: errMessage,
      });
    }
  });

  // Client SPA mounting
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
