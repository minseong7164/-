/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ModernPortalHeader } from './components/ModernPortalHeader';
import { InteractiveHubHero } from './components/InteractiveHubHero';
import { BenefitPassportCards } from './components/BenefitPassportCards';
import { RegionalRadar } from './components/RegionalRadar';
import { MetroRoadmap } from './components/MetroRoadmap';
import { InteractiveCalculatorWidget } from './components/InteractiveCalculatorWidget';
import { ConversationalFaq } from './components/ConversationalFaq';
import { FloatingSosDock } from './components/FloatingSosDock';
import { HotlineModal } from './components/HotlineModal';
import { ExternalLink, Phone, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

export default function App() {
  const [selectedPersona, setSelectedPersona] = useState<string>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('서울특별시');
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isHotlinesOpen, setIsHotlinesOpen] = useState<boolean>(false);

  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSearchTerm = (term: string) => {
    if (!term.trim()) return;
    // Scroll to passports or appropriate section
    handleNavigateSection('passports');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-stone-900 flex flex-col selection:bg-emerald-500/20 selection:text-emerald-900 pb-20">
      {/* Top Header */}
      <ModernPortalHeader
        onOpenHotlines={() => setIsHotlinesOpen(true)}
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Stream */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 space-y-12">
        {/* 1. Interactive Hero Hub with Live Persona & Money Counter */}
        <div id="hero">
          <InteractiveHubHero
            onSearch={handleSearchTerm}
            selectedPersona={selectedPersona}
            onSelectPersona={setSelectedPersona}
            selectedRegion={selectedRegion}
            onSelectRegion={setSelectedRegion}
          />
        </div>

        {/* 2. Four Core Benefit Passports */}
        <BenefitPassportCards />

        {/* 3. 17 Metropolitan Regional Settlement Money & Centers Radar */}
        <RegionalRadar
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />

        {/* 4. Metro Subway-style Life Journey Roadmap */}
        <MetroRoadmap />

        {/* 5. Interactive Detailed Money Calculator & Receipt */}
        <InteractiveCalculatorWidget
          selectedRegion={selectedRegion}
          onSelectRegion={setSelectedRegion}
        />

        {/* 6. Conversational Q&A Dialogue Feed */}
        <ConversationalFaq />
      </main>

      {/* Floating Bottom Quick Hotline Dock */}
      <FloatingSosDock onOpenHotlines={() => setIsHotlinesOpen(true)} />

      {/* Modern Editorial Footer */}
      <footer className="border-t border-stone-200 bg-white py-12 text-xs text-stone-500 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base text-stone-900 tracking-tight">
                  자립<span className="text-emerald-600">ON</span>
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                  자립준비청년 복지 내비게이터
                </span>
              </div>
              <p className="text-xs text-stone-500 max-w-lg leading-relaxed">
                보건복지부, 아동권리보장원, 한국토지주택공사(LH)의 자립준비청년 공식 지원 정책 기준을 종합하여 청년들의 안전한 사회 첫걸음을 지원합니다.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://jaripon.ncrc.or.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center space-x-1.5 transition border border-stone-200"
              >
                <span>자립정보ON 공식 포털</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://www.bokjiro.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center space-x-1.5 transition border border-stone-200"
              >
                <span>복지로 자립수당 신청</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setIsHotlinesOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center space-x-1.5 transition shadow-xs"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>전국 긴급 연락망</span>
              </button>
            </div>
          </div>

          <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-400 gap-2">
            <div>
              자립지원 대표 콜센터: <strong className="text-stone-700">1522-3865</strong> (평일 09~18시) | 보건복지상담센터: <strong className="text-stone-700">국번없이 129</strong> (24시간)
            </div>
            <div>
              당신의 홀로서기는 혼자가 아닙니다. 새로운 내일을 진심으로 응원합니다.
            </div>
          </div>
        </div>
      </footer>

      {/* Emergency Hotlines Modal */}
      {isHotlinesOpen && (
        <HotlineModal onClose={() => setIsHotlinesOpen(false)} />
      )}
    </div>
  );
}
