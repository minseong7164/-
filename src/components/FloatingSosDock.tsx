import React from 'react';
import { PhoneCall, Phone, ShieldCheck, HeartPulse } from 'lucide-react';

interface FloatingSosDockProps {
  onOpenHotlines: () => void;
}

export const FloatingSosDock: React.FC<FloatingSosDockProps> = ({ onOpenHotlines }) => {
  return (
    <aside
      aria-label="긴급 지원 및 전화 상담 핫라인"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-stone-900/90 hover:bg-stone-900 text-white backdrop-blur-md px-4 py-2.5 rounded-full border border-stone-700/80 shadow-2xl flex items-center space-x-3 transition-all duration-200"
    >
      <div className="flex items-center space-x-2 border-r border-stone-700 pr-3">
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-xs font-bold text-amber-300 hidden sm:inline">
          어려움이 생겼을 땐 혼자 고민하지 마세요
        </span>
        <span className="text-xs font-bold text-amber-300 sm:hidden">
          긴급 상담
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <a
          href="tel:15223865"
          className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-1.5 transition shadow-xs"
        >
          <Phone className="w-3 h-3" />
          <span>1522-3865</span>
        </a>

        <button
          onClick={onOpenHotlines}
          className="px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition"
        >
          전체 핫라인
        </button>
      </div>
    </aside>
  );
};
