import React from 'react';
import {
  Compass,
  Search,
  MapPin,
  ListTodo,
  Sparkles,
  HelpCircle,
  PhoneCall,
  ExternalLink,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

export type PortalTab = 'search' | 'regional' | 'roadmap' | 'diagnosis' | 'faq';

interface PortalHeaderProps {
  activeTab: PortalTab;
  setActiveTab: (tab: PortalTab) => void;
  onOpenHotlines: () => void;
}

export const PortalHeader: React.FC<PortalHeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenHotlines,
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      {/* Top Emergency Ticker */}
      <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-emerald-500/15 border-b border-slate-800/80 px-4 py-1.5 text-xs text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-amber-300">자립준비청년 전용 핫라인:</span>
            <span className="hidden sm:inline text-slate-300">
              자립지원 콜센터 <strong className="text-white">1522-3865</strong> | 보건복지상담 <strong className="text-white">국번없이 129</strong> (24시간)
            </span>
          </div>

          <div className="flex items-center space-x-3 text-[11px]">
            <button
              onClick={onOpenHotlines}
              className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-2 flex items-center space-x-1"
            >
              <PhoneCall className="w-3 h-3 inline" />
              <span>전국 긴급 연락망 보기</span>
            </button>
            <a
              href="https://jaripon.ncrc.or.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center space-x-1 text-slate-400 hover:text-slate-200"
            >
              <span>자립정보ON 공식포털</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => setActiveTab('search')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Compass className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-extrabold text-white tracking-tight">
                  자립<span className="text-amber-400">ON</span>
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30">
                  정보포털
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                자립준비청년 맞춤 종합 정책 & 혜택 탐색기
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setActiveTab('search')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'search'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>맞춤 정책 검색</span>
            </button>

            <button
              onClick={() => setActiveTab('regional')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'regional'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden md:inline">17개 시도 정착금·센터</span>
              <span className="md:hidden">지역정착금</span>
            </button>

            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'roadmap'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <ListTodo className="w-4 h-4" />
              <span className="hidden lg:inline">자립 로드맵 & 체크리스트</span>
              <span className="lg:hidden">로드맵</span>
            </button>

            <button
              onClick={() => setActiveTab('diagnosis')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition relative ${
                activeTab === 'diagnosis'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-amber-400 hover:text-amber-300 hover:bg-slate-800/60 border border-amber-500/30'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">나의 혜택 진단기</span>
              <span className="sm:hidden">진단기</span>
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'faq'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span className="hidden xl:inline">자주 묻는 질문(FAQ)</span>
              <span className="xl:hidden">Q&A</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};
