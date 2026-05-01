import React, { useRef } from 'react';
import { motion } from 'motion/react';
import html2canvas from 'html2canvas';
import { SpreadType } from '../data/spreads';
import { TarotCard } from '../data/tarot';

interface ResultCard {
  card: TarotCard;
  isReversed: boolean;
  positionName: string;
}

interface ResultPhaseProps {
  question: string;
  spread: SpreadType;
  results: ResultCard[];
  onReset: () => void;
}

export function ResultPhase({ question, spread, results, onReset }: ResultPhaseProps) {
  const exportRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!exportRef.current) return;
    try {
      const canvas = await html2canvas(exportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      });
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      const date = new Date().toISOString().slice(0,10);
      a.download = `tarot_reading_${date}.png`;
      a.click();
    } catch (err) {
      console.error('Export failed:', err);
      alert('保存图片失败，请稍后重试。');
    }
  };

  const getSimulatedNumeral = (card: TarotCard) => {
    const match = card.id.match(/\d+/g);
    if (!match) return "X";
    const num = parseInt(match[0], 10);
    const numerals = ["0", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];
    if (card.id.startsWith("major_")) return numerals[num] || num.toString();
    return num.toString();
  };

  const getSimulatedIdHex = (idx: number) => {
    return (idx + 1).toString(16).padStart(2, '0').toUpperCase();
  };

  const formattedQuestion = question.trim() || '未提出问题';

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col items-center">
      <motion.div 
        ref={exportRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 flex flex-col max-w-5xl mx-auto w-full px-8 sm:px-12 py-10 bg-white"
      >
        <header className="flex justify-between items-center mb-12">
          <div className="text-xs tracking-[0.2em] font-bold uppercase">Tarot Ritual</div>
        </header>

        <main className="flex-1 flex flex-col items-center pb-12 w-full">
          {/* Header Title Section */}
          <div className="text-center mb-16 w-full">
            <h2 className="font-serif text-2xl sm:text-2xl italic mb-4 text-gray-400 break-words">“{formattedQuestion}”</h2>
            <p className="text-[10px] tracking-widest uppercase text-gray-500">
              {spread.name} · {spread.positions.join(' / ')}
            </p>
          </div>

          {/* Cards Display Section */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-20 w-full max-w-4xl">
            {results.map((rc, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className={`w-[140px] sm:w-[160px] h-[240px] sm:h-[280px] border border-[#E5E5E5] bg-white flex flex-col items-center justify-between relative tarot-shadow overflow-hidden transition-all duration-300 ${rc.isReversed ? 'rotate-180' : ''}`}>
                  <img src={rc.card.imageUrl} crossOrigin="anonymous" className="absolute inset-0 w-full h-full object-cover" alt={rc.card.name} />
                </div>
                <div className="text-[10px] tracking-widest text-gray-400 uppercase max-w-[160px] text-center">
                  {rc.positionName} {rc.isReversed ? '(逆位)' : ''}
                </div>
              </div>
            ))}
          </div>

          {/* List of Interpretations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12 w-full text-left">
            {results.map((rc, i) => (
              <div key={i} className="space-y-3">
                <h4 className={`text-xs font-bold uppercase tracking-wider ${rc.isReversed ? 'text-red-800' : 'text-[#1A1A1A]'}`}>
                  {rc.positionName} · <span className="font-serif italic capitalize text-gray-500">{rc.card.name.split(' (')[0].trim()}</span>
                  <br/>
                  <span className="text-[10px] tracking-widest opacity-80 mt-1 block">
                    {rc.isReversed ? '逆位 Reversed' : '正位 Upright'}
                  </span>
                </h4>
                <div className="w-8 h-[1px] bg-[#E5E5E5] mb-2"></div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] mb-1">释义 Interpretation</h5>
                <p className="text-xs leading-relaxed text-gray-600">
                  {rc.isReversed ? rc.card.reversed_desc : rc.card.upright_desc}
                </p>
              </div>
            ))}
          </div>
        </main>

        <footer className="mt-12 pt-8 border-t border-[#E5E5E5] flex flex-col sm:flex-row justify-between items-center gap-6 w-full">
          <div className="text-[10px] text-gray-400 italic font-serif text-center sm:text-left">极简主义占卜 · 标准韦特牌义库</div>
          <div className="flex gap-4" data-html2canvas-ignore>
            <button 
              onClick={handleExport}
              className="px-6 py-2.5 text-[13px] tracking-[0.1em] uppercase border border-[#1A1A1A] bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
            >
              保存为图片
            </button>
            <button 
              onClick={onReset}
              className="px-6 py-2.5 text-[13px] tracking-[0.1em] uppercase border border-[#1A1A1A] bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
            >
              重新占卜
            </button>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
