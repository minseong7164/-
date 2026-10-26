import React, { useState } from 'react';
import {
  Sparkles,
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Coins,
  Building,
  Briefcase,
  HeartPulse,
  Compass,
  MapPin
} from 'lucide-react';
import { REGIONAL_CENTERS_DATA } from '../data/regionalData';

interface InteractiveHubHeroProps {
  onSearch: (term: string) => void;
  selectedPersona: string;
  onSelectPersona: (persona: string) => void;
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

export const InteractiveHubHero: React.FC<InteractiveHubHeroProps> = ({
  onSearch,
  selectedPersona,
  onSelectPersona,
  selectedRegion,
  onSelectRegion,
}) => {
  const [searchInput, setSearchInput] = useState('');

  const currentRegion =
    REGIONAL_CENTERS_DATA.find((r) => r.region === selectedRegion) ||
    REGIONAL_CENTERS_DATA[0];

  // Calculate live numbers
  const allowance5Years = 3000; // 50만 x 60 = 3000만원
  const settlementFund = currentRegion.numericFund; // 1200 ~ 2000만원
  const jobOrSchoolBenefit =
    selectedPersona === 'student'
      ? 1600 // 등록금 전액 + 장학금
      : selectedPersona === 'job-seeker'
      ? 450 // 구직수당 300 + 성공수당 150
      : 300;

  const totalCalculated = allowance5Years + settlementFund + jobOrSchoolBenefit;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const personas = [
    { id: 'all', label: '전체 보기', desc: '모든 정책' },
    { id: 'pre', label: '퇴소 준비 청년 (D-Day 전)', desc: '퇴소 전 필수 신청' },
    { id: 'early', label: '홀로서기 1~2년 차', desc: '주거 계약 & 정착' },
    { id: 'student', label: '대학생 청년', desc: '등록금 전액 & 장학금' },
    { id: 'job-seeker', label: '취업준비 청년', desc: '구직수당 & 면접' },
  ];

  return (
    <section className="relative overflow-hidden pt-6 pb-12">
      {/* Decorative Warm Background Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 left-10 w-80 h-80 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="space-y-8">
        {/* Main Headline & Search */}
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-bold border border-emerald-300/60 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>2026 자립준비청년 원스톱 종합 복지 내비게이터</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.2]">
            세상으로 첫발을 내딛는 당신에게,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600">
              국가가 준비한 든든한 울타리
            </span>를 연결합니다
          </h1>

          <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
            매월 50만 원 자립수당부터 최대 2,000만 원 정착금, LH 1순위 주거 지원, 구직촉진수당, 무료 1:1 심리상담까지 내가 누릴 수 있는 모든 지원을 쉽고 명확하게 찾아보세요.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSearchSubmit} className="pt-2 max-w-2xl">
            <div className="relative flex items-center shadow-lg shadow-stone-200/60 rounded-2xl bg-white border border-stone-200 p-1.5 focus-within:border-emerald-500 focus-within:ring-3 focus-within:ring-emerald-500/10 transition">
              <Search className="w-5 h-5 text-stone-400 ml-3 shrink-0" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  onSearch(e.target.value);
                }}
                placeholder="궁금한 혜택 검색 (예: 월세, 수당, LH, 치과, 취업, 노트북, 자격증...)"
                className="w-full bg-transparent border-none px-3 py-2.5 text-sm sm:text-base text-stone-900 placeholder-stone-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shrink-0 transition shadow-xs"
              >
                검색
              </button>
            </div>

            {/* Quick Popular Keywords */}
            <div className="flex items-center flex-wrap gap-1.5 mt-3 text-xs">
              <span className="text-stone-400 font-semibold text-[11px] mr-1">인기 검색:</span>
              {[
                '자립수당 50만원',
                '자립정착금',
                'LH 청년전세 1순위',
                '국민취업지원제도',
                '마음건강 바우처',
                '국가장학금',
                '전세사기 예방'
              ].map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => {
                    setSearchInput(kw.split(' ')[0]);
                    onSearch(kw.split(' ')[0]);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-emerald-50 border border-stone-200 hover:border-emerald-300 text-stone-600 hover:text-emerald-700 text-[11px] transition font-medium"
                >
                  {kw}
                </button>
              ))}
            </div>
          </form>
        </div>

        {/* Persona Pill Filter Bar */}
        <div className="bg-white rounded-3xl p-5 border border-stone-200/80 shadow-md shadow-stone-200/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center space-x-1.5">
              <Compass className="w-4 h-4 text-emerald-600" />
              <span>현재 청년분의 상황을 선택하면 맞춤 혜택이 즉시 강조됩니다:</span>
            </span>
            <span className="text-xs text-stone-400 hidden sm:inline">
              상황별 우선 지원 제도 자동 필터링
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {personas.map((p) => {
              const isSelected = selectedPersona === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectPersona(p.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition flex items-center space-x-2 border ${
                    isSelected
                      ? 'bg-stone-900 border-stone-900 text-white shadow-md'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 hover:border-stone-300'
                  }`}
                >
                  <span>{p.label}</span>
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-md ${isSelected ? 'bg-white/20 text-stone-200' : 'bg-stone-200/70 text-stone-500'}`}>
                    {p.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Total Benefit Card Deck (2 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Big Impact Live Money Counter (7 cols) */}
          <div className="lg:col-span-7 bg-gradient-to-br from-stone-900 via-stone-850 to-stone-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <Coins className="w-4 h-4" />
                  <span>실시간 지원 혜택 합산 계산기</span>
                </span>

                {/* Region quick selector inside hero */}
                <div className="flex items-center space-x-1.5 bg-stone-800/90 rounded-xl px-3 py-1.5 border border-stone-700 text-xs">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-stone-300 font-medium">거주 지역:</span>
                  <select
                    value={selectedRegion}
                    onChange={(e) => onSelectRegion(e.target.value)}
                    className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                  >
                    {REGIONAL_CENTERS_DATA.map((r) => (
                      <option key={r.region} value={r.region} className="bg-stone-900 text-white">
                        {r.region} ({r.settlementFund})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <span className="text-xs sm:text-sm text-stone-400 block mb-1">
                  {selectedRegion} 기준, 내가 받을 수 있는 최대 정부 지원금 총액
                </span>
                <div className="flex items-baseline space-x-2">
                  <span className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                    약 {totalCalculated.toLocaleString()}
                  </span>
                  <span className="text-xl sm:text-2xl font-bold text-amber-400">만 원</span>
                  <span className="text-xs text-stone-400 hidden sm:inline">
                    (수당 + 정착금 + 맞춤지원)
                  </span>
                </div>
              </div>

              {/* 3 Pillars Breakdown */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-stone-800 text-xs">
                <div className="bg-stone-800/60 p-3 rounded-2xl border border-stone-700/60">
                  <span className="text-stone-400 block text-[11px]">자립수당 (5년)</span>
                  <span className="text-base sm:text-lg font-bold text-white">
                    3,000<span className="text-xs font-normal text-stone-300">만</span>
                  </span>
                  <span className="text-[10px] text-amber-400 block mt-0.5">월 50만 x 60회</span>
                </div>

                <div className="bg-stone-800/60 p-3 rounded-2xl border border-stone-700/60">
                  <span className="text-stone-400 block text-[11px]">{currentRegion.regionShort} 정착금</span>
                  <span className="text-base sm:text-lg font-bold text-amber-300">
                    {settlementFund.toLocaleString()}<span className="text-xs font-normal text-stone-300">만</span>
                  </span>
                  <span className="text-[10px] text-stone-400 block mt-0.5 truncate">{currentRegion.disbursementPlan}</span>
                </div>

                <div className="bg-stone-800/60 p-3 rounded-2xl border border-stone-700/60">
                  <span className="text-stone-400 block text-[11px]">취업/학업 추가</span>
                  <span className="text-base sm:text-lg font-bold text-emerald-300">
                    +{jobOrSchoolBenefit.toLocaleString()}<span className="text-xs font-normal text-stone-300">만</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 block mt-0.5">
                    {selectedPersona === 'student' ? '장학금 전액' : '구직촉진수당'}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span>* 주거 지원(LH 최대 1.2억 저리 융자)은 별도로 지원됩니다.</span>
              <span className="text-amber-400 font-semibold">2026 복지기준</span>
            </div>
          </div>

          {/* Right: Quick Checklist / Vital Tips (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-stone-200 shadow-md shadow-stone-200/40 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  ✓
                </span>
                <div>
                  <h3 className="font-bold text-stone-900 text-sm sm:text-base">
                    자립준비청년이 반드시 기억할 3가지
                  </h3>
                  <span className="text-xs text-stone-500">절대 놓치면 안 되는 핵심 원칙</span>
                </div>
              </div>

              <div className="space-y-2.5 pt-1">
                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/70 text-xs text-stone-700 flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <strong className="text-stone-900 block">알바·취업해도 수당은 깎이지 않습니다.</strong>
                    <span>자립수당은 근로소득과 무관하게 5년간 50만 원 전액 나옵니다.</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/70 text-xs text-stone-700 flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <strong className="text-stone-900 block">집 계약할 땐 전담기관에 동행 요청하세요.</strong>
                    <span>부동산 사기 예방을 위해 전문가가 계약 현장에 무료 동행합니다.</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200/70 text-xs text-stone-700 flex items-start space-x-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <strong className="text-stone-900 block">원하면 만 24세까지 보호 연장 가능합니다.</strong>
                    <span>퇴소가 두렵다면 시설이나 위탁가정에 계속 머물 수 있습니다.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="tel:15223865"
                className="w-full py-2.5 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold text-xs flex items-center justify-center space-x-1.5 transition"
              >
                <span>궁금한 점 전화로 바로 물어보기 (1522-3865)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
