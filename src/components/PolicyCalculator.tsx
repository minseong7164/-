import React, { useState } from 'react';
import {
  Calculator,
  Building2,
  Briefcase,
  GraduationCap,
  HeartPulse,
  PhoneCall,
  ExternalLink,
  Coins,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Search
} from 'lucide-react';
import { REGIONAL_SETTLEMENT_FUNDS, RegionSettlementFund } from '../data/storyboardData';

export const PolicyCalculator: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('서울특별시');
  const [dischargeMonths, setDischargeMonths] = useState<number>(60); // 5 years = 60 months
  const [wantsHousingLoan, setWantsHousingLoan] = useState<boolean>(true);
  const [wantsJobSupport, setWantsJobSupport] = useState<boolean>(true);
  const [searchRegionTerm, setSearchRegionTerm] = useState<string>('');

  // Selected region fund object
  const currentRegionFund =
    REGIONAL_SETTLEMENT_FUNDS.find((r) => r.region === selectedRegion) ||
    REGIONAL_SETTLEMENT_FUNDS[0];

  // Calculations
  const allowancePerMonth = 50; // 50만원
  const totalAllowance = allowancePerMonth * dischargeMonths; // in 만원
  const settlementFund = currentRegionFund.numericAmount; // in 만원
  const jobSupportFund = wantsJobSupport ? 300 : 0; // 국민취업지원제도 50만 x 6개월 = 300만원
  const estimatedTotal = totalAllowance + settlementFund + jobSupportFund;

  const filteredRegions = REGIONAL_SETTLEMENT_FUNDS.filter((r) =>
    r.region.includes(searchRegionTerm)
  );

  return (
    <div className="space-y-8">
      {/* Header section */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-emerald-500/10 border border-amber-500/30 rounded-2xl p-6">
        <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1.5">
          <Coins className="w-4 h-4" />
          <span>자립준비청년 4대 핵심 지원 & 맞춤형 혜택 계산기</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          자립지원금 & 지자체별 혜택 종합 안내
        </h2>
        <p className="text-sm text-slate-300 mt-1 max-w-2xl">
          스토리보드 3구간(자립수당), 4구간(자립정착금), 5구간(종합지원), 6구간(의료·심리)의 정책 데이터를 바탕으로 내가 받을 수 있는 최대 지원금 총액을 계산합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Calculator (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-amber-400" />
                <span>나의 예상 자립지원금 시뮬레이터</span>
              </h3>
              <span className="text-xs text-amber-400 font-mono bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                2026년 기준 정책
              </span>
            </div>

            {/* Input 1: Region Selection */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-300">
                1. 거주(희망) 지자체 선택 (자립정착금 기준):
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              >
                {REGIONAL_SETTLEMENT_FUNDS.map((r) => (
                  <option key={r.region} value={r.region}>
                    {r.region} (정착금: {r.amount} / {r.disbursementType})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-400">
                * {currentRegionFund.region}: {currentRegionFund.amount} ({currentRegionFund.notes})
              </p>
            </div>

            {/* Input 2: Discharge Support Duration */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-300">
                  2. 자립수당 수령 기간 (월 50만원):
                </span>
                <span className="font-mono text-amber-400 font-bold">
                  {dischargeMonths}개월 ({Math.floor(dischargeMonths / 12)}년)
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="60"
                step="6"
                value={dischargeMonths}
                onChange={(e) => setDischargeMonths(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>1년 (12개월)</span>
                <span>3년 (36개월)</span>
                <span>최대 5년 (60개월)</span>
              </div>
            </div>

            {/* Input 3: Optional Programs */}
            <div className="space-y-2.5">
              <span className="block text-xs font-semibold text-slate-300">
                3. 추가 연계 지원 선택:
              </span>

              <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                <input
                  type="checkbox"
                  checked={wantsJobSupport}
                  onChange={(e) => setWantsJobSupport(e.target.checked)}
                  className="rounded accent-amber-500 w-4 h-4"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-200 block">
                    국민취업지원제도 1유형 구직촉진수당
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    월 50만 원 x 최대 6개월 (총 +300만 원)
                  </span>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer hover:border-slate-700 transition">
                <input
                  type="checkbox"
                  checked={wantsHousingLoan}
                  onChange={(e) => setWantsHousingLoan(e.target.checked)}
                  className="rounded accent-amber-500 w-4 h-4"
                />
                <div className="text-xs">
                  <span className="font-bold text-slate-200 block">
                    LH 청년 전세임대 1순위 우대 저리 융자
                  </span>
                  <span className="text-slate-400 text-[11px]">
                    최대 1.2억 원 보증금 융자 지원 (이자 연 1~2% 수준)
                  </span>
                </div>
              </label>
            </div>

            {/* Total Result Card */}
            <div className="bg-gradient-to-tr from-amber-500/20 via-orange-500/20 to-slate-950 p-5 rounded-2xl border border-amber-500/40 space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                나의 예상 총 정부 현금 지원금
              </span>

              <div className="flex items-baseline space-x-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {estimatedTotal.toLocaleString()}
                </span>
                <span className="text-lg font-bold text-amber-400">만 원</span>
                <span className="text-xs text-slate-400">
                  (약 {(estimatedTotal / 1000).toFixed(1)}천만 원)
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">자립수당</span>
                  <span className="font-bold text-slate-200">{totalAllowance.toLocaleString()}만</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">자립정착금</span>
                  <span className="font-bold text-amber-300">{settlementFund.toLocaleString()}만</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">구직촉진수당</span>
                  <span className="font-bold text-emerald-300">{jobSupportFund.toLocaleString()}만</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Regional Comparison Table (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <Coins className="w-5 h-5 text-amber-400" />
                  <span>전국 17개 시·도 자립정착금 비교</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  지역별 지원 금액 및 지급 방식 한눈에 보기
                </p>
              </div>

              {/* Search box */}
              <div className="relative w-36 sm:w-44">
                <input
                  type="text"
                  placeholder="지역 검색..."
                  value={searchRegionTerm}
                  onChange={(e) => setSearchRegionTerm(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-7 pr-2 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
              </div>
            </div>

            {/* Scrollable list */}
            <div className="max-h-[380px] overflow-y-auto space-y-2 pr-1">
              {filteredRegions.map((r) => (
                <div
                  key={r.region}
                  onClick={() => setSelectedRegion(r.region)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                    selectedRegion === r.region
                      ? 'bg-amber-500/15 border-amber-500 text-slate-100'
                      : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-white">{r.region}</span>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[11px]">
                        {r.amount}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {r.disbursementType} • {r.notes}
                    </p>
                  </div>
                  <span className="text-[11px] font-semibold text-amber-400 shrink-0 ml-2">
                    {selectedRegion === r.region ? '선택됨' : '선택'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Support Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center space-x-2">
          <ShieldCheck className="w-5 h-5 text-amber-400" />
          <span>자립준비청년 4대 핵심 생활 지원 제도</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Housing */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">주거 지원</h4>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>• LH 청년전세임대 1순위 (최대 1.2억 보증금 저리)</li>
              <li>• LH 청년매입임대 시세 30~50% 수준</li>
              <li>• 자립지원 전담기관 자립체험홈 운영</li>
              <li>• 청년월세 한시 특별지원 (월 최대 20만 원)</li>
            </ul>
          </div>

          {/* Employment */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Briefcase className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">취업 지원</h4>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>• 국민취업지원제도 1유형 구직수당 (월 50만원 x 6개월)</li>
              <li>• 자립준비청년 전담 고용복지플러스센터 연계</li>
              <li>• 청년도약계좌 정부 기여금 우대</li>
              <li>• 기업 인턴십 및 직업훈련 수강료 100% 지원</li>
            </ul>
          </div>

          {/* Education */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">교육 지원</h4>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>• 국가장학금 1유형 대학 등록금 전액 지원</li>
              <li>• 희망디딤돌 장학금 (학기당 생활비 200만 원)</li>
              <li>• 디딤씨앗통장(CDA) 정부 1:2 매칭 적립금 수령</li>
              <li>• 자격증 취득 및 어학 응시료 실비 환급</li>
            </ul>
          </div>

          {/* Health & Mentoring */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">의료·심리 지원</h4>
            <ul className="text-xs text-slate-300 space-y-1.5">
              <li>• 청년 마음건강지원 바우처 (3개월 10회 전문상담)</li>
              <li>• 의료급여 2종 자격 만 24세까지 연장</li>
              <li>• 1:1 맞춤형 전담 상담관 정기 방문 멘토링</li>
              <li>• 위기 청년 긴급 생계·의료비 긴급 복지 지원</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Emergency Contacts Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">
              도움이 필요할 때는 혼자 고민하지 말고 바로 연락하세요
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              자립지원 대표 콜센터 <strong>1522-3865</strong> • 보건복지상담센터 <strong>국번없이 129</strong> (24시간)
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <a
            href="https://jaripon.ncrc.or.kr"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 transition shadow"
          >
            <span>자립정보ON 공식 포털 접속</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
};
