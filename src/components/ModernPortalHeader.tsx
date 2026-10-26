import React from 'react';
import {
  Compass,
  PhoneCall,
  ExternalLink,
  ShieldCheck,
  Coins,
  MapPin,
  ListTodo,
  HelpCircle,
  Sparkles
} from 'lucide-react';

interface ModernPortalHeaderProps {
  onOpenHotlines: () => void;
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
}

export const ModernPortalHeader: React.FC<ModernPortalHeaderProps> = ({
  onOpenHotlines,
  activeSection,
  onNavigateSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/90 shadow-xs">
      {/* Top Essential Ticker Bar */}
      <div className="bg-stone-900 text-stone-200 text-xs px-4 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              공식 복지 안내
            </span>
            <span className="font-medium text-stone-300">
              보건복지부 & 아동권리보장원 자립정보ON 기준 • 자립준비청년 전용
            </span>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <span className="hidden sm:inline text-stone-400">
              자립지원 콜센터 <strong className="text-amber-400">1522-3865</strong> (평일 9-18시)
            </span>
            <span className="hidden md:inline text-stone-400">
              보건복지상담 <strong className="text-emerald-400">129</strong> (24시간)
            </span>
            <button
              onClick={onOpenHotlines}
              className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-2 flex items-center space-x-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>긴급 핫라인 전체보기</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <div
            onClick={() => onNavigateSection('hero')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-amber-500 p-0.5 shadow-md shadow-emerald-600/15 group-hover:scale-105 transition">
              <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
                <Compass className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-extrabold text-stone-900 tracking-tight">
                  자립<span className="text-emerald-600">ON</span>
                </span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  청년 자립 나침반
                </span>
              </div>
              <p className="text-xs text-stone-500 hidden sm:block">
                자립수당 • 17개 시도 정착금 • LH 주거지원 • 맞춤 지원금 계산
              </p>
            </div>
          </div>

          {/* Quick Nav Anchor Buttons */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { id: 'passports', label: '4대 핵심 혜택', icon: Coins },
              { id: 'radar', label: '17개 시도 정착금', icon: MapPin },
              { id: 'roadmap', label: '자립 생애 로드맵', icon: ListTodo },
              { id: 'calculator', label: '지원금 즉시 계산', icon: Sparkles },
              { id: 'faq', label: '실전 Q&A 백과', icon: HelpCircle },
            ].map((nav) => {
              const Icon = nav.icon;
              const isActive = activeSection === nav.id;
              return (
                <button
                  key={nav.id}
                  onClick={() => onNavigateSection(nav.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center space-x-1.5 ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{nav.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onNavigateSection('calculator')}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 transition flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>내 혜택 바로 계산</span>
            </button>

            <a
              href="https://jaripon.ncrc.or.kr"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-1 px-3 py-2 text-xs font-semibold rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition border border-stone-200"
            >
              <span>자립정보ON</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
