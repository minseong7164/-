import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, Code2 } from 'lucide-react';
import { STORYBOARD_SECTIONS } from '../data/storyboardData';

interface ExportSummaryModalProps {
  onClose: () => void;
}

export const ExportSummaryModal: React.FC<ExportSummaryModalProps> = ({ onClose }) => {
  const [format, setFormat] = useState<'markdown' | 'json'>('markdown');
  const [copied, setCopied] = useState(false);

  const generateMarkdown = () => {
    let md = `# 자립준비청년 지원 안내 영상 제작 스토리보드 & AI 프롬프트 명세서\n`;
    md += `> 총 상영시간: 06:00 (360초) | 총 9개 구간\n`;
    md += `> 영상 생성 AI 모델: gemini-omni-1.1-flash (Interactions API)\n`;
    md += `> 지원 규격: 16:9 (가로형) / 9:16 (세로형 Shorts/Reels)\n\n---\n\n`;

    STORYBOARD_SECTIONS.forEach((sec) => {
      md += `## ${sec.id}구간 | ${sec.timeRange} | ${sec.title}\n`;
      md += `- **연출 방향**: ${sec.koreanDirection}\n`;
      md += `- **카메라 샷 / 구도**: ${sec.cameraDetails.shotType}\n`;
      md += `- **카메라 무빙**: ${sec.cameraDetails.cameraMovement}\n`;
      md += `- **조명 및 톤**: ${sec.cameraDetails.lighting}\n`;
      md += `- **AI 영상 생성 프롬프트 (English)**:\n\`\`\`\n${sec.aiPromptEnglish}\n\`\`\`\n`;
      md += `- **상담사 내레이션 대본**:\n> "${sec.koreanScript}"\n\n`;
      md += `- **핵심 전달 포인트**:\n`;
      sec.keyHighlights.forEach((hl) => {
        md += `  - ${hl}\n`;
      });
      md += `\n---\n\n`;
    });

    return md;
  };

  const generateJSON = () => {
    return JSON.stringify(
      {
        projectTitle: '자립준비청년 지원 안내 영상 9개 구간 스토리보드',
        totalDuration: '06:00',
        model: 'gemini-omni-1.1-flash',
        aspectRatios: ['16:9', '9:16'],
        sections: STORYBOARD_SECTIONS,
      },
      null,
      2
    );
  };

  const exportText = format === 'markdown' ? generateMarkdown() : generateJSON();

  const handleCopy = () => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename = `jaripon-storyboard-spec.${format === 'markdown' ? 'md' : 'json'}`;
    const blob = new Blob([exportText], {
      type: format === 'markdown' ? 'text/markdown;charset=utf-8' : 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm sm:text-base">
                스토리보드 & AI 프롬프트 명세서 내보내기
              </h3>
              <p className="text-xs text-slate-400">
                전체 9개 구간 프롬프트와 대본을 파일로 저장하거나 복사합니다.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Format Selector Bar */}
        <div className="px-5 py-2.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFormat('markdown')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                format === 'markdown'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Markdown (.md)</span>
            </button>
            <button
              onClick={() => setFormat('json')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition ${
                format === 'json'
                  ? 'bg-amber-500 text-slate-950'
                  : 'bg-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>JSON (.json)</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 transition border border-slate-700"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '복사 완료' : '전체 복사'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center space-x-1.5 transition shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>파일 다운로드</span>
            </button>
          </div>
        </div>

        {/* Content Box */}
        <div className="p-4 sm:p-5 flex-1 overflow-y-auto bg-slate-950">
          <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed select-all">
            {exportText}
          </pre>
        </div>
      </div>
    </div>
  );
};
