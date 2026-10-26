import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Phone,
  FileText,
  CheckCircle2,
  Copy,
  Check,
  Building,
  Coins,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { PolicyItem } from '../data/policyData';

interface PolicyDetailModalProps {
  policy: PolicyItem;
  onClose: () => void;
}

export const PolicyDetailModal: React.FC<PolicyDetailModalProps> = ({ policy, onClose }) => {
  const [copiedDocs, setCopiedDocs] = useState(false);

  const copyDocumentsList = () => {
    const text = policy.howToApply.documents.map((d, i) => `${i + 1}. ${d}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedDocs(true);
    setTimeout(() => setCopiedDocs(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-slate-950/80 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                {policy.category}
              </span>
              {policy.isEssential && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3" />
                  <span>필수 혜택</span>
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {policy.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
              {policy.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {/* Benefit Highlight Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-slate-950 border border-amber-500/40 space-y-1">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">
              지원 금액 및 핵심 혜택
            </span>
            <div className="text-lg sm:text-xl font-extrabold text-white">
              {policy.amountOrBenefit}
            </div>
            <p className="text-xs text-slate-300 pt-1 border-t border-slate-800/80 mt-2">
              {policy.summary}
            </p>
          </div>

          {/* Key Details */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>상세 지원 내용</span>
            </h4>
            <div className="space-y-2 bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
              {policy.details.map((detail, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{detail}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>신청 대상 및 자격 조건</span>
            </h4>
            <div className="space-y-1.5 bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80">
              {policy.eligibility.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2 text-xs sm:text-sm text-slate-300">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How to Apply & Required Documents */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>신청 방법 및 구비 서류</span>
              </h4>
              <button
                type="button"
                onClick={copyDocumentsList}
                className="text-xs text-slate-400 hover:text-amber-300 flex items-center space-x-1 transition"
              >
                {copiedDocs ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedDocs ? '서류 목록 복사됨' : '준비 서류 복사'}</span>
              </button>
            </div>

            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 space-y-3 text-xs sm:text-sm">
              <div className="flex items-start space-x-2">
                <Building className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">신청처: </span>
                  <span className="text-slate-300">{policy.howToApply.channel}</span>
                </div>
              </div>

              {policy.howToApply.phone && (
                <div className="flex items-start space-x-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white">문의 전화: </span>
                    <span className="text-emerald-300 font-bold">{policy.howToApply.phone}</span>
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-slate-800/80">
                <span className="font-semibold text-slate-300 block mb-1.5">
                  필수 제출 서류:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {policy.howToApply.documents.map((doc, idx) => (
                    <div
                      key={idx}
                      className="px-2.5 py-1.5 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-200 flex items-center space-x-2"
                    >
                      <span className="w-4 h-4 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center text-[10px] font-bold">
                        {idx + 1}
                      </span>
                      <span className="truncate">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>신청 시 본인 신분증을 반드시 지참하세요.</span>
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            {policy.howToApply.websiteUrl && (
              <a
                href={policy.howToApply.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center space-x-1.5 transition shadow"
              >
                <span>{policy.howToApply.websiteName || '공식 신청 사이트 바로가기'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
