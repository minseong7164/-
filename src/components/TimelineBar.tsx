import React, { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Clock, Sparkles } from 'lucide-react';
import { STORYBOARD_SECTIONS, StoryboardSection } from '../data/storyboardData';

interface TimelineBarProps {
  selectedSectionId: number;
  onSelectSection: (section: StoryboardSection) => void;
  onAnimateSection: (section: StoryboardSection) => void;
}

export const TimelineBar: React.FC<TimelineBarProps> = ({
  selectedSectionId,
  onSelectSection,
  onAnimateSection,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSeconds, setCurrentSeconds] = useState(0);
  const totalSeconds = 360; // 06:00

  // Calculate section start times
  const sectionStartTimes = React.useMemo(() => {
    let accumulated = 0;
    return STORYBOARD_SECTIONS.map((sec) => {
      const start = accumulated;
      accumulated += sec.durationSeconds;
      return { id: sec.id, start, end: accumulated };
    });
  }, []);

  // Timer effect for playback simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSeconds((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 1;
          // Auto-select section based on current second
          const currentSec = sectionStartTimes.find(
            (s) => next >= s.start && next < s.end
          );
          if (currentSec && currentSec.id !== selectedSectionId) {
            const found = STORYBOARD_SECTIONS.find((s) => s.id === currentSec.id);
            if (found) onSelectSection(found);
          }
          return next;
        });
      }, 300); // 300ms per simulated second for smooth, quick demo
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedSectionId, sectionStartTimes, onSelectSection]);

  const activeSection =
    STORYBOARD_SECTIONS.find((s) => s.id === selectedSectionId) ||
    STORYBOARD_SECTIONS[0];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleJumpToSection = (sec: StoryboardSection) => {
    const timing = sectionStartTimes.find((s) => s.id === sec.id);
    if (timing) {
      setCurrentSeconds(timing.start);
    }
    onSelectSection(sec);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md">
      {/* Upper row: current playing state & controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 font-mono text-sm">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="font-bold">{formatTime(currentSeconds)}</span>
            <span className="text-slate-500">/</span>
            <span className="text-slate-400">06:00</span>
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold transition flex items-center justify-center shadow-md shadow-amber-500/20"
              title={isPlaying ? '일시정지' : '타임라인 시뮬레이션 재생'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setCurrentSeconds(0);
                onSelectSection(STORYBOARD_SECTIONS[0]);
              }}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
              title="처음으로 리셋"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="hidden md:block text-xs text-slate-400">
            총 9개 연출 구간 • 자립준비청년 종합 맞춤 안내
          </div>
        </div>

        {/* Active Section Preview Pill */}
        <div className="flex items-center space-x-2">
          <div className="px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs flex items-center space-x-2">
            <span className="font-bold text-amber-400">{activeSection.id}구간</span>
            <span className="text-slate-300 font-medium">{activeSection.title}</span>
            <span className="text-slate-400 font-mono">({activeSection.timeRange})</span>
          </div>
          <button
            onClick={() => onAnimateSection(activeSection)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition shadow-lg shadow-amber-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>이 구간 영상 생성</span>
          </button>
        </div>
      </div>

      {/* Segmented Timeline Bar */}
      <div className="space-y-1.5">
        <div className="relative h-6 sm:h-7 w-full bg-slate-950 rounded-xl overflow-hidden p-0.5 border border-slate-800 flex">
          {STORYBOARD_SECTIONS.map((sec) => {
            const widthPercent = (sec.durationSeconds / totalSeconds) * 100;
            const isSelected = sec.id === selectedSectionId;

            return (
              <button
                key={sec.id}
                onClick={() => handleJumpToSection(sec)}
                style={{ width: `${widthPercent}%` }}
                className={`relative h-full transition-all group flex items-center justify-center border-r border-slate-950/60 first:rounded-l-[9px] last:rounded-r-[9px] ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold shadow-inner'
                    : 'bg-slate-800/80 hover:bg-slate-700/90 text-slate-400'
                }`}
                title={`${sec.id}구간 (${sec.timeRange}) ${sec.title}`}
              >
                <span className="text-[10px] sm:text-xs font-semibold truncate px-1">
                  {sec.id}
                </span>

                {/* Hover indicator tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:flex flex-col items-center z-30 pointer-events-none">
                  <div className="bg-slate-900 border border-slate-700 text-slate-200 text-[11px] rounded-lg px-2.5 py-1 whitespace-nowrap shadow-xl">
                    <span className="font-bold text-amber-400">{sec.id}구간</span>: {sec.title} ({sec.timeRange})
                  </div>
                  <div className="w-2 h-2 bg-slate-900 border-r border-b border-slate-700 rotate-45 -mt-1"></div>
                </div>
              </button>
            );
          })}

          {/* Scrubber indicator line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_#fff] pointer-events-none transition-all duration-150 z-20"
            style={{ left: `${(currentSeconds / totalSeconds) * 100}%` }}
          />
        </div>

        {/* Legend / time markers */}
        <div className="flex justify-between text-[11px] font-mono text-slate-400 px-1">
          <span>00:00 (오프닝)</span>
          <span className="hidden sm:inline">01:20 (자립수당)</span>
          <span className="hidden md:inline">02:55 (종합지원)</span>
          <span className="hidden sm:inline">04:30 (문의처)</span>
          <span>06:00 (엔딩)</span>
        </div>
      </div>
    </div>
  );
};
