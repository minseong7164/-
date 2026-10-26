import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Search,
  Sparkles,
  PhoneCall,
  User,
  ShieldCheck
} from 'lucide-react';
import { FAQS_DATA } from '../data/faqData';

export const ConversationalFaq: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchWord, setSearchWord] = useState<string>('');

  const categories = ['전체', '수당·금융', '주거·부동산', '보호연장·자격', '취업·학업', '위기·긴급'];

  const filteredFaqs = useMemo(() => {
    return FAQS_DATA.filter((faq) => {
      if (selectedCategory !== '전체' && faq.category !== selectedCategory) {
        return false;
      }
      if (!searchWord.trim()) return true;
      const q = searchWord.toLowerCase();
      return (
        faq.question.toLowerCase().includes(q) ||
        faq.shortAnswer.toLowerCase().includes(q) ||
        faq.fullAnswer.some((a) => a.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchWord]);

  return (
    <section id="faq" className="space-y-6 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Real Q&A
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            선배와 상담사가 답하는 실전 생존 Q&A
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            청년들이 가장 많이 겪는 불안과 의문점들에 대해 법적 근거와 현장 경험을 바탕으로 솔직하게 답합니다.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-60">
          <input
            type="text"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            placeholder="Q&A 검색 (알바, 전세, 수당)..."
            className="w-full bg-white border border-stone-300 rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-emerald-600"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Categories Bar */}
      <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition border ${
              selectedCategory === c
                ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                : 'bg-white border-stone-200 text-stone-600 hover:bg-stone-50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Conversational Dialogues Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filteredFaqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white rounded-3xl p-6 border border-stone-200 shadow-md shadow-stone-200/40 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3.5">
              {/* Question Bubble */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 border border-amber-200">
                  <User className="w-4 h-4" />
                </div>
                <div className="bg-amber-50/80 border border-amber-200/70 p-3.5 rounded-2xl rounded-tl-none space-y-1">
                  <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider block">
                    {faq.category} 질문
                  </span>
                  <h3 className="font-extrabold text-sm sm:text-base text-stone-900 leading-snug">
                    {faq.question}
                  </h3>
                </div>
              </div>

              {/* Answer Bubble */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 shadow-xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="bg-stone-50 border border-stone-200/80 p-4 rounded-2xl rounded-tl-none space-y-3 flex-1">
                  {/* Highlight Direct Answer */}
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs sm:text-sm font-bold text-emerald-900 flex items-start space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{faq.shortAnswer}</span>
                  </div>

                  {/* Detailed points */}
                  <div className="space-y-1.5 text-xs text-stone-700 leading-relaxed">
                    {faq.fullAnswer.map((point, idx) => (
                      <p key={idx} className="flex items-start space-x-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{point}</span>
                      </p>
                    ))}
                  </div>

                  {/* Practical Action Tip */}
                  {faq.actionTips && (
                    <div className="pt-2 border-t border-stone-200/70 text-[11px] text-amber-800 font-medium">
                      💡 <strong>실전 팁:</strong> {faq.actionTips}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
