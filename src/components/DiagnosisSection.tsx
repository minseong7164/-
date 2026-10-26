import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle,
  Coins,
  Building,
  Briefcase,
  HeartPulse,
  GraduationCap,
  ArrowRight,
  RotateCcw,
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { REGIONAL_CENTERS_DATA } from '../data/regionalData';

export const DiagnosisSection: React.FC = () => {
  // Step selections
  const [step, setStep] = useState<number>(1);
  const [protectionStatus, setProtectionStatus] = useState<string>('early'); // 'pre' | 'early' | 'mid' | 'post'
  const [selectedRegion, setSelectedRegion] = useState<string>('서울특별시');
  const [activityStatus, setActivityStatus] = useState<string>('job-seeker'); // 'student' | 'job-seeker' | 'worker' | 'exploring'
  const [primaryConcern, setPrimaryConcern] = useState<string>('housing'); // 'housing' | 'finance' | 'career' | 'mental'
  const [showResult, setShowResult] = useState<boolean>(false);

  // Region settlement money
  const regionInfo =
    REGIONAL_CENTERS_DATA.find((r) => r.region === selectedRegion) ||
    REGIONAL_CENTERS_DATA[0];

  // Calculation
  const allowancePerMonth = 50;
  const remainingAllowanceMonths =
    protectionStatus === 'pre'
      ? 60
      : protectionStatus === 'early'
      ? 48
      : protectionStatus === 'mid'
      ? 24
      : 0;

  const totalAllowance = allowancePerMonth * remainingAllowanceMonths; // 만원
  const settlementFund =
    protectionStatus === 'pre' || protectionStatus === 'early'
      ? regionInfo.numericFund
      : 0;

  const jobFund = activityStatus === 'job-seeker' ? 300 : 0; // 국민취업지원제도 300만원
  const totalCashEstimate = totalAllowance + settlementFund + jobFund;

  const handleComplete = () => {
    setShowResult(true);
  };

  const handleRestart = () => {
    setStep(1);
    setShowResult(false);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-500/15 via-orange-500/10 to-rose-500/10 border border-amber-500/30 rounded-3xl p-6 sm:p-8">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>나의 맞춤형 자립 지원금 & 우선 신청 제도 진단기</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            간단한 4가지 질문으로 내 혜택 확인하기
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            현재 보호 상태, 거주 지역, 현재 주 활동, 가장 시급한 고민을 선택하면 내가 받을 수 있는 총 현금 지원금과 <strong>지금 당장 신청해야 하는 우선 제도 TOP 3</strong>를 바로 진단해 드립니다.
          </p>
        </div>
      </div>

      {!showResult ? (
        /* Wizard Steps Card */
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto space-y-6 shadow-xl">
          {/* Progress Indicators */}
          <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pb-4 border-b border-slate-800">
            <span>질문 {step} / 4</span>
            <div className="flex space-x-1.5">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-6 h-1.5 rounded-full transition-all ${
                    step >= i ? 'bg-amber-500' : 'bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Question 1: Protection Status */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  Step 1
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  현재 청년분의 보호 상태는 어떻게 되나요?
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  자립수당 및 정착금 수령 가능 여부의 기준이 됩니다.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    id: 'pre',
                    title: '보호종료 예정 (퇴소 전)',
                    desc: '만 18세 이상이며 곧 시설/가정위탁 퇴소를 앞두고 있어요.'
                  },
                  {
                    id: 'early',
                    title: '보호종료 1~2년 차 (초기 자립)',
                    desc: '퇴소한 지 1~2년 이내이며 현재 독립 거주 중이에요.'
                  },
                  {
                    id: 'mid',
                    title: '보호종료 3~5년 차 (자립 안정기)',
                    desc: '퇴소한 지 3~5년 차이며 수당 수령 만료를 앞두고 있어요.'
                  },
                  {
                    id: 'post',
                    title: '보호종료 5년 초과 또는 만 24세 이상',
                    desc: '보호종료 5년이 지났지만 추가 주거/취업 지원을 찾고 있어요.'
                  }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setProtectionStatus(opt.id);
                      setStep(2);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                      protectionStatus === opt.id
                        ? 'bg-amber-500/15 border-amber-500 text-white'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm block">{opt.title}</span>
                      <span className="text-xs text-slate-400">{opt.desc}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Question 2: Region */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  Step 2
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  거주 중이거나 독립할 지역을 선택해주세요.
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  지자체별 자립정착금(1,000만~2,000만원) 산정 기준입니다.
                </p>
              </div>

              <div className="space-y-2">
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
                >
                  {REGIONAL_CENTERS_DATA.map((r) => (
                    <option key={r.region} value={r.region}>
                      {r.region} (자립정착금: {r.settlementFund})
                    </option>
                  ))}
                </select>

                <p className="text-xs text-amber-300/90 p-3 rounded-xl bg-slate-950 border border-slate-800">
                  선택한 <strong className="text-white">{selectedRegion}</strong>의 자립정착금은{' '}
                  <strong className="text-amber-400">{regionInfo.settlementFund}</strong>이며, {regionInfo.disbursementPlan} 방식으로 지급됩니다.
                </p>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  이전
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400"
                >
                  다음 질문
                </button>
              </div>
            </div>
          )}

          {/* Question 3: Activity Status */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  Step 3
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  현재 주로 어떤 활동을 하고 계신가요?
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  학업 장학금 및 구직수당 연계를 확인합니다.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    id: 'job-seeker',
                    title: '취업준비 / 자격증 공부 중',
                    desc: '국민취업지원제도 1유형(구직수당 월 50만 x 6개월) 1순위 대상'
                  },
                  {
                    id: 'student',
                    title: '대학(전문대) 재학 중',
                    desc: '국가장학금 등록금 100% 전액 지원 및 생활비 장학금 대상'
                  },
                  {
                    id: 'worker',
                    title: '직장인 / 아르바이트 근무 중',
                    desc: '자립두배통장 등 자산 형성 및 소득 공제 제도 연계'
                  },
                  {
                    id: 'exploring',
                    title: '진로 탐색 중 / 잠시 휴식 중',
                    desc: '1:1 맞춤형 진로 멘토링 및 마음건강 바우처 연계'
                  }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setActivityStatus(opt.id);
                      setStep(4);
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                      activityStatus === opt.id
                        ? 'bg-amber-500/15 border-amber-500 text-white'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm block">{opt.title}</span>
                      <span className="text-xs text-slate-400">{opt.desc}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 ml-2" />
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  이전
                </button>
              </div>
            </div>
          )}

          {/* Question 4: Primary Concern */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                  Step 4
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  지금 가장 해결하고 싶은 고민 1순위는?
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  청년님께 가장 시급한 솔루션 TOP 3를 추천해 드립니다.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  { id: 'housing', title: '주거 (보증금 마련, 안전한 원룸/전세 구하기)' },
                  { id: 'finance', title: '생활비 & 목돈 저축 (월세/공과금 부담, 자산 형성)' },
                  { id: 'career', title: '취업 & 자격증 (이력서, 면접, 취업 알선)' },
                  { id: 'mental', title: '마음 건강 & 혼자라는 외로움 (심리상담, 멘토)' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setPrimaryConcern(opt.id);
                      handleComplete();
                    }}
                    className={`w-full p-4 rounded-2xl border text-left transition flex items-center justify-between ${
                      primaryConcern === opt.id
                        ? 'bg-amber-500/15 border-amber-500 text-white'
                        : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="font-bold text-sm">{opt.title}</span>
                    <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 ml-2" />
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setStep(3)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  이전
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Diagnosis Result Card */
        <div className="bg-slate-900/95 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 max-w-3xl mx-auto shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-4 h-4" />
                <span>맞춤 진단 완료 리포트</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {selectedRegion} 거주 청년 맞춤 복지 솔루션
              </h3>
            </div>

            <button
              onClick={handleRestart}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center space-x-1.5 transition"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>다시 진단하기</span>
            </button>
          </div>

          {/* Cash Estimation Hero */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-slate-950 border border-amber-500/50 space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              내가 수령 가능한 예상 정부 현금 지원금
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {totalCashEstimate.toLocaleString()}
              </span>
              <span className="text-xl font-bold text-amber-400">만 원</span>
              <span className="text-xs text-slate-400">
                (약 {(totalCashEstimate / 1000).toFixed(1)}천만 원 규모)
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">자립수당</span>
                <span className="font-bold text-slate-200">{totalAllowance.toLocaleString()}만 원</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">{selectedRegion} 정착금</span>
                <span className="font-bold text-amber-300">{settlementFund.toLocaleString()}만 원</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">구직/취업수당</span>
                <span className="font-bold text-emerald-300">{jobFund.toLocaleString()}만 원</span>
              </div>
            </div>
          </div>

          {/* Top 3 Recommended Next Actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>지금 당장 신청해야 하는 우선 추천 정책 TOP 3</span>
            </h4>

            <div className="space-y-3">
              {/* Rec 1 */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3.5">
                <div className="w-7 h-7 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                  1
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-white">
                      {remainingAllowanceMonths > 0 ? '자립수당 신청 (매월 50만 원)' : '청년월세 특별지원 (월 20만 원)'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300">
                      현금 생활안정
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {remainingAllowanceMonths > 0
                      ? '보호종료 후 5년 동안 전액 현금 지급되는 가장 기본 권리입니다. 주민센터나 복지로에서 신청하세요.'
                      : '자립수당이 종료된 경우 정부 청년월세 특별지원으로 주거비 부담을 줄일 수 있습니다.'}
                  </p>
                </div>
              </div>

              {/* Rec 2 */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3.5">
                <div className="w-7 h-7 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                  2
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-white">
                      LH 청년 전세임대 1순위 수시 신청
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300">
                      안심 주거
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    수도권 최대 1.2억 원 보증금에 대해 연 1~2% 수준의 저렴한 이자만 납부하며 안정적으로 거주할 수 있습니다.
                  </p>
                </div>
              </div>

              {/* Rec 3 */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start space-x-3.5">
                <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5">
                  3
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-white">
                      {activityStatus === 'student'
                        ? '국가장학금 1유형 등록금 전액 감면'
                        : activityStatus === 'job-seeker'
                        ? '국민취업지원제도 1유형 (구직수당 월 50만 x 6개월)'
                        : '청년 마음건강지원 바우처 (10회 1:1 심리상담)'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                      진로 & 역량
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    {activityStatus === 'student'
                      ? '한국장학재단 성적 기준 특례가 적용되어 학업 기간 동안 등록금 전액을 지원받습니다.'
                      : activityStatus === 'job-seeker'
                      ? '취업 준비 기간 동안 월 50만 원의 구직수당을 받으며 이력서와 면접 코칭을 받습니다.'
                      : '전문 심리상담사와 1:1로 만나 일상의 스트레스와 불안감을 털어놓을 수 있습니다.'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Direct Call Card */}
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-bold text-white block">
                {selectedRegion} 전담 상담관 1:1 매칭
              </span>
              <span className="text-slate-400">
                {regionInfo.centerName} ({regionInfo.phone})
              </span>
            </div>
            <a
              href={`tel:${regionInfo.phone.replace(/-/g, '')}`}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition text-center"
            >
              전담기관 전화상담
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
