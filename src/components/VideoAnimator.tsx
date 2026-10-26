import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  Sparkles,
  Play,
  Pause,
  Download,
  RotateCcw,
  Check,
  AlertCircle,
  Copy,
  Sliders,
  Tv,
  Smartphone,
  Info,
  Maximize2,
  Trash2,
  Clock,
  Video as VideoIcon,
  Layers,
  ArrowRight,
  Film
} from 'lucide-react';
import { STORYBOARD_SECTIONS, StoryboardSection } from '../data/storyboardData';

interface VideoGenerationResult {
  id: string;
  videoUrl: string;
  originalImage?: string;
  prompt: string;
  aspectRatio: '16:9' | '9:16';
  duration: string;
  resolution: string;
  timestamp: string;
  sectionTitle?: string;
  isSimulated?: boolean;
}

interface VideoAnimatorProps {
  initialSection?: StoryboardSection;
}

export const VideoAnimator: React.FC<VideoAnimatorProps> = ({ initialSection }) => {
  const [selectedSection, setSelectedSection] = useState<StoryboardSection>(
    initialSection || STORYBOARD_SECTIONS[0]
  );
  const [activeMode, setActiveMode] = useState<'image-to-video' | 'text-to-video'>('image-to-video');

  // Input states
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    initialSection?.sampleImage || STORYBOARD_SECTIONS[0].sampleImage
  );
  const [imageMimeType, setImageMimeType] = useState<string>('image/jpeg');
  const [promptText, setPromptText] = useState<string>(
    initialSection?.aiPromptEnglish || STORYBOARD_SECTIONS[0].aiPromptEnglish
  );
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [duration, setDuration] = useState<'5s' | '10s'>('5s');
  const [resolution, setResolution] = useState<'720p' | '1080p'>('720p');

  // Execution states
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [apiPaidError, setApiPaidError] = useState<boolean>(false);

  // Result & history
  const [currentResult, setCurrentResult] = useState<VideoGenerationResult | null>(null);
  const [history, setHistory] = useState<VideoGenerationResult[]>([]);
  const [copied, setCopied] = useState(false);

  // Player controls
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLooping, setIsLooping] = useState(true);
  const [showSideBySide, setShowSideBySide] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sync if initialSection changes from outside
  useEffect(() => {
    if (initialSection) {
      setSelectedSection(initialSection);
      setPromptText(initialSection.aiPromptEnglish);
      if (!uploadedImage || uploadedImage.startsWith('http')) {
        setUploadedImage(initialSection.sampleImage);
      }
    }
  }, [initialSection]);

  // Handle image upload from file system
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('이미지 파일(PNG, JPG, WEBP)만 업로드할 수 있습니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setUploadedImage(reader.result);
        setImageMimeType(file.type || 'image/jpeg');
        setErrorMessage(null);
      }
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop handlers
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setUploadedImage(reader.result);
          setImageMimeType(file.type || 'image/jpeg');
          setErrorMessage(null);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick preset section selector
  const handleSelectPresetSection = (sec: StoryboardSection) => {
    setSelectedSection(sec);
    setPromptText(sec.aiPromptEnglish);
    setUploadedImage(sec.sampleImage);
    setErrorMessage(null);
  };

  // Motion tag helpers
  const appendMotionTag = (tag: string) => {
    setPromptText((prev) => {
      const clean = prev.trim();
      return clean.endsWith('.') ? `${clean} ${tag}` : `${clean}, ${tag}`;
    });
  };

  // Convert image URL to base64 if needed
  const getBase64Image = async (url: string): Promise<string> => {
    if (url.startsWith('data:')) {
      return url;
    }
    // Fetch and convert image URL
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });
    } catch {
      return url;
    }
  };

  // Fallback simulator: creates a high-quality animated MP4 or Canvas video in case user doesn't have an active paid key yet
  const generateSimulatedVideo = async (): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = aspectRatio === '16:9' ? 1280 : 720;
      canvas.height = aspectRatio === '16:9' ? 720 : 1280;
      const ctx = canvas.getContext('2d');

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = uploadedImage || selectedSection.sampleImage;

      img.onload = () => {
        const stream = canvas.captureStream(30);
        let recorder: MediaRecorder;
        try {
          recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        } catch {
          recorder = new MediaRecorder(stream);
        }

        const chunks: Blob[] = [];
        recorder.ondataavailable = (e) => chunks.push(e.data);
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'video/webm' });
          resolve(URL.createObjectURL(blob));
        };

        recorder.start();
        const totalFrames = 150; // 5 seconds at 30fps
        let currentFrame = 0;

        const animate = () => {
          if (!ctx) return;
          const progress = currentFrame / totalFrames;
          // Smooth zoom and pan camera effect
          const scale = 1.0 + progress * 0.12;
          const panX = Math.sin(progress * Math.PI) * 20;
          const panY = Math.cos(progress * Math.PI) * 15;

          ctx.fillStyle = '#0f172a';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.save();
          ctx.translate(canvas.width / 2 + panX, canvas.height / 2 + panY);
          ctx.scale(scale, scale);

          // Draw image centered
          const aspectImg = img.width / img.height;
          const aspectCanvas = canvas.width / canvas.height;
          let drawW = canvas.width;
          let drawH = canvas.height;
          if (aspectImg > aspectCanvas) {
            drawH = canvas.height;
            drawW = canvas.height * aspectImg;
          } else {
            drawW = canvas.width;
            drawH = canvas.width / aspectImg;
          }

          ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);

          // Warm lighting overlay
          const gradient = ctx.createLinearGradient(-drawW / 2, -drawH / 2, drawW / 2, drawH / 2);
          gradient.addColorStop(0, 'rgba(251, 191, 36, 0.12)');
          gradient.addColorStop(0.5, 'rgba(249, 115, 22, 0.05)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
          ctx.fillStyle = gradient;
          ctx.fillRect(-drawW / 2, -drawH / 2, drawW, drawH);

          ctx.restore();

          // Title watermark in video
          ctx.fillStyle = 'rgba(0,0,0,0.6)';
          ctx.fillRect(20, canvas.height - 70, 420, 50);
          ctx.fillStyle = '#f59e0b';
          ctx.font = 'bold 16px sans-serif';
          ctx.fillText(`자립준비청년 안내 [${selectedSection.id}구간: ${selectedSection.title}]`, 35, canvas.height - 44);
          ctx.fillStyle = '#cbd5e1';
          ctx.font = '12px sans-serif';
          ctx.fillText(`Gemini Omni Flash 1.1 • ${aspectRatio} • 5s`, 35, canvas.height - 25);

          currentFrame++;
          if (currentFrame <= totalFrames) {
            requestAnimationFrame(animate);
          } else {
            recorder.stop();
          }
        };

        animate();
      };

      img.onerror = () => {
        // Fallback simple video
        resolve('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
      };
    });
  };

  // Main execution function
  const handleGenerateVideo = async (forceSimulate = false) => {
    if (!promptText.trim()) {
      setErrorMessage('영상 생성 프롬프트를 입력해주세요.');
      return;
    }

    if (activeMode === 'image-to-video' && !uploadedImage) {
      setErrorMessage('애니메이션을 적용할 사진을 업로드하거나 프리셋을 선택해주세요.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setApiPaidError(false);
    setProgressPercent(10);
    setLoadingStep('이미지 프레임 준비 및 파라미터 유효성 검사 중...');

    // Progress tick simulation
    const timer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 90) return prev;
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 700);

    try {
      if (forceSimulate) {
        setLoadingStep('시뮬레이션 모션 렌더링 중 (Gemini Omni 카메라 워크 시뮬레이션)...');
        const simulatedUrl = await generateSimulatedVideo();
        clearInterval(timer);
        setProgressPercent(100);
        setLoadingStep('영상 렌더링 완료!');

        const newResult: VideoGenerationResult = {
          id: `sim-${Date.now()}`,
          videoUrl: simulatedUrl,
          originalImage: uploadedImage || undefined,
          prompt: promptText,
          aspectRatio,
          duration,
          resolution,
          timestamp: new Date().toLocaleTimeString('ko-KR'),
          sectionTitle: `${selectedSection.id}구간 - ${selectedSection.title}`,
          isSimulated: true,
        };

        setCurrentResult(newResult);
        setHistory((prev) => [newResult, ...prev]);
        setIsLoading(false);
        return;
      }

      setLoadingStep('이미지 base64 변환 및 페이로드 빌드 중...');
      let base64Payload: string | null = null;
      if (activeMode === 'image-to-video' && uploadedImage) {
        base64Payload = await getBase64Image(uploadedImage);
      }

      setLoadingStep('Gemini Omni Flash (gemini-omni-1.1-flash) Interactions API 호출 중...');

      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Payload,
          mimeType: imageMimeType,
          prompt: promptText,
          aspectRatio,
          duration,
          resolution,
          mode: activeMode,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        if (data.error === 'PAID_TIER_REQUIRED' || data.error === 'MISSING_API_KEY') {
          setApiPaidError(true);
        }
        throw new Error(data.message || data.error || '영상 생성에 실패했습니다.');
      }

      clearInterval(timer);
      setProgressPercent(100);
      setLoadingStep('영상 생성 완료!');

      const finalVideoUrl = data.video || data.videoUri;

      const newResult: VideoGenerationResult = {
        id: `gen-${Date.now()}`,
        videoUrl: finalVideoUrl,
        originalImage: uploadedImage || undefined,
        prompt: promptText,
        aspectRatio,
        duration,
        resolution,
        timestamp: new Date().toLocaleTimeString('ko-KR'),
        sectionTitle: `${selectedSection.id}구간 - ${selectedSection.title}`,
        isSimulated: false,
      };

      setCurrentResult(newResult);
      setHistory((prev) => [newResult, ...prev]);
    } catch (err: any) {
      console.warn('Video generation error, displaying guidance:', err);
      clearInterval(timer);
      setErrorMessage(err.message || '영상 생성 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyPrompt = () => {
    navigator.clipboard.writeText(promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Title & Feature Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-amber-500/30 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>AI Video Engine • gemini-omni-1.1-flash</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              사진 업로드 & AI 영상 애니메이션 스튜디오
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              자립준비청년 지원 9개 구간의 상담사 연출 샷이나 소장 사진을 업로드하고,{' '}
              <strong className="text-amber-300">16:9 가로형</strong>(유튜브/안내영상) 또는{' '}
              <strong className="text-amber-300">9:16 세로형</strong>(쇼츠/릴스) 시네마틱 비디오로 변환합니다.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-slate-900/80 border border-slate-700/80 rounded-xl p-2 px-3 text-xs">
            <Tv className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300">16:9 가로형</span>
            <span className="text-slate-600">|</span>
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span className="text-slate-300">9:16 세로형 지원</span>
          </div>
        </div>
      </div>

      {/* Main Studio Grid: Left Config Panel & Right Preview/Player */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Photo & Generation Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Step 1: Mode & Preset Selector */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px]">1</span>
                <span>모드 & 스토리보드 구간 선택</span>
              </span>
              <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveMode('image-to-video')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    activeMode === 'image-to-video'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  사진 애니메이션 (Image-to-Video)
                </button>
                <button
                  onClick={() => setActiveMode('text-to-video')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                    activeMode === 'text-to-video'
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  텍스트 전용 (Text-to-Video)
                </button>
              </div>
            </div>

            {/* Quick Section Preset Chips */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">
                9개 구간 연출 프리셋 즉시 적용:
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto pr-1">
                {STORYBOARD_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => handleSelectPresetSection(sec)}
                    className={`px-2.5 py-1 rounded-lg text-xs transition border flex items-center space-x-1 ${
                      selectedSection.id === sec.id
                        ? 'bg-amber-500/20 border-amber-500/60 text-amber-300 font-semibold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span>{sec.id}구간</span>
                    <span className="opacity-80">({sec.title})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Photo Upload Area (for Image-to-Video mode) */}
          {activeMode === 'image-to-video' && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px]">2</span>
                  <span>시작 프레임 사진 업로드 (Photo Upload)</span>
                </span>
                {uploadedImage && (
                  <button
                    onClick={() => setUploadedImage(null)}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center space-x-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>초기화</span>
                  </button>
                )}
              </div>

              {/* Upload Drop Zone or Image Preview */}
              {uploadedImage ? (
                <div className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-950 aspect-video max-h-64 flex items-center justify-center">
                  <img
                    src={uploadedImage}
                    alt="Upload Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs shadow-lg hover:bg-amber-400 transition"
                    >
                      다른 사진으로 변경
                    </button>
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 font-medium text-xs hover:bg-slate-700 transition"
                    >
                      제거
                    </button>
                  </div>
                  <div className="absolute bottom-2 left-2 px-2 py-1 rounded bg-black/70 text-[11px] font-mono text-slate-300">
                    현재 선택된 시작 프레임
                  </div>
                </div>
              ) : (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-700 hover:border-amber-500/60 rounded-xl p-8 text-center cursor-pointer transition bg-slate-950/40 hover:bg-slate-950/80 flex flex-col items-center justify-center group"
                >
                  <div className="w-12 h-12 rounded-full bg-slate-800 group-hover:bg-amber-500/20 text-slate-400 group-hover:text-amber-400 flex items-center justify-center mb-3 transition">
                    <Upload className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-semibold text-slate-200 group-hover:text-amber-300 transition">
                    사진을 여기로 드래그하거나 클릭하여 파일 선택
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    상담사 프로필, 센터 사무실, 안내 책자 등 PNG, JPG, WEBP 업로드 (최대 50MB)
                  </p>
                </div>
              )}

              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {/* Sample Photo Preset Bar */}
              <div>
                <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                  또는 권장 상담사 시네마틱 레퍼런스 선택:
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {STORYBOARD_SECTIONS.slice(0, 6).map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => {
                        setUploadedImage(sec.sampleImage);
                        setSelectedSection(sec);
                      }}
                      className={`relative rounded-lg overflow-hidden border aspect-video group transition ${
                        uploadedImage === sec.sampleImage
                          ? 'border-amber-500 ring-2 ring-amber-500/30'
                          : 'border-slate-800 hover:border-slate-600'
                      }`}
                    >
                      <img
                        src={sec.sampleImage}
                        alt={sec.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1">
                        <span className="text-[9px] font-bold text-white truncate">
                          {sec.id}구간
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Aspect Ratio & Video Specs */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px]">3</span>
              <span>비디오 규격 및 화면 비율 설정 (Aspect Ratio)</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Aspect Ratio 16:9 vs 9:16 */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-300">
                  화면 종횡비 (Aspect Ratio):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAspectRatio('16:9')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition ${
                      aspectRatio === '16:9'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-10 h-6 border-2 border-current rounded flex items-center justify-center text-[9px] font-bold">
                      16:9
                    </div>
                    <span className="text-xs font-bold">16:9 가로형</span>
                    <span className="text-[10px] text-slate-400">유튜브 / 안내 영상</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAspectRatio('9:16')}
                    className={`p-3 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition ${
                      aspectRatio === '9:16'
                        ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-md shadow-amber-500/10'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-6 h-10 border-2 border-current rounded flex items-center justify-center text-[9px] font-bold">
                      9:16
                    </div>
                    <span className="text-xs font-bold">9:16 세로형</span>
                    <span className="text-[10px] text-slate-400">쇼츠 / 릴스 / 틱톡</span>
                  </button>
                </div>
              </div>

              {/* Duration & Resolution */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    영상 길이 (Duration):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['5s', '10s'] as const).map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDuration(d)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                          duration === d
                            ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {d} {d === '5s' ? '(기본 권장)' : '(확장 테이크)'}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    해상도 (Resolution):
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['720p', '1080p'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setResolution(r)}
                        className={`py-2 px-3 rounded-xl border text-xs font-semibold transition ${
                          resolution === r
                            ? 'bg-amber-500/15 border-amber-500 text-amber-300'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {r} {r === '720p' ? '(쾌속 렌더링)' : '(고화질 FHD)'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4: Motion & Lighting AI Prompt */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[11px]">4</span>
                <span>AI 영상 생성 프롬프트 (Motion & Camera Directing)</span>
              </span>
              <button
                type="button"
                onClick={copyPrompt}
                className="text-xs text-slate-400 hover:text-amber-300 flex items-center space-x-1 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? '복사됨' : '프롬프트 복사'}</span>
              </button>
            </div>

            <div>
              <textarea
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                rows={4}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-500 font-mono resize-none leading-relaxed"
                placeholder="Cinematic camera motion, lighting, and subject movement prompt..."
              />
            </div>

            {/* Quick Motion Tags */}
            <div>
              <label className="block text-[11px] font-medium text-slate-400 mb-1.5">
                카메라 워크 및 톤앤매너 빠른 추가:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Slow steadicam push-in toward camera',
                  'Warm golden hour window lighting',
                  'Gentle camera pan showing office interior',
                  'Shallow depth of field with 4k realism',
                  'Empathetic and welcoming facial expression',
                  'Smooth high-framerate commercial look',
                ].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => appendMotionTag(tag)}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] border border-slate-700 transition"
                  >
                    + {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Error Message & Paid Key Warning */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs space-y-2">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">생성 안내: </span>
                    <span>{errorMessage}</span>
                  </div>
                </div>

                {apiPaidError && (
                  <div className="pt-2 border-t border-rose-500/20 text-slate-300 text-xs space-y-2">
                    <p>
                      💡 <strong className="text-amber-300">gemini-omni-1.1-flash</strong> 모델은 Google Cloud 결제가 연결된 유효한 Gemini API 키가 필요합니다.
                    </p>
                    <p className="text-slate-400">
                      지금 바로 전체 UI 애니메이션 흐름과 화면 배율(16:9/9:16)을 체험해보시려면 아래의 <strong>[시뮬레이션 미리보기 렌더링]</strong> 버튼을 클릭하여 즉시 비디오를 제작할 수 있습니다.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleGenerateVideo(true)}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 font-bold text-xs hover:bg-amber-400 transition flex items-center space-x-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>시뮬레이션 미리보기 렌더링 실행</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleGenerateVideo(false)}
                className={`w-full sm:flex-1 py-3 px-5 rounded-xl font-bold text-sm flex items-center justify-center space-x-2 transition shadow-xl ${
                  isLoading
                    ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 hover:from-amber-400 hover:via-orange-400 hover:to-rose-400 text-slate-950 shadow-amber-500/25'
                }`}
              >
                <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                <span>
                  {isLoading
                    ? 'AI 영상 생성 처리 중...'
                    : `Gemini Omni Flash 1.1 영상 생성 (${aspectRatio} • ${duration})`}
                </span>
              </button>

              <button
                type="button"
                disabled={isLoading}
                onClick={() => handleGenerateVideo(true)}
                className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition"
                title="API 키 없이 카메라 워크 시뮬레이션 미리보기 생성"
              >
                <span>시뮬레이션 미리보기</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Video Player & Output Display (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                <VideoIcon className="w-4 h-4" />
                <span>생성 비디오 플레이어 ({aspectRatio})</span>
              </span>
              {currentResult && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setShowSideBySide(!showSideBySide)}
                    className={`px-2 py-1 rounded text-[11px] font-semibold border transition ${
                      showSideBySide
                        ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                        : 'bg-slate-800 border-slate-700 text-slate-400'
                    }`}
                  >
                    원본 사진 비교
                  </button>
                </div>
              )}
            </div>

            {/* Loading Progress Display */}
            {isLoading && (
              <div className="rounded-xl border border-amber-500/30 bg-slate-950 p-6 flex flex-col items-center justify-center space-y-4 text-center min-h-[300px]">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center animate-pulse">
                    <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-orange-500 text-[10px] font-bold text-white flex items-center justify-center">
                    AI
                  </div>
                </div>

                <div className="space-y-1 w-full max-w-xs">
                  <div className="flex justify-between text-xs font-semibold text-slate-300">
                    <span>비디오 합성 진행률</span>
                    <span className="font-mono text-amber-400">{progressPercent}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                <p className="text-xs text-amber-300 font-medium animate-pulse">
                  {loadingStep}
                </p>
                <p className="text-[11px] text-slate-400">
                  gemini-omni-1.1-flash 모델로 시네마틱 프레임 보간 및 렌더링 중입니다.
                </p>
              </div>
            )}

            {/* Generated Video Player */}
            {!isLoading && currentResult && (
              <div className="space-y-4">
                {showSideBySide && currentResult.originalImage && (
                  <div className="grid grid-cols-2 gap-2 text-center text-[11px] font-semibold text-slate-400">
                    <div className="bg-slate-950 rounded-lg p-1 border border-slate-800">
                      시작 사진 (Original Frame)
                    </div>
                    <div className="bg-slate-950 rounded-lg p-1 border border-amber-500/40 text-amber-400">
                      생성 비디오 (Omni Flash)
                    </div>
                  </div>
                )}

                <div
                  className={`relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center ${
                    currentResult.aspectRatio === '9:16'
                      ? 'aspect-[9/16] max-w-[280px] mx-auto'
                      : 'aspect-video w-full'
                  }`}
                >
                  <video
                    ref={videoRef}
                    src={currentResult.videoUrl}
                    autoPlay
                    loop={isLooping}
                    playsInline
                    className="w-full h-full object-cover"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />

                  {/* Video Overlay Badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-amber-300 border border-amber-500/30">
                    {currentResult.aspectRatio} • {currentResult.duration} • {currentResult.resolution}
                  </div>

                  {currentResult.isSimulated && (
                    <div className="absolute top-3 right-3 px-2 py-1 rounded bg-amber-500/90 text-slate-950 text-[10px] font-bold">
                      시뮬레이션 미리보기
                    </div>
                  )}

                  {/* Bottom Controls Bar */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-3 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={togglePlay}
                        className="p-1.5 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition"
                      >
                        {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      </button>
                      <button
                        onClick={() => setIsLooping(!isLooping)}
                        className={`p-1.5 rounded-lg border text-[11px] font-semibold transition ${
                          isLooping
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                            : 'bg-black/50 border-slate-700 text-slate-400'
                        }`}
                        title="반복 재생 토글"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <a
                      href={currentResult.videoUrl}
                      download={`jaripon-omni-${currentResult.aspectRatio.replace(':', 'x')}-${Date.now()}.mp4`}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>비디오 저장 (.mp4)</span>
                    </a>
                  </div>
                </div>

                {/* Info block */}
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5 text-slate-300">
                  <div className="flex justify-between font-mono text-[11px] text-slate-400">
                    <span>구간: {currentResult.sectionTitle || '사용자 지정'}</span>
                    <span>{currentResult.timestamp}</span>
                  </div>
                  <p className="text-slate-400 line-clamp-2 italic">
                    "{currentResult.prompt}"
                  </p>
                </div>
              </div>
            )}

            {/* Empty State when no video yet */}
            {!isLoading && !currentResult && (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-8 text-center flex flex-col items-center justify-center min-h-[320px]">
                <div className="w-14 h-14 rounded-2xl bg-slate-800 text-slate-500 flex items-center justify-center mb-3">
                  <Tv className="w-7 h-7" />
                </div>
                <h4 className="text-sm font-bold text-slate-200">생성된 비디오 대기 중</h4>
                <p className="text-xs text-slate-400 mt-1 max-w-xs">
                  좌측에서 사진을 업로드하고 <strong>[Gemini Omni Flash 1.1 영상 생성]</strong> 또는 <strong>[시뮬레이션 미리보기]</strong>를 누르면 이곳에서 바로 재생됩니다.
                </p>
              </div>
            )}
          </div>

          {/* History Gallery */}
          {history.length > 0 && (
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                <span>최근 생성 비디오 ({history.length})</span>
                <span className="text-[11px] text-slate-500 font-mono">클릭하여 다시 보기</span>
              </span>

              <div className="grid grid-cols-2 gap-2">
                {history.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentResult(item)}
                    className={`p-2 rounded-xl border text-left transition flex items-center space-x-2.5 ${
                      currentResult?.id === item.id
                        ? 'border-amber-500 bg-amber-500/10'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-slate-800 overflow-hidden shrink-0 relative">
                      {item.originalImage ? (
                        <img
                          src={item.originalImage}
                          alt="Thumb"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                          <Film className="w-4 h-4" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 text-white fill-current" />
                      </div>
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xs font-bold text-slate-200 truncate">
                        {item.sectionTitle || '생성 영상'}
                      </div>
                      <div className="text-[10px] text-amber-400 font-mono">
                        {item.aspectRatio} • {item.duration}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
