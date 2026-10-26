import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Maximize,
  Minimize,
  Type,
  ChevronUp,
  ChevronDown,
  Volume2,
  VolumeX
} from 'lucide-react';
import { STORYBOARD_SECTIONS } from '../data/storyboardData';

interface TeleprompterModalProps {
  onClose: () => void;
}

export const TeleprompterModal: React.FC<TeleprompterModalProps> = ({ onClose }) => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState<number>(2); // 1 = slow, 3 = normal, 5 = fast
  const [fontSize, setFontSize] = useState<number>(24);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeSpeakingSection, setActiveSpeakingSection] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll loop
  useEffect(() => {
    let animationFrameId: number;

    const scrollStep = () => {
      if (isScrolling && containerRef.current) {
        containerRef.current.scrollTop += scrollSpeed * 0.5;
        // Check if reached bottom
        if (
          containerRef.current.scrollTop + containerRef.current.clientHeight >=
          containerRef.current.scrollHeight - 5
        ) {
          setIsScrolling(false);
          return;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    if (isScrolling) {
      animationFrameId = requestAnimationFrame(scrollStep);
    }

    return () => cancelAnimationFrame(animationFrameId);
  }, [isScrolling, scrollSpeed]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleSpeakSection = (text: string, id: number) => {
    if (!('speechSynthesis' in window)) return;

    if (activeSpeakingSection === id) {
      window.speechSynthesis.cancel();
      setActiveSpeakingSection(null);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.95;
      utterance.onend = () => setActiveSpeakingSection(null);
      utterance.onerror = () => setActiveSpeakingSection(null);
      window.speechSynthesis.speak(utterance);
      setActiveSpeakingSection(id);
    }
  };

  const resetScroll = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
      setIsScrolling(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
      {/* Top Controls Bar */}
      <div className="border-b border-slate-800 bg-slate-950/90 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-bold text-white text-sm sm:text-base flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span>프롬프터 대본 스크롤 모드 (6분 완독)</span>
          </span>

          <div className="hidden sm:flex items-center space-x-1.5 bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button
              onClick={() => setIsScrolling(!isScrolling)}
              className={`px-3 py-1 rounded text-xs font-bold transition flex items-center space-x-1 ${
                isScrolling ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-200'
              }`}
            >
              {isScrolling ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isScrolling ? '스크롤 정지' : '자동 스크롤'}</span>
            </button>
            <button
              onClick={resetScroll}
              className="p-1 rounded text-slate-400 hover:text-white"
              title="맨 위로"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Adjusters */}
        <div className="flex items-center space-x-3">
          {/* Speed */}
          <div className="flex items-center space-x-1 text-xs text-slate-400">
            <span>속도:</span>
            {[1, 2, 4].map((speed) => (
              <button
                key={speed}
                onClick={() => setScrollSpeed(speed)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                  scrollSpeed === speed ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                }`}
              >
                {speed}x
              </button>
            ))}
          </div>

          {/* Font Size */}
          <div className="flex items-center space-x-1 text-xs text-slate-400">
            <Type className="w-3.5 h-3.5" />
            <button
              onClick={() => setFontSize((f) => Math.max(18, f - 2))}
              className="p-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700"
            >
              <ChevronDown className="w-3 h-3" />
            </button>
            <span className="font-mono text-slate-200 text-xs w-6 text-center">{fontSize}</span>
            <button
              onClick={() => setFontSize((f) => Math.min(42, f + 2))}
              className="p-1 rounded bg-slate-800 text-slate-200 hover:bg-slate-700"
            >
              <ChevronUp className="w-3 h-3" />
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            title="전체화면"
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-500 text-slate-300 hover:text-white transition"
            title="닫기"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Prompter Scrolling Area */}
      <div
        ref={containerRef}
        className="flex-1 overflow-y-auto px-6 sm:px-16 py-12 max-w-4xl mx-auto w-full space-y-16 select-none scroll-smooth"
      >
        <div className="text-center text-slate-500 text-xs uppercase tracking-widest pb-8 border-b border-slate-900">
          * 시선은 카메라 렌즈 바로 윗부분을 응시하며 자연스러운 미소로 진행하세요 *
        </div>

        {STORYBOARD_SECTIONS.map((sec) => (
          <div key={sec.id} className="space-y-4 pb-12 border-b border-slate-900/80">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-bold text-xs">
                  {sec.id}구간
                </span>
                <span className="text-slate-400 font-mono text-xs">{sec.timeRange}</span>
                <span className="text-slate-300 font-bold text-sm">[{sec.title}]</span>
              </div>

              <button
                onClick={() => handleSpeakSection(sec.koreanScript, sec.id)}
                className="text-xs text-slate-400 hover:text-amber-400 flex items-center space-x-1"
              >
                {activeSpeakingSection === sec.id ? (
                  <VolumeX className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
                <span>{activeSpeakingSection === sec.id ? '정지' : '낭독 가이드'}</span>
              </button>
            </div>

            {/* Directing Cue Box */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800/80 text-xs text-amber-400/90 font-mono">
              🎬 [연출 큐]: {sec.koreanDirection}
            </div>

            {/* Script Text */}
            <p
              style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}
              className="font-medium text-slate-100 tracking-normal"
            >
              {sec.koreanScript}
            </p>
          </div>
        ))}

        <div className="text-center py-16 text-slate-600 text-sm">
          — 전체 9구간 촬영 대본 완료 —
        </div>
      </div>
    </div>
  );
};
