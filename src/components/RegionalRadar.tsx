import React, { useState } from 'react';
import {
  MapPin,
  Building,
  Phone,
  Coins,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  Lightbulb,
  Search,
  Compass
} from 'lucide-react';
import { REGIONAL_CENTERS_DATA, RegionalCenter } from '../data/regionalData';

interface RegionalRadarProps {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

export const RegionalRadar: React.FC<RegionalRadarProps> = ({
  selectedRegion,
  onSelectRegion,
}) => {
  const [regionFilter, setRegionFilter] = useState('');

  const currentCenter =
    REGIONAL_CENTERS_DATA.find((r) => r.region === selectedRegion) ||
    REGIONAL_CENTERS_DATA[0];

  const filteredRegions = REGIONAL_CENTERS_DATA.filter(
    (r) =>
      r.region.includes(regionFilter) ||
      r.specialBenefits.some((b) => b.includes(regionFilter))
  );

  return (
    <section id="radar" className="space-y-6 pt-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Regional Settlement
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            전국 17개 시·도 자립정착금 & 전담기관 현황
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            자립정착금은 지자체에 따라 1,000만~2,000만 원까지 차이가 있습니다. 거주 지역을 누르고 특별 지원 혜택을 확인하세요.
          </p>
        </div>

        <div className="relative w-full sm:w-60">
          <input
            type="text"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            placeholder="지역 또는 혜택 검색 (예: 경기, 체험홈)..."
            className="w-full bg-white border border-stone-300 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 17 Region Selector Grid (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-stone-200 shadow-md shadow-stone-200/40 space-y-3">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">
            지역 선택 (클릭 시 우측 상세 표시):
          </span>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2 max-h-[460px] overflow-y-auto pr-1">
            {filteredRegions.map((r) => {
              const isSelected = selectedRegion === r.region;
              return (
                <button
                  key={r.region}
                  onClick={() => onSelectRegion(r.region)}
                  className={`p-3 rounded-2xl border text-left transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20 text-emerald-950 font-bold shadow-xs'
                      : 'bg-stone-50/80 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div>
                    <span className="text-xs sm:text-sm font-bold block">{r.region}</span>
                    <span className="text-[10px] text-stone-400 truncate block">{r.disbursementPlan}</span>
                  </div>
                  <span
                    className={`text-xs font-black px-2 py-0.5 rounded-lg shrink-0 ml-1.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white'
                        : 'bg-stone-200/80 text-stone-800'
                    }`}
                  >
                    {r.settlementFund.replace(' ', '')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed Regional Hub Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md shadow-stone-200/40 space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Top Stat Row */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-lg border border-emerald-200">
                  {currentCenter.regionShort}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-2xl font-black text-stone-900 tracking-tight">
                      {currentCenter.region}
                    </h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                      선택된 지자체
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">
                    지급 방식: {currentCenter.disbursementPlan}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] text-stone-500 block font-semibold">
                  자립정착금 지원액
                </span>
                <span className="text-3xl sm:text-4xl font-black text-emerald-600">
                  {currentCenter.settlementFund}
                </span>
              </div>
            </div>

            {/* Counselor Note */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start space-x-3 text-amber-900">
              <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-relaxed">
                <strong className="block text-amber-800 font-bold mb-0.5">
                  지역 전담 상담관의 실전 조언:
                </strong>
                {currentCenter.keyAdvice}
              </div>
            </div>

            {/* Special Regional Programs */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider flex items-center space-x-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>{currentCenter.region}만의 특화 연계 지원 사업</span>
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentCenter.specialBenefits.map((b, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-stone-50 border border-stone-200 flex items-start space-x-2 text-xs text-stone-800"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-semibold">{b}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Center Info */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-stone-900 text-sm">
                  {currentCenter.centerName}
                </span>
                <span className="text-stone-500">지역 공식 전담기관</span>
              </div>
              <p className="text-stone-600">{currentCenter.address}</p>
              <div className="flex items-center space-x-2 pt-1 font-mono font-bold text-stone-900">
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>{currentCenter.phone}</span>
              </div>
            </div>
          </div>

          {/* Action Call */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
            <span className="text-xs text-stone-500">
              방문 전 미리 전화로 1:1 상담 일정을 예약하세요.
            </span>
            <a
              href={`tel:${currentCenter.phone.replace(/-/g, '')}`}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition flex items-center space-x-1 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>전화 연결</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
