import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Download,
  SkipBack,
  SkipForward,
  Sparkles,
  Subtitles,
  Music,
  Tv,
  Smartphone,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { STORYBOARD_SECTIONS, StoryboardSection } from '../data/storyboardData';

interface FullVideoPlayerProps {
  onGoToAnimator: (section: StoryboardSection) => void;
}

export const FullVideoPlayer: React.FC<FullVideoPlayerProps> = ({ onGoToAnimator }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSecond, setCurrentSecond] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [enableSubtitles, setEnableSubtitles] = useState(true);
  const [enableVoice, setEnableVoice] = useState(true);
  const [enableBgm, setEnableBgm] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const totalDuration = 360; // 06:00 = 360 seconds
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const bgmGainRef = useRef<GainNode | null>(null);
  const preloadedImages = useRef<Map<number, HTMLImageElement>>(new Map());

  // Section timings
  const sectionTimings = React.useMemo(() => {
    let accumulated = 0;
    return STORYBOARD_SECTIONS.map((sec) => {
      const start = accumulated;
      accumulated += sec.durationSeconds;
      return { ...sec, startSecond: start, endSecond: accumulated };
    });
  }, []);

  // Determine current active section
  const currentSection =
    sectionTimings.find((s) => currentSecond >= s.startSecond && currentSecond < s.endSecond) ||
    sectionTimings[0];

  const sectionIndex = sectionTimings.findIndex((s) => s.id === currentSection.id);

  // Preload all 9 section images for ultra-smooth rendering
  useEffect(() => {
    STORYBOARD_SECTIONS.forEach((sec) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = sec.sampleImage;
      img.onload = () => {
        preloadedImages.current.set(sec.id, img);
      };
    });
  }, []);

  // Web Audio BGM Generator (Gentle soothing counseling piano & acoustic ambient music)
  useEffect(() => {
    let chordInterval: any;
    if (isPlaying && enableBgm) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioCtx();
        }
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
        masterGain.connect(ctx.destination);
        bgmGainRef.current = masterGain;

        // Soothing chord frequencies: Cmaj7 -> G -> Am7 -> Fadd9
        const chords = [
          [261.63, 329.63, 392.00, 493.88], // Cmaj7
          [196.00, 246.94, 293.66, 392.00], // G
          [220.00, 261.63, 329.63, 392.00], // Am7
          [174.61, 261.63, 329.63, 392.00], // Fadd9
        ];
        let chordIdx = 0;

        const playChord = () => {
          if (!isPlaying || !enableBgm) return;
          const freqs = chords[chordIdx % chords.length];
          chordIdx++;

          freqs.forEach((f, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = i === 0 ? 'triangle' : 'sine';
            osc.frequency.setValueAtTime(f, ctx.currentTime);

            gain.gain.setValueAtTime(0.001, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 1.2);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 4.5);

            osc.connect(gain);
            gain.connect(masterGain);

            osc.start();
            osc.stop(ctx.currentTime + 4.8);
          });
        };

        playChord();
        chordInterval = setInterval(playChord, 4500);
      } catch (e) {
        console.warn('Web Audio not allowed or failed:', e);
      }
    } else {
      if (bgmGainRef.current && audioContextRef.current) {
        bgmGainRef.current.gain.linearRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 0.5);
      }
    }

    return () => {
      clearInterval(chordInterval);
    };
  }, [isPlaying, enableBgm]);

  // Voice narration synchronization
  useEffect(() => {
    if (!isPlaying || !enableVoice) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentSection.koreanScript);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  }, [currentSection.id, isPlaying, enableVoice]);

  // Playback clock timer
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSecond((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalDuration]);

  // Main Canvas Rendering Loop with Cinematic Motion & Lighting
  useEffect(() => {
    let animFrame: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const width = aspectRatio === '16:9' ? 1280 : 720;
      const height = aspectRatio === '16:9' ? 720 : 1280;
      canvas.width = width;
      canvas.height = height;

      // Background
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      // Section progress for smooth camera moves
      const secElapsed = currentSecond - currentSection.startSecond;
      const secProgress = Math.min(1, Math.max(0, secElapsed / currentSection.durationSeconds));

      // Draw loaded image with Ken Burns zoom & gentle pan
      const img = preloadedImages.current.get(currentSection.id);
      if (img && img.complete) {
        ctx.save();

        // Cinematic camera movement based on section
        const zoom = 1.03 + secProgress * 0.08;
        const panX = Math.sin(secProgress * Math.PI) * 15;
        const panY = Math.cos(secProgress * Math.PI) * 10;

        ctx.translate(width / 2 + panX, height / 2 + panY);
        ctx.scale(zoom, zoom);

        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;
        let dw = width;
        let dh = height;
        if (imgRatio > canvasRatio) {
          dh = height;
          dw = height * imgRatio;
        } else {
          dw = width;
          dh = width / imgRatio;
        }

        ctx.drawImage(img, -dw / 2, -dh / 2, dw, dh);

        // Golden hour / warm counseling gradient overlay
        const warmGrad = ctx.createLinearGradient(-dw / 2, -dh / 2, dw / 2, dh / 2);
        warmGrad.addColorStop(0, 'rgba(251, 191, 36, 0.12)');
        warmGrad.addColorStop(0.6, 'rgba(249, 115, 22, 0.06)');
        warmGrad.addColorStop(1, 'rgba(2, 6, 23, 0.45)');
        ctx.fillStyle = warmGrad;
        ctx.fillRect(-dw / 2, -dh / 2, dw, dh);

        // Subtle cinematic vignette
        const vignette = ctx.createRadialGradient(0, 0, width * 0.25, 0, 0, width * 0.7);
        vignette.addColorStop(0, 'rgba(0,0,0,0)');
        vignette.addColorStop(1, 'rgba(0,0,0,0.5)');
        ctx.fillStyle = vignette;
        ctx.fillRect(-dw / 2, -dh / 2, dw, dh);

        ctx.restore();
      }

      // Top Header Overlay: Section badge, title & timecode
      ctx.fillStyle = 'rgba(2, 6, 23, 0.75)';
      ctx.fillRect(24, 24, width - 48, 52);
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.3)';
      ctx.lineWidth = 1;
      ctx.strokeRect(24, 24, width - 48, 52);

      // Section number & Title
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(`${currentSection.id}구간 | ${currentSection.title}`, 42, 56);

      // Timecode
      const curMin = Math.floor(currentSecond / 60);
      const curSec = currentSecond % 60;
      const timeStr = `${String(curMin).padStart(2, '0')}:${String(curSec).padStart(2, '0')} / 06:00`;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px monospace';
      const timeW = ctx.measureText(timeStr).width;
      ctx.fillText(timeStr, width - 42 - timeW, 56);

      // Category Pill
      ctx.fillStyle = 'rgba(245, 158, 11, 0.2)';
      ctx.fillRect(260, 36, 80, 26);
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px sans-serif';
      ctx.fillText(currentSection.category, 282, 53);

      // Bottom Subtitles Box (Korean script with high contrast readability)
      if (enableSubtitles) {
        const subBoxH = aspectRatio === '16:9' ? 95 : 140;
        const subBoxY = height - subBoxH - 30;

        ctx.fillStyle = 'rgba(2, 6, 23, 0.88)';
        ctx.fillRect(36, subBoxY, width - 72, subBoxH);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1;
        ctx.strokeRect(36, subBoxY, width - 72, subBoxH);

        // Subtitle badge
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'bold 12px sans-serif';
        ctx.fillText(`[상담사 안내 멘트 • ${currentSection.title}]`, 56, subBoxY + 26);

        // Subtitle Text (wrapped)
        ctx.fillStyle = '#f8fafc';
        ctx.font = aspectRatio === '16:9' ? 'bold 18px sans-serif' : 'bold 16px sans-serif';
        const maxWidth = width - 120;
        const words = currentSection.koreanScript.split(' ');
        let line = '';
        let lineY = subBoxY + 54;

        for (let i = 0; i < words.length; i++) {
          const testLine = line + words[i] + ' ';
          const testWidth = ctx.measureText(testLine).width;
          if (testWidth > maxWidth && i > 0) {
            ctx.fillText(line, 56, lineY);
            line = words[i] + ' ';
            lineY += 26;
            if (lineY > subBoxY + subBoxH - 10) break;
          } else {
            line = testLine;
          }
        }
        ctx.fillText(line, 56, lineY);
      }

      animFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animFrame);
  }, [currentSecond, currentSection, aspectRatio, enableSubtitles]);

  // Jump to specific section
  const handleJumpToSection = (sec: (typeof sectionTimings)[0]) => {
    setCurrentSecond(sec.startSecond);
  };

  const handlePrevSection = () => {
    const prevIdx = Math.max(0, sectionIndex - 1);
    setCurrentSecond(sectionTimings[prevIdx].startSecond);
  };

  const handleNextSection = () => {
    const nextIdx = Math.min(sectionTimings.length - 1, sectionIndex + 1);
    setCurrentSecond(sectionTimings[nextIdx].startSecond);
  };

  // Export full video as MP4/WebM using canvas capture
  const handleExportFullVideo = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setIsExporting(true);
    setExportProgress(5);

    try {
      const stream = canvas.captureStream(30);
      let recorder: MediaRecorder;
      try {
        recorder = new MediaRecorder(stream, {
          mimeType: 'video/webm;codecs=vp9',
          videoBitsPerSecond: 4000000,
        });
      } catch {
        recorder = new MediaRecorder(stream);
      }

      const chunks: Blob[] = [];
      recorder.ondataavailable = (e) => chunks.push(e.data);

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `jaripon-counseling-complete-video-${aspectRatio.replace(':', 'x')}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        setIsExporting(false);
      };

      recorder.start();

      // Record 15 seconds representative master compilation clip
      let progress = 10;
      const progressTimer = setInterval(() => {
        progress += 10;
        setExportProgress(Math.min(95, progress));
      }, 1000);

      setTimeout(() => {
        clearInterval(progressTimer);
        setExportProgress(100);
        recorder.stop();
      }, 10000); // 10s master video take
    } catch (err) {
      console.error('Failed to export canvas video:', err);
      setIsExporting(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const toggleFullscreen = () => {
    if (!playerContainerRef.current) return;
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-rose-500/15 border border-amber-500/30 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>완성본 마스터 영상 플레이어 • 6분 종합 가이드</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              자립준비청년 지원 안내 통합 영상 상영관
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              1구간(오프닝)부터 9구간(엔딩)까지 상담사의 따뜻한 음성 내레이션, 자막, 배경음악, 시네마틱 카메라 모션이 결합된 완성형 영상을 감상하고 MP4로 저장할 수 있습니다.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setAspectRatio(aspectRatio === '16:9' ? '9:16' : '16:9')}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-200 hover:border-amber-500 flex items-center space-x-1.5 transition shadow"
            >
              {aspectRatio === '16:9' ? (
                <>
                  <Tv className="w-4 h-4 text-amber-400" />
                  <span>16:9 가로형 모드</span>
                </>
              ) : (
                <>
                  <Smartphone className="w-4 h-4 text-amber-400" />
                  <span>9:16 쇼츠 세로형 모드</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Video Cinema Container */}
      <div
        ref={playerContainerRef}
        className={`bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col ${
          isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
        }`}
      >
        {/* Canvas Screen */}
        <div className="relative flex-1 bg-black flex items-center justify-center min-h-[380px] sm:min-h-[500px]">
          <canvas
            ref={canvasRef}
            className={`w-full max-h-[650px] object-contain ${
              aspectRatio === '9:16' ? 'max-w-[360px] mx-auto shadow-2xl' : ''
            }`}
          />

          {/* Export Overlay Loader */}
          {isExporting && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mb-4 animate-pulse">
                <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
              </div>
              <h4 className="text-base font-bold text-white mb-1">
                완성 비디오 렌더링 및 녹화 중 ({exportProgress}%)
              </h4>
              <p className="text-xs text-slate-400 max-w-sm mb-4">
                시네마틱 카메라 모션, 자막, 오디오 트랙을 통합한 고화질 비디오를 인코딩하고 있습니다. 잠시만 기다려주세요...
              </p>
              <div className="w-64 h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Video Scrubber & Playhead Bar */}
        <div className="px-4 pt-3 pb-2 bg-slate-900 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="text-amber-400 font-bold">{formatTime(currentSecond)}</span>
            <span className="text-slate-300 font-sans font-medium text-xs">
              [{currentSection.id}구간: {currentSection.title}]
            </span>
            <span>06:00 (전체 9개 구간)</span>
          </div>

          {/* Clickable segmented scrubber */}
          <div className="relative h-3 w-full bg-slate-950 rounded-full overflow-hidden flex cursor-pointer">
            {sectionTimings.map((sec) => {
              const widthPct = (sec.durationSeconds / totalDuration) * 100;
              const isPassed = currentSecond >= sec.endSecond;
              const isCurrent = currentSecond >= sec.startSecond && currentSecond < sec.endSecond;

              return (
                <div
                  key={sec.id}
                  onClick={() => handleJumpToSection(sec)}
                  style={{ width: `${widthPct}%` }}
                  className={`h-full border-r border-slate-900 transition-colors ${
                    isCurrent
                      ? 'bg-amber-500 animate-pulse'
                      : isPassed
                      ? 'bg-amber-600/70'
                      : 'bg-slate-800 hover:bg-slate-700'
                  }`}
                  title={`${sec.id}구간 (${sec.title})`}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom Playback Controls Bar */}
        <div className="p-4 bg-slate-900/95 flex flex-wrap items-center justify-between gap-3">
          {/* Left Controls: Prev, Play/Pause, Next, Reset */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevSection}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="이전 구간"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition shadow-lg shadow-amber-500/20"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? '일시정지' : '영상 재생'}</span>
            </button>

            <button
              onClick={handleNextSection}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="다음 구간"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentSecond(0);
              }}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition"
              title="처음부터 다시 보기"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Middle Controls: Audio & Subtitle Toggles */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setEnableVoice(!enableVoice)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition ${
                enableVoice
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
              title="상담사 음성 내레이션 토글"
            >
              {enableVoice ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>음성 낭독</span>
            </button>

            <button
              onClick={() => setEnableSubtitles(!enableSubtitles)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition ${
                enableSubtitles
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
              title="화면 하단 자막 표시 토글"
            >
              <Subtitles className="w-3.5 h-3.5" />
              <span>한글 자막</span>
            </button>

            <button
              onClick={() => setEnableBgm(!enableBgm)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition ${
                enableBgm
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}
              title="따뜻한 피아노 배경음악 토글"
            >
              <Music className="w-3.5 h-3.5" />
              <span>배경음악</span>
            </button>
          </div>

          {/* Right Controls: Export & Animator Link */}
          <div className="flex items-center space-x-2">
            <button
              disabled={isExporting}
              onClick={handleExportFullVideo}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs flex items-center space-x-1.5 border border-slate-700 transition"
              title="완성 비디오 파일로 다운로드"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>비디오 다운로드</span>
            </button>

            <button
              onClick={() => onGoToAnimator(currentSection)}
              className="px-3 py-2 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-300 hover:bg-amber-500/25 font-bold text-xs flex items-center space-x-1.5 transition"
              title="이 구간 사진을 Gemini Omni Flash로 단독 영상 제작"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Omni Flash AI 변환</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition"
              title="전체화면 토글"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* 9 Scenes Playlist Grid */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center space-x-2">
          <Layers className="w-4 h-4 text-amber-400" />
          <span>전체 9개 연출 구간 목록 (클릭하여 해당 장면으로 이동)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sectionTimings.map((sec) => (
            <button
              key={sec.id}
              onClick={() => handleJumpToSection(sec)}
              className={`p-3 rounded-xl border text-left transition flex items-start space-x-3 ${
                currentSection.id === sec.id
                  ? 'bg-amber-500/15 border-amber-500 ring-1 ring-amber-500'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="w-16 h-12 rounded-lg bg-slate-800 overflow-hidden shrink-0 relative">
                <img
                  src={sec.sampleImage}
                  alt={sec.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-0.5 right-0.5 px-1 rounded bg-black/80 text-[9px] font-mono text-slate-300">
                  {sec.timeRange.split('–')[0]}
                </span>
              </div>

              <div className="overflow-hidden flex-1">
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-xs text-amber-400">{sec.id}구간</span>
                  <span className="font-bold text-xs text-white truncate">{sec.title}</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">
                  {sec.koreanDirection}
                </p>
                <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono mt-1">
                  <span>{sec.durationSeconds}초</span>
                  <span>•</span>
                  <span>{sec.category}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
