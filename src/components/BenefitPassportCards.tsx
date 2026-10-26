import React, { useState } from 'react';
import {
  Coins,
  Building,
  Briefcase,
  HeartPulse,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  ExternalLink,
  ChevronDown,
  Info
} from 'lucide-react';
import { POLICIES_DATABASE, PolicyItem } from '../data/policyData';
import { PolicyDetailModal } from './PolicyDetailModal';

export const BenefitPassportCards: React.FC = () => {
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyItem | null>(null);

  // 4 Core Passports
  const passports = [
    {
      id: 'jarip-allowance',
      badge: '기본 소득 패스포트',
      title: '자립수당',
      bigNumber: '월 50만 원',
      subText: '5년간 총 3,000만 원 (매월 20일 입금)',
      accentColor: 'emerald',
      bgGradient: 'from-emerald-50 via-teal-50/50 to-white',
      borderColor: 'border-emerald-300',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      tagIcon: Coins,
      highlights: [
        '알바나 취업으로 소득이 생겨도 전액 100% 지급',
        '보호종료 후 5년(60개월) 동안 계좌로 직접 입금',
        '퇴소 30일 전부터 주민센터 또는 복지로 사전 신청 가능'
      ],
      ctaText: '자립수당 신청 요건 & 서류 보기'
    },
    {
      id: 'lh-youth-lease',
      badge: '안심 주거 패스포트',
      title: 'LH 청년 전세임대 1순위',
      bigNumber: '최대 1.2억 원',
      subText: '보증금 지원 (연 1~2% 저리 / 월세 절감)',
      accentColor: 'sky',
      bgGradient: 'from-sky-50 via-blue-50/50 to-white',
      borderColor: 'border-sky-300',
      badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
      tagIcon: Building,
      highlights: [
        '자립준비청년 전용 1순위 우대 선정',
        '내가 살고 싶은 원룸/빌라/오피스텔 직접 선택',
        '정부 청년월세 특별지원(월 20만 원)과 중복 연계 가능'
      ],
      ctaText: 'LH 전세임대 지원 가이드 보기'
    },
    {
      id: 'k-job-support',
      badge: '일자리 도약 패스포트',
      title: '국민취업지원제도 1유형',
      bigNumber: '최대 450만 원',
      subText: '구직수당 300만원 + 취업성공수당 150만원',
      accentColor: 'indigo',
      bgGradient: 'from-indigo-50 via-purple-50/50 to-white',
      borderColor: 'border-indigo-300',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
      tagIcon: Briefcase,
      highlights: [
        '소득 심사 면제 특례(특정계층)로 1순위 최우선 선발',
        '자립수당(월 50만)과 중복 수령 가능 (총 월 100만 원)',
        '1:1 전담 취업 상담사 배정, 이력서 첨삭 및 면접 코칭'
      ],
      ctaText: '구직촉진수당 신청법 보기'
    },
    {
      id: 'mental-health-voucher',
      badge: '마음건강 패스포트',
      title: '청년 마음건강지원 바우처',
      bigNumber: '10회 전액 무료',
      subText: '1:1 전문 심리상담 바우처 (회당 7만원 상당)',
      accentColor: 'rose',
      bgGradient: 'from-rose-50 via-orange-50/50 to-white',
      borderColor: 'border-rose-300',
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
      tagIcon: HeartPulse,
      highlights: [
        '자립준비청년은 소득 기준 무관 1순위 최우선 배정',
        '불안, 우울, 대인관계, 진로 고민을 1:1 비밀 보장 상담',
        '만 24세까지 의료급여 2종 자격 연장으로 병원비 감면'
      ],
      ctaText: '무료 심리상담 이용법 보기'
    }
  ];

  const handleOpenPassport = (policyId: string) => {
    const item = POLICIES_DATABASE.find((p) => p.id === policyId);
    if (item) {
      setSelectedPolicy(item);
    }
  };

  return (
    <section id="passports" className="space-y-6 pt-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Core Benefits
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            홀로서기 4대 핵심 패스포트
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            자립준비청년이라면 조건 없이 누릴 수 있는 가장 중요한 4가지 필수 지원 제도입니다.
          </p>
        </div>

        <span className="text-xs font-mono text-stone-400">
          모든 청년 필수 혜택 4종
        </span>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {passports.map((p) => {
          const Icon = p.tagIcon;
          return (
            <div
              key={p.id}
              onClick={() => handleOpenPassport(p.id)}
              className={`group bg-gradient-to-b ${p.bgGradient} rounded-3xl p-6 border ${p.borderColor} shadow-md shadow-stone-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer flex flex-col justify-between relative overflow-hidden`}
            >
              {/* Top Badge */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${p.badgeColor}`}>
                    {p.badge}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-white shadow-2xs border border-stone-200/60 flex items-center justify-center text-stone-700 group-hover:scale-110 transition">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-stone-900 tracking-tight group-hover:text-emerald-700 transition">
                    {p.title}
                  </h3>
                  <div className="mt-2">
                    <span className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight block">
                      {p.bigNumber}
                    </span>
                    <span className="text-xs font-medium text-stone-600 block mt-0.5">
                      {p.subText}
                    </span>
                  </div>
                </div>

                {/* Highlights List */}
                <div className="space-y-1.5 pt-3 border-t border-stone-200/70 text-xs text-stone-700">
                  {p.highlights.map((h, i) => (
                    <div key={i} className="flex items-start space-x-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-tight">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-4 mt-4 border-t border-stone-200/80 flex items-center justify-between text-xs font-bold text-stone-900 group-hover:text-emerald-700">
                <span>{p.ctaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {selectedPolicy && (
        <PolicyDetailModal
          policy={selectedPolicy}
          onClose={() => setSelectedPolicy(null)}
        />
      )}
    </section>
  );
};
