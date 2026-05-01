import React, { useState } from 'react';
import { SpreadType, SPREADS } from '../data/spreads';
import { motion } from 'motion/react';

interface InputPhaseProps {
  onComplete: (question: string, spread: SpreadType) => void;
}

export function InputPhase({ onComplete }: InputPhaseProps) {
  const [question, setQuestion] = useState('');
  const [selectedSpread, setSelectedSpread] = useState<SpreadType | null>(null);
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!question.trim()) {
      setError('请输入您的问题');
      return;
    }
    if (question.length > 20) {
      setError('问题请控制在 20 字以内');
      return;
    }
    if (!selectedSpread) {
      setError('请选择一个牌阵');
      return;
    }
    setError('');
    onComplete(question, selectedSpread);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 max-w-5xl mx-auto w-full relative"
    >
      <header className="absolute top-10 left-12 right-12 flex justify-between items-center z-10 pointer-events-none">
        <div className="text-xs tracking-[0.2em] font-bold uppercase">Tarot Ritual</div>
        <div className="text-xs text-gray-400 hidden sm:block">QUESTION</div>
      </header>

      <div className="text-center mb-10 w-full max-w-xl mx-auto">
        <h2 className="font-serif text-2xl italic mb-8 text-gray-400">“请提出问题”</h2>
        <div className="w-full relative mb-12 flex justify-center">
          <input 
            type="text" 
            value={question}
            onChange={(e) => {
              setQuestion(e.target.value);
              if (e.target.value.length <= 20) setError('');
            }}
            placeholder="心里默念你的问题..."
            className="w-full text-center text-xl pb-4 border-b border-[#E5E5E5] focus:outline-none focus:border-[#1A1A1A] transition-colors bg-transparent placeholder-gray-300 font-serif italic max-w-md"
          />
          <div className="absolute right-0 bottom-4 text-[10px] text-gray-400 w-full max-w-md mx-auto flex justify-end">
            {question.length}/20
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl mb-16">
        <p className="text-[10px] tracking-widest uppercase text-gray-500 mb-6 text-center">选择牌阵 · SPREADS</p>
        <div className="flex flex-wrap justify-center gap-4">
          {SPREADS.map(spread => (
            <button
              key={spread.id}
              onClick={() => setSelectedSpread(spread)}
              className={`px-6 py-4 flex flex-col items-center gap-1 border transition-all duration-200 ${
                selectedSpread?.id === spread.id 
                  ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white tarot-shadow' 
                  : 'border-[#E5E5E5] hover:border-[#1A1A1A] text-[#1A1A1A] bg-white'
              }`}
            >
              <div className="text-[13px] font-bold tracking-wider uppercase">{spread.name}</div>
              <div className="text-[10px] opacity-70 tracking-widest">{spread.cardCount} 张牌</div>
            </button>
          ))}
        </div>
      </div>

      {error && <div className="text-red-800 text-xs mb-6 font-bold uppercase tracking-wider">{error}</div>}

      <button 
        onClick={handleNext}
        className="px-6 py-2.5 text-[13px] tracking-[0.1em] uppercase border border-[#1A1A1A] bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
      >
        冥想完毕 / NEXT
      </button>

      <footer className="absolute bottom-8 w-full flex justify-center items-center pointer-events-none">
        <div className="text-[10px] text-gray-400 italic font-serif">极简主义占卜 · 标准韦特牌义库</div>
      </footer>
    </motion.div>
  );
}
