import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Building,
  Phone,
  PhoneCall,
  Coins,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  Search,
  Compass,
  Lightbulb
} from 'lucide-react';
import { REGIONAL_CENTERS_DATA, RegionalCenter } from '../data/regionalData';

export const RegionalBenefitsSection: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('서울특별시');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const currentCenter = useMemo(() => {
    return (
      REGIONAL_CENTERS_DATA.find((r) => r.region === selectedRegion) ||
      REGIONAL_CENTERS_DATA[0]
    );
  }, [selectedRegion]);

  const filteredList = useMemo(() => {
    if (!searchTerm.trim()) return REGIONAL_CENTERS_DATA;
    return REGIONAL_CENTERS_DATA.filter(
      (r) =>
        r.region.includes(searchTerm) ||
        r.specialBenefits.some((b) => b.includes(searchTerm))
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>전국 17개 시·도 자립정착금 & 전담기관 현황</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            내 거주지 지자체 혜택 & 전담기관 찾기
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            자립정착금은 지자체 조례에 따라 <strong>1,000만 원부터 최대 2,000만 원</strong>까지 차이가 있습니다. 거주 지역을 선택하고 지역별 특별 연계 지원과 전담 상담센터 연락처를 확인하세요.
          </p>
        </div>
      </div>

      {/* Region Selector Pills */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            지역 선택 (17개 시·도):
          </span>

          <div className="relative w-full sm:w-60">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="지역명 검색 (예: 경기, 부산)..."
              className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Region Pills Grid */}
        <div className="flex flex-wrap gap-1.5">
          {filteredList.map((item) => {
            const isSelected = selectedRegion === item.region;
            return (
              <button
                key={item.region}
                onClick={() => setSelectedRegion(item.region)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <span>{item.regionShort}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${isSelected ? 'bg-slate-950/20 text-slate-950 font-extrabold' : 'bg-slate-800 text-amber-400'}`}>
                  {item.settlementFund.replace(' ', '')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Region Detailed Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Settlement Money & Special Programs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-extrabold text-base">
                  {currentCenter.regionShort}
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    {currentCenter.region}
                  </h3>
                  <span className="text-xs text-slate-400">
                    {currentCenter.disbursementPlan}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-slate-400 block font-semibold">
                  자립정착금 지원액
                </span>
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
                  {currentCenter.settlementFund}
                </span>
              </div>
            </div>

            {/* Counselor's Key Advice */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                <strong className="text-amber-300 block mb-0.5">상담관의 지역 꿀팁:</strong>
                {currentCenter.keyAdvice}
              </div>
            </div>

            {/* Special Regional Extra Benefits */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>{currentCenter.region}만의 특화 연계 지원 혜택</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentCenter.specialBenefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start space-x-2 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Dedicated Support Agency Contact (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Building className="w-4 h-4" />
                <span>관할 자립지원전담기관 안내</span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">
                  {currentCenter.centerName}
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  지역 내 자립준비청년의 1:1 맞춤형 사례관리, 주거 계약 동행, 긴급 구호 및 심리상담을 전담 지원하는 공식 기관입니다.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {/* Phone */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400 block font-semibold">대표 전화</span>
                      <span className="text-sm font-bold text-white font-mono">{currentCenter.phone}</span>
                    </div>
                  </div>
                  <a
                    href={`tel:${currentCenter.phone.replace(/-/g, '')}`}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition"
                  >
                    전화걸기
                  </a>
                </div>

                {/* Address */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-xs">
                    <span className="text-[11px] text-slate-400 block font-semibold mb-0.5">기관 주소</span>
                    <span className="text-slate-200 leading-relaxed">{currentCenter.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hotline Prompt */}
            <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 text-xs space-y-1.5 text-slate-400">
              <span className="font-bold text-slate-300 block">방문 전 상담 예약 팁</span>
              <p className="leading-relaxed">
                전담기관 방문 전 전화로 먼저 방문 일정을 잡으시면 대기 없이 전담 상담관과 1:1로 맞춤 상담을 받으실 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
