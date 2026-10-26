import React, { useState, useEffect, useMemo } from 'react';
import {
  ListTodo,
  CheckCircle2,
  Circle,
  RotateCcw,
  Sparkles,
  Calendar,
  ShieldCheck,
  Building,
  Coins,
  GraduationCap,
  HeartPulse,
  Info
} from 'lucide-react';
import { INDEPENDENCE_ROADMAP, ChecklistItem, RoadmapStage } from '../data/roadmapData';

export const RoadmapSection: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jaripon_checklist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeStageId, setActiveStageId] = useState<string>('prep');
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('jaripon_checklist', JSON.stringify(checkedIds));
    } catch (e) {
      console.warn('localStorage error', e);
    }
  }, [checkedIds]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleReset = () => {
    if (confirm('체크리스트 진행 상황을 모두 초기화하시겠습니까?')) {
      setCheckedIds([]);
    }
  };

  // Total items count & progress
  const allItems = useMemo(() => {
    return INDEPENDENCE_ROADMAP.flatMap((stage) => stage.items);
  }, []);

  const totalCount = allItems.length;
  const completedCount = checkedIds.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  const categories = ['전체', '행정/서류', '금융/자산', '주거', '취업/학업', '건강/마음'];

  const currentStage = useMemo(() => {
    return (
      INDEPENDENCE_ROADMAP.find((s) => s.stageId === activeStageId) ||
      INDEPENDENCE_ROADMAP[0]
    );
  }, [activeStageId]);

  const filteredItems = useMemo(() => {
    if (selectedCategory === '전체') return currentStage.items;
    return currentStage.items.filter((i) => i.category === selectedCategory);
  }, [currentStage, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-slate-900 border border-blue-500/30 rounded-3xl p-6 sm:p-8">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center space-x-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
            <ListTodo className="w-4 h-4" />
            <span>생애주기별 자립 로드맵 & 생존 체크리스트</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            보호종료 D-day부터 5년 안착까지
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            퇴소 전 챙겨야 할 서류 발급부터 주거 계약, 통장 개설, 멘토링까지 시기별 핵심 과제를 하나씩 체크하며 체계적으로 자립을 준비하세요. 진행 상황은 브라우저에 자동 저장됩니다.
          </p>
        </div>
      </div>

      {/* Progress & Milestone Overview Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-white">나의 자립 체크리스트 달성률</span>
              <span className="text-xs font-mono font-bold text-amber-400">
                {completedCount} / {totalCount} 완료
              </span>
            </div>
            <span className="text-xs text-slate-400">
              필수 점검 과제를 완료할 때마다 체크박스를 클릭하세요.
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-2xl font-extrabold text-amber-400 font-mono">
              {progressPercent}%
            </span>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition text-xs flex items-center space-x-1"
              title="진행률 초기화"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">초기화</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Stage Navigation Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
          {INDEPENDENCE_ROADMAP.map((stg, idx) => {
            const isSelected = activeStageId === stg.stageId;
            const stageChecked = stg.items.filter((i) => checkedIds.includes(i.id)).length;

            return (
              <button
                key={stg.stageId}
                onClick={() => setActiveStageId(stg.stageId)}
                className={`p-3 rounded-xl border text-left transition ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 ring-1 ring-amber-500/40 text-white'
                    : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-bold text-amber-400">Step {idx + 1}</span>
                  <span className="font-mono text-[10px] text-slate-400">{stg.period}</span>
                </div>
                <div className="text-xs font-bold truncate text-slate-200">
                  {stg.title.split(': ')[1] || stg.title}
                </div>
                <div className="text-[10px] text-slate-400 mt-1">
                  {stageChecked} / {stg.items.length} 항목 완료
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Stage Header & Filter */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300">
                {currentStage.period}
              </span>
              <h3 className="text-lg font-bold text-white">
                {currentStage.title}
              </h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              {currentStage.summary}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === c
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Checklist Cards List */}
        <div className="space-y-3">
          {filteredItems.map((item) => {
            const isDone = checkedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-4 sm:p-5 rounded-2xl border transition cursor-pointer flex items-start space-x-3.5 ${
                  isDone
                    ? 'bg-slate-950/90 border-emerald-500/40 opacity-80'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Checkbox Icon */}
                <div className="mt-0.5 shrink-0">
                  {isDone ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-600 hover:text-amber-400 transition" />
                  )}
                </div>

                {/* Content */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`text-sm sm:text-base font-bold tracking-tight ${
                        isDone ? 'line-through text-slate-400' : 'text-white'
                      }`}
                    >
                      {item.title}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                      {item.category}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Practical Tips Box */}
                  <div className="mt-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800/80 text-[11px] text-amber-300/90 flex items-start space-x-2">
                    <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-amber-400">실전 팁: </strong>
                      {item.tips}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
