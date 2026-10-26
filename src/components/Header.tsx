import React from 'react';
import { Film, Sparkles, BookOpen, ScrollText, ExternalLink, PlaySquare } from 'lucide-react';

export type AppTab = 'full-video' | 'storyboard' | 'animator' | 'policy' | 'teleprompter';

interface HeaderProps {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenExport,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('full-video')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Film className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  자립<span className="text-amber-400">ON</span> 영상 스튜디오
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Gemini Omni Flash 1.1
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                자립준비청년 지원 안내 영상(9개 구간) 통합 상영 & AI 비디오 제작
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            {/* Primary Movie Tab */}
            <button
              onClick={() => setActiveTab('full-video')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all relative ${
                activeTab === 'full-video'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-amber-400 hover:text-amber-300 hover:bg-slate-800/80 border border-amber-500/30'
              }`}
            >
              <PlaySquare className="w-4 h-4" />
              <span>완성 영상 상영</span>
            </button>

            <button
              onClick={() => setActiveTab('storyboard')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'storyboard'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Film className="w-4 h-4" />
              <span className="hidden md:inline">9개 구간 스토리보드</span>
              <span className="md:hidden">스토리보드</span>
            </button>

            <button
              onClick={() => setActiveTab('animator')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all relative ${
                activeTab === 'animator'
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/50 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>AI 영상 생성 (16:9 / 9:16)</span>
            </button>

            <button
              onClick={() => setActiveTab('policy')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'policy'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden lg:inline">지원제도 & 계산기</span>
              <span className="lg:hidden">혜택</span>
            </button>

            <button
              onClick={() => setActiveTab('teleprompter')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === 'teleprompter'
                  ? 'bg-amber-500/15 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <ScrollText className="w-4 h-4" />
              <span className="hidden xl:inline">프롬프터 대본</span>
              <span className="xl:hidden">대본</span>
            </button>
          </nav>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenExport}
              className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center space-x-1"
            >
              <span>기획안 저장</span>
            </button>
            <a
              href="https://jaripon.ncrc.or.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden 2xl:flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-500/10 text-amber-300 hover:bg-amber-500/20 border border-amber-500/30 transition"
            >
              <span>자립정보ON</span>
              <ExternalLink className="w-3 h-3 ml-0.5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
