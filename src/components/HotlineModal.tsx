import React from 'react';
import { X, Phone, PhoneCall, Clock, ShieldCheck, Building2 } from 'lucide-react';
import { EMERGENCY_HOTLINES, REGIONAL_CENTERS_DATA } from '../data/regionalData';

interface HotlineModalProps {
  onClose: () => void;
}

export const HotlineModal: React.FC<HotlineModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-white text-base sm:text-lg">
                자립준비청년 긴급 핫라인 & 공식 연락망
              </h3>
              <p className="text-xs text-slate-400">
                도움이 필요할 때 언제든 무료로 전화상담을 받을 수 있습니다.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-200">
          {/* Main Hotlines */}
          <div className="space-y-2.5">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              전국 대표 핫라인
            </span>
            <div className="space-y-2">
              {EMERGENCY_HOTLINES.map((h, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white text-sm">{h.name}</span>
                      <span className="text-[11px] text-amber-400 font-mono font-bold">
                        {h.number}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">{h.description}</p>
                    <span className="text-slate-500 text-[10px] block font-mono">
                      운영시간: {h.hours}
                    </span>
                  </div>

                  <a
                    href={`tel:${h.number.replace(/[^0-9]/g, '')}`}
                    className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition shrink-0"
                  >
                    통화연결
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Regional Dedicated Centers Quick List */}
          <div className="space-y-2.5 pt-3 border-t border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              전국 17개 시·도 자립지원전담기관 직통 전화
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {REGIONAL_CENTERS_DATA.map((r) => (
                <div
                  key={r.region}
                  className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-white block">{r.region}</span>
                    <span className="text-slate-400 font-mono text-[11px]">{r.phone}</span>
                  </div>
                  <a
                    href={`tel:${r.phone.replace(/-/g, '')}`}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold transition"
                  >
                    연결
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
