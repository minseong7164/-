import React, { useState } from 'react';
import {
  Copy,
  Check,
  Sparkles,
  Volume2,
  VolumeX,
  Camera,
  SunMedium,
  CheckCircle2,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import { StoryboardSection } from '../data/storyboardData';

interface StoryboardSectionCardProps {
  section: StoryboardSection;
  isSelected: boolean;
  onSelect: () => void;
  onAnimate: () => void;
}

export const StoryboardSectionCard: React.FC<StoryboardSectionCardProps> = ({
  section,
  isSelected,
  onSelect,
  onAnimate,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(section.aiPromptEnglish);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleVoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!('speechSynthesis' in window)) {
      alert('현재 브라우저에서 음성 합성을 지원하지 않습니다.');
      return;
    }

    if (isPlayingVoice) {
      window.speechSynthesis.cancel();
      setIsPlayingVoice(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(section.koreanScript);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.95; // Warm, steady counseling pace
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingVoice(true);
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`relative rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer ${
        isSelected
          ? 'bg-slate-900 border-amber-500 ring-2 ring-amber-500/20 shadow-xl shadow-amber-500/10'
          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
      }`}
    >
      {/* Top Banner: Timecode & Category */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2 bg-slate-950/40">
        <div className="flex items-center space-x-2.5">
          <span className="px-2.5 py-1 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-xs">
            {section.id}구간
          </span>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {section.title}
          </h3>
          <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md">
            {section.timeRange} ({section.durationSeconds}초)
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleToggleVoice}
            className={`p-1.5 rounded-lg border text-xs flex items-center space-x-1 transition ${
              isPlayingVoice
                ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="상담사 한국어 대본 음성 듣기"
          >
            {isPlayingVoice ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="text-[11px] hidden sm:inline">
              {isPlayingVoice ? '음성 정지' : '대본 듣기'}
            </span>
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onAnimate();
            }}
            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition shadow"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI 영상 만들기</span>
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left Column: Direction & AI Prompt (7 cols) */}
        <div className="md:col-span-7 space-y-4">
          {/* 연출 방향 */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1">
              <Camera className="w-3.5 h-3.5" />
              <span>연출 방향 (Directing Note)</span>
            </span>
            <p className="text-sm text-slate-200 font-medium leading-relaxed bg-slate-950/50 p-2.5 rounded-xl border border-slate-800/60">
              {section.koreanDirection}
            </p>
          </div>

          {/* AI 영상 생성 프롬프트 (English) */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1">
                <SunMedium className="w-3.5 h-3.5 text-amber-400" />
                <span>AI 영상 생성 프롬프트 (English)</span>
              </span>
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="text-xs text-slate-400 hover:text-amber-300 flex items-center space-x-1 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px]">{copied ? '복사 완료' : '프롬프트 복사'}</span>
              </button>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono leading-relaxed select-all">
              {section.aiPromptEnglish}
            </div>
          </div>

          {/* Camera Details Chips */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
            <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block font-semibold">샷 / 구도</span>
              <span className="text-slate-300 font-mono">{section.cameraDetails.shotType}</span>
            </div>
            <div className="bg-slate-950/80 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block font-semibold">조명 / 톤</span>
              <span className="text-amber-300/90 font-mono">{section.cameraDetails.lighting}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Reference Visual & Narration Script (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          {/* Reference Image Preview */}
          <div className="relative rounded-xl overflow-hidden aspect-video border border-slate-800 bg-slate-950 group">
            <img
              src={section.sampleImage}
              alt={section.title}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex items-end p-2.5">
              <span className="text-[10px] font-mono text-slate-300">
                추천 시작 프레임 레퍼런스
              </span>
            </div>
          </div>

          {/* 상담사 한국어 대본 */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <span>상담사 내레이션 대본</span>
              <span className="text-amber-400/80 font-normal">한국어 오디오</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 italic">
              "{section.koreanScript}"
            </p>
          </div>

          {/* Highlights checklist */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              핵심 전달 포인트
            </span>
            <div className="space-y-1">
              {section.keyHighlights.map((hl, idx) => (
                <div key={idx} className="flex items-start space-x-1.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
