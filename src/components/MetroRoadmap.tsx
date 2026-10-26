import React, { useState, useEffect, useMemo } from 'react';
import {
  ListTodo,
  CheckCircle2,
  Circle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Info,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { INDEPENDENCE_ROADMAP } from '../data/roadmapData';

export const MetroRoadmap: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('jaripon_checklist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);

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
    if (confirm('체크리스트 진행 기록을 모두 초기화하시겠습니까?')) {
      setCheckedIds([]);
    }
  };

  const currentStage = INDEPENDENCE_ROADMAP[activeStageIndex];
  const allItems = useMemo(() => INDEPENDENCE_ROADMAP.flatMap((s) => s.items), []);
  const totalCount = allItems.length;
  const completedCount = checkedIds.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <section id="roadmap" className="space-y-6 pt-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-stone-200 pb-4">
        <div>
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block mb-1">
            Independence Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            자립 생애 메트로 로드맵 & 생존 체크리스트
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            D-Day 퇴소 전부터 5년 후 완전한 홀로서기까지, 지하철 노선도를 따라가듯 시기별 필수 과제를 점검하세요.
          </p>
        </div>

        {/* Live Progress Chip */}
        <div className="flex items-center space-x-2 bg-white px-3.5 py-1.5 rounded-2xl border border-stone-200 shadow-2xs">
          <span className="text-xs text-stone-500 font-semibold">전체 완주율:</span>
          <span className="text-sm font-black text-emerald-600 font-mono">
            {completedCount}/{totalCount} ({progressPercent}%)
          </span>
          <button
            onClick={handleReset}
            className="text-[11px] text-stone-400 hover:text-stone-700 underline ml-2"
          >
            초기화
          </button>
        </div>
      </div>

      {/* Subway Line Metro Station Track */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-md shadow-stone-200/40 space-y-6">
        <div className="relative">
          {/* Connecting Track Line */}
          <div className="hidden md:block absolute top-1/2 left-8 right-8 h-1.5 bg-stone-200 -translate-y-1/2 z-0 rounded-full" />

          {/* 4 Metro Stations */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
            {INDEPENDENCE_ROADMAP.map((stg, idx) => {
              const isSelected = activeStageIndex === idx;
              const stageCheckedCount = stg.items.filter((i) => checkedIds.includes(i.id)).length;
              const isStageComplete = stageCheckedCount === stg.items.length;

              return (
                <button
                  key={stg.stageId}
                  onClick={() => setActiveStageIndex(idx)}
                  className={`p-4 rounded-2xl border text-left transition relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20 scale-[1.02]'
                      : isStageComplete
                      ? 'bg-emerald-50/80 border-emerald-200 text-stone-800'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                        isSelected
                          ? 'bg-white text-emerald-700'
                          : isStageComplete
                          ? 'bg-emerald-600 text-white'
                          : 'bg-stone-200 text-stone-700'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-stone-200 text-stone-600'
                      }`}
                    >
                      {stg.period}
                    </span>
                  </div>

                  <div>
                    <h4 className={`font-extrabold text-sm ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                      {stg.title.split(': ')[1] || stg.title}
                    </h4>
                    <p className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-emerald-100' : 'text-stone-500'}`}>
                      {stg.summary}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-current/15 flex items-center justify-between text-[11px]">
                    <span className="font-semibold">완료 현황</span>
                    <span className="font-mono font-bold">
                      {stageCheckedCount} / {stg.items.length}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Station Checklist Details */}
        <div className="pt-4 border-t border-stone-200 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-emerald-700">
                선택된 정거장: Step {activeStageIndex + 1} ({currentStage.period})
              </span>
              <h3 className="text-xl font-extrabold text-stone-900">
                {currentStage.title}
              </h3>
            </div>
            <p className="text-xs text-stone-500 max-w-md">
              {currentStage.summary}
            </p>
          </div>

          {/* Items Checklist Cards */}
          <div className="space-y-3">
            {currentStage.items.map((item) => {
              const isChecked = checkedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleCheck(item.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition cursor-pointer flex items-start space-x-3.5 ${
                    isChecked
                      ? 'bg-emerald-50/60 border-emerald-300 shadow-2xs'
                      : 'bg-stone-50/70 border-stone-200 hover:bg-stone-50 hover:border-stone-300'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <Circle className="w-5 h-5 text-stone-400 hover:text-emerald-600 transition" />
                    )}
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`text-sm sm:text-base font-bold ${
                          isChecked ? 'line-through text-stone-400' : 'text-stone-900'
                        }`}
                      >
                        {item.title}
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-stone-200 text-stone-600">
                        {item.category}
                      </span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Counselor Advice Box */}
                    <div className="mt-2 p-3 rounded-xl bg-white border border-stone-200 text-[11px] text-stone-700 flex items-start space-x-2">
                      <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-stone-900 font-bold mr-1">실전 팁:</strong>
                        <span>{item.tips}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
