import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  Sparkles,
  Info,
  ShieldCheck,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { FAQS_DATA, FaqItem } from '../data/faqData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQS_DATA[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['전체', '수당·금융', '주거·부동산', '보호연장·자격', '취업·학업', '위기·긴급'];

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      if (selectedCategory !== '전체' && faq.category !== selectedCategory) {
        return false;
      }
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase();
      return (
        faq.question.toLowerCase().includes(q) ||
        faq.shortAnswer.toLowerCase().includes(q) ||
        faq.fullAnswer.some((a) => a.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-500/15 via-indigo-500/10 to-slate-900 border border-purple-500/30 rounded-3xl p-6 sm:p-8">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center space-x-2 text-purple-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" />
            <span>자립준비청년 가장 많이 묻는 질문 & 생존 가이드</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            자주 묻는 질문(FAQ) & 꿀팁 백과
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            "알바하면 자립수당 깎이나요?", "전세 사기는 어떻게 피하나요?", "만 24세까지 보호연장은 어떻게 하나요?" 등 자립준비청년들이 현장에서 가장 궁금해하는 질문들에 명쾌하고 정확하게 답해 드립니다.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === c
                  ? 'bg-amber-500 text-slate-950 font-bold shadow'
                  : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="질문 검색 (예: 알바, 전세, 수당)..."
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className={`rounded-2xl border transition overflow-hidden ${
                isOpen
                  ? 'bg-slate-900 border-amber-500/50 shadow-lg'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(faq.id)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4"
              >
                <div className="space-y-1 pr-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-950 text-amber-400 border border-slate-800">
                      {faq.category}
                    </span>
                    <span className="text-xs font-extrabold text-amber-500">Q.</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {faq.question}
                  </h3>
                </div>

                <div
                  className={`p-1.5 rounded-xl bg-slate-800 text-slate-400 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-amber-400 bg-amber-500/20' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-5 sm:px-5 sm:pb-6 space-y-4 border-t border-slate-800/80 pt-4">
                  {/* Short answer summary banner */}
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-200 font-bold leading-relaxed flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{faq.shortAnswer}</span>
                  </div>

                  {/* Detailed points */}
                  <div className="space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800/60">
                    {faq.fullAnswer.map((para, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <span className="text-amber-400 font-bold">•</span>
                        <span>{para}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action tips */}
                  {faq.actionTips && (
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 flex items-start space-x-2">
                      <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-200">실전 조언: </strong>
                        {faq.actionTips}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {filteredFaqs.length === 0 && (
          <div className="py-12 text-center bg-slate-900/40 rounded-2xl border border-slate-800 text-slate-400 text-xs">
            일치하는 질문을 찾지 못했습니다. 자립지원 콜센터(1522-3865)로 직접 질문하실 수 있습니다.
          </div>
        )}
      </div>

      {/* Still Have Questions Banner */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">
              더 궁금한 점이 있으신가요?
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              혼자 고민하지 마세요. 자립지원 전담 상담관이 언제나 따뜻하게 경청합니다.
            </p>
          </div>
        </div>

        <a
          href="tel:15223865"
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition shrink-0"
        >
          1522-3865 전화 연결
        </a>
      </div>
    </div>
  );
};
