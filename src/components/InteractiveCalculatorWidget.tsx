import React, { useState } from 'react';
import {
  Calculator,
  Coins,
  Check,
  Copy,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  CheckCircle2
} from 'lucide-react';
import { REGIONAL_CENTERS_DATA } from '../data/regionalData';

interface InteractiveCalculatorWidgetProps {
  selectedRegion: string;
  onSelectRegion: (region: string) => void;
}

export const InteractiveCalculatorWidget: React.FC<InteractiveCalculatorWidgetProps> = ({
  selectedRegion,
  onSelectRegion,
}) => {
  const [allowanceMonths, setAllowanceMonths] = useState<number>(60);
  const [includeRentSupport, setIncludeRentSupport] = useState<boolean>(true); // 월 20만 x 12개월 = 240만
  const [includeJobSupport, setIncludeJobSupport] = useState<boolean>(true); // 구직수당 300만
  const [includeScholarship, setIncludeScholarship] = useState<boolean>(false); // 장학금 800만
  const [copiedReceipt, setCopiedReceipt] = useState<boolean>(false);

  const regionInfo =
    REGIONAL_CENTERS_DATA.find((r) => r.region === selectedRegion) ||
    REGIONAL_CENTERS_DATA[0];

  const allowanceTotal = 50 * allowanceMonths;
  const settlementFund = regionInfo.numericFund;
  const rentTotal = includeRentSupport ? 240 : 0;
  const jobTotal = includeJobSupport ? 300 : 0;
  const scholarshipTotal = includeScholarship ? 800 : 0;

  const grandTotal = allowanceTotal + settlementFund + rentTotal + jobTotal + scholarshipTotal;

  const copyReceiptText = () => {
    const text = `[자립ON 나의 예상 지원금 명세서]
- 거주 지역: ${selectedRegion}
- 자립수당: 월 50만 원 x ${allowanceMonths}개월 = ${allowanceTotal.toLocaleString()}만 원
- 자립정착금: ${settlementFund.toLocaleString()}만 원 (${regionInfo.disbursementPlan})
${includeRentSupport ? `- 청년월세 특별지원: 240만 원\n` : ''}${includeJobSupport ? `- 국민취업지원제도 구직촉진수당: 300만 원\n` : ''}${includeScholarship ? `- 대학 국가장학금: 800만 원\n` : ''}---------------------------------
총 정부 지원 예상액: ${grandTotal.toLocaleString()}만 원 (약 ${(grandTotal / 1000).toFixed(1)}천만 원)
* LH 청년전세임대(최대 1.2억 원 저리융자) 별도 지원`;

    navigator.clipboard.writeText(text);
    setCopiedReceipt(true);
    setTimeout(() => setCopiedReceipt(false), 2000);
  };

  return (
    <section id="calculator" className="space-y-6 pt-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Benefit Calculator
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            내 맞춤형 자립 지원금 시뮬레이터
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            거주 지역과 계획에 맞추어 받을 수 있는 현금 수당과 감면 혜택 총액을 실시간으로 산출합니다.
          </p>
        </div>

        <button
          onClick={copyReceiptText}
          className="px-3.5 py-1.5 rounded-xl bg-white border border-stone-300 text-stone-700 hover:text-stone-900 text-xs font-semibold flex items-center space-x-1.5 transition shadow-2xs self-start sm:self-auto"
        >
          {copiedReceipt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedReceipt ? '명세서 복사됨' : '명세서 복사하기'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md shadow-stone-200/40 space-y-6">
          {/* Input 1: Region */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              1. 거주(희망) 지자체 선택 (자립정착금 기준)
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => onSelectRegion(e.target.value)}
              className="w-full bg-stone-50 border border-stone-300 rounded-2xl p-3.5 text-sm font-bold text-stone-900 focus:outline-none focus:border-emerald-600 cursor-pointer"
            >
              {REGIONAL_CENTERS_DATA.map((r) => (
                <option key={r.region} value={r.region}>
                  {r.region} (정착금: {r.settlementFund} • {r.disbursementPlan})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-stone-500">
              * {selectedRegion}: {regionInfo.settlementFund} ({regionInfo.disbursementPlan})
            </p>
          </div>

          {/* Input 2: Allowance duration */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-stone-700 uppercase tracking-wider">
                2. 자립수당 수령 기간 (월 50만 원)
              </span>
              <span className="font-mono font-bold text-emerald-700">
                {allowanceMonths}개월 ({Math.floor(allowanceMonths / 12)}년) = {allowanceTotal.toLocaleString()}만 원
              </span>
            </div>
            <input
              type="range"
              min="12"
              max="60"
              step="6"
              value={allowanceMonths}
              onChange={(e) => setAllowanceMonths(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-mono text-stone-400">
              <span>1년 (12개월)</span>
              <span>3년 (36개월)</span>
              <span>최대 5년 (60개월)</span>
            </div>
          </div>

          {/* Input 3: Additional checks */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">
              3. 추가 연계 지원 선택
            </label>

            <label className="flex items-center space-x-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer hover:bg-stone-100/70 transition">
              <input
                type="checkbox"
                checked={includeRentSupport}
                onChange={(e) => setIncludeRentSupport(e.target.checked)}
                className="w-4 h-4 rounded accent-emerald-600"
              />
              <div className="text-xs">
                <span className="font-bold text-stone-900 block">청년월세 한시 특별지원</span>
                <span className="text-stone-500 text-[11px]">월 20만 원 x 12개월 (총 +240만 원)</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer hover:bg-stone-100/70 transition">
              <input
                type="checkbox"
                checked={includeJobSupport}
                onChange={(e) => setIncludeJobSupport(e.target.checked)}
                className="w-4 h-4 rounded accent-emerald-600"
              />
              <div className="text-xs">
                <span className="font-bold text-stone-900 block">국민취업지원제도 1유형 구직촉진수당</span>
                <span className="text-stone-500 text-[11px]">월 50만 원 x 6개월 (총 +300만 원)</span>
              </div>
            </label>

            <label className="flex items-center space-x-3 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 cursor-pointer hover:bg-stone-100/70 transition">
              <input
                type="checkbox"
                checked={includeScholarship}
                onChange={(e) => setIncludeScholarship(e.target.checked)}
                className="w-4 h-4 rounded accent-emerald-600"
              />
              <div className="text-xs">
                <span className="font-bold text-stone-900 block">대학 국가장학금 등록금 100% 면제</span>
                <span className="text-stone-500 text-[11px]">연 약 800만 원 학비 전액 감면 (대학생 대상)</span>
              </div>
            </label>
          </div>
        </div>

        {/* Right Live Receipt (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-stone-900 to-stone-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col justify-between">
          <div className="space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                나의 맞춤 수혜 명세서
              </span>
              <span className="text-[11px] font-mono text-stone-400">
                {selectedRegion}
              </span>
            </div>

            <div>
              <span className="text-xs text-stone-400 block mb-1">
                총 예상 정부 지원 규모
              </span>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  {grandTotal.toLocaleString()}
                </span>
                <span className="text-xl font-bold text-amber-400">만 원</span>
              </div>
              <span className="text-xs text-stone-400 mt-1 block">
                약 {(grandTotal / 1000).toFixed(1)}천만 원 상당
              </span>
            </div>

            {/* Receipt Items */}
            <div className="space-y-2 pt-2 border-t border-stone-800 text-xs">
              <div className="flex justify-between">
                <span className="text-stone-400">자립수당 ({allowanceMonths}개월)</span>
                <span className="font-bold font-mono">{allowanceTotal.toLocaleString()}만 원</span>
              </div>

              <div className="flex justify-between">
                <span className="text-stone-400">{regionInfo.regionShort} 자립정착금</span>
                <span className="font-bold text-amber-300 font-mono">{settlementFund.toLocaleString()}만 원</span>
              </div>

              {includeRentSupport && (
                <div className="flex justify-between">
                  <span className="text-stone-400">청년월세 특별지원</span>
                  <span className="font-bold font-mono">+240만 원</span>
                </div>
              )}

              {includeJobSupport && (
                <div className="flex justify-between">
                  <span className="text-stone-400">구직촉진수당</span>
                  <span className="font-bold text-emerald-300 font-mono">+300만 원</span>
                </div>
              )}

              {includeScholarship && (
                <div className="flex justify-between">
                  <span className="text-stone-400">대학 국가장학금</span>
                  <span className="font-bold text-sky-300 font-mono">+800만 원</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-stone-800 space-y-2">
            <button
              onClick={copyReceiptText}
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 transition"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedReceipt ? '복사 완료!' : '명세서 텍스트 복사'}</span>
            </button>
            <p className="text-[10px] text-stone-500 text-center">
              * 실제 지급액은 지자체 조례 및 신청 시점 정책에 따라 다를 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
