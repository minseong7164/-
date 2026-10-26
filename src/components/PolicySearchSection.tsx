import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  Filter,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Building,
  Coins,
  GraduationCap,
  Briefcase,
  HeartPulse,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { POLICIES_DATABASE, PolicyItem } from '../data/policyData';
import { PolicyDetailModal } from './PolicyDetailModal';

export const PolicySearchSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [onlyEssential, setOnlyEssential] = useState<boolean>(false);
  const [activePolicy, setActivePolicy] = useState<PolicyItem | null>(null);

  const categories = [
    { label: '전체', icon: null },
    { label: '금융·소득', icon: Coins },
    { label: '주거', icon: Building },
    { label: '일자리·취업', icon: Briefcase },
    { label: '교육·진로', icon: GraduationCap },
    { label: '의료·심리', icon: HeartPulse },
    { label: '긴급·생활', icon: AlertTriangle },
  ];

  const popularTags = [
    '자립수당',
    '자립정착금',
    'LH 청년전세',
    '월세지원',
    '구직촉진수당',
    '심리상담',
    '국가장학금',
    '운전면허',
    '전세사기대응'
  ];

  // Filtered list
  const filteredPolicies = useMemo(() => {
    return POLICIES_DATABASE.filter((item) => {
      // Category filter
      if (selectedCategory !== '전체' && item.category !== selectedCategory) {
        return false;
      }
      // Essential toggle
      if (onlyEssential && !item.isEssential) {
        return false;
      }
      // Search term
      if (!searchTerm.trim()) return true;

      const q = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.amountOrBenefit.toLowerCase().includes(q) ||
        item.targetAudience.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [searchTerm, selectedCategory, onlyEssential]);

  return (
    <div className="space-y-6">
      {/* Hero Search Box */}
      <div className="bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>자립준비청년 맞춤형 복지 혜택 디렉터리</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
            어떤 지원과 혜택이 필요한가요?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            월 50만 원 자립수당, 최대 2,000만 원 정착금, LH 1순위 주거지원, 구직촉진수당, 무료 심리상담까지 내가 누릴 수 있는 모든 국가·지자체 정책을 한곳에서 찾아보세요.
          </p>

          {/* Search Input Bar */}
          <div className="relative pt-2">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="혜택명, 키워드 검색 (예: 월세, 수당, LH, 치과, 취업, 노트북, 자격증...)"
                className="w-full bg-slate-950/90 border border-slate-700/80 hover:border-amber-500/60 focus:border-amber-500 rounded-2xl pl-12 pr-12 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 shadow-inner transition"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Popular quick search tags */}
            <div className="flex items-center flex-wrap gap-1.5 mt-3 text-xs">
              <span className="text-slate-400 font-medium text-[11px] mr-1">추천 검색어:</span>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSearchTerm(tag)}
                  className="px-2.5 py-1 rounded-lg bg-slate-900/80 hover:bg-amber-500/20 border border-slate-700/70 hover:border-amber-500/40 text-slate-300 hover:text-amber-300 text-[11px] transition"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Category Pills */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 md:pb-0">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.label)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition flex items-center space-x-1.5 ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Toggle: Essential Only */}
        <div className="flex items-center space-x-3 shrink-0">
          <label className="flex items-center space-x-2 cursor-pointer select-none text-xs">
            <input
              type="checkbox"
              checked={onlyEssential}
              onChange={(e) => setOnlyEssential(e.target.checked)}
              className="rounded accent-amber-500 w-4 h-4 cursor-pointer"
            />
            <span className={`font-semibold ${onlyEssential ? 'text-amber-300' : 'text-slate-400'}`}>
              ⭐ 꼭 챙겨야 할 필수 혜택만 보기
            </span>
          </label>

          <span className="text-slate-500">|</span>

          <span className="text-xs font-mono text-slate-400">
            총 <strong className="text-amber-400">{filteredPolicies.length}</strong>개 정책
          </span>
        </div>
      </div>

      {/* Policy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPolicies.map((item) => (
          <div
            key={item.id}
            onClick={() => setActivePolicy(item)}
            className="group bg-slate-900/90 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-5 transition-all duration-200 cursor-pointer flex flex-col justify-between hover:shadow-xl hover:shadow-amber-500/5"
          >
            <div className="space-y-3">
              {/* Category & Essential Pill */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-950 text-slate-300 border border-slate-800">
                  {item.category}
                </span>

                {item.isEssential && (
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/30 flex items-center space-x-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>필수 신청</span>
                  </span>
                )}
              </div>

              {/* Title & Subtitle */}
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition tracking-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                  {item.subtitle}
                </p>
              </div>

              {/* Amount Highlight */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                <span className="text-[10px] font-semibold text-amber-400 uppercase tracking-wider block">
                  지원 규모
                </span>
                <span className="text-sm font-extrabold text-slate-100 block truncate">
                  {item.amountOrBenefit}
                </span>
              </div>

              {/* Summary */}
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                {item.summary}
              </p>
            </div>

            {/* Bottom Target & Action */}
            <div className="pt-4 border-t border-slate-800/80 mt-4 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 truncate max-w-[180px]">
                대상: {item.targetAudience}
              </span>

              <span className="font-bold text-amber-400 group-hover:text-amber-300 flex items-center space-x-1 shrink-0">
                <span>상세보기</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
              </span>
            </div>
          </div>
        ))}

        {filteredPolicies.length === 0 && (
          <div className="col-span-full py-16 text-center bg-slate-900/40 rounded-3xl border border-slate-800 p-8 space-y-3">
            <Coins className="w-10 h-10 text-slate-600 mx-auto" />
            <h4 className="text-base font-bold text-slate-200">
              일치하는 지원 정책을 찾을 수 없습니다
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              검색어를 변경하거나 필터를 초기화해 보세요. 전국 대표 콜센터(1522-3865)로 전화하시면 직접 맞춤 제도를 안내받을 수 있습니다.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('전체');
                setOnlyEssential(false);
              }}
              className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition"
            >
              전체 정책 다시 보기
            </button>
          </div>
        )}
      </div>

      {/* Active Modal */}
      {activePolicy && (
        <PolicyDetailModal
          policy={activePolicy}
          onClose={() => setActivePolicy(null)}
        />
      )}
    </div>
  );
};
