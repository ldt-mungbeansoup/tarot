import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';

interface ShufflePhaseProps {
  onComplete: () => void;
}

export function ShufflePhase({ onComplete }: ShufflePhaseProps) {
  const NUM_CARDS = 78;
  const [cards, setCards] = useState(() => 
    Array.from({ length: NUM_CARDS }).map(() => ({
      x: (Math.random() - 0.5) * 20, 
      y: (Math.random() - 0.5) * 20,
      r: (Math.random() - 0.5) * 10,
    }))
  );
  
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleShuffle = () => {
    const scattered = cards.map(() => ({
      x: (Math.random() - 0.5) * window.innerWidth * 0.6,
      y: (Math.random() - 0.5) * window.innerHeight * 0.4,
      r: (Math.random() - 0.5) * 180,
    }));
    setCards(scattered);
  };
  
  const handleGather = () => {
    const gathered = cards.map(() => ({
      x: (Math.random() - 0.5) * 5,
      y: (Math.random() - 0.5) * 5,
      r: (Math.random() - 0.5) * 5,
    }));
    setCards(gathered);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen overflow-hidden bg-white select-none relative"
    >
      <header className="absolute top-10 left-12 right-12 flex justify-between items-center z-10 pointer-events-none max-w-5xl mx-auto w-full px-4 sm:px-0">
        <div className="text-xs tracking-[0.2em] font-bold uppercase text-[#1A1A1A]">Tarot Ritual</div>
        <div className="text-xs text-gray-400 hidden sm:block">SHUFFLE</div>
      </header>

      <div className="absolute top-24 text-center z-10 pointer-events-none">
        <h2 className="font-serif text-2xl italic mb-2 text-gray-400">洗牌仪式</h2>
        <p className="text-[10px] tracking-widest uppercase text-gray-500">点击下方按钮或随意拖拽 · 感受牌面的洗拨</p>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full h-[60vh] flex items-center justify-center pointer-events-auto"
      >
        {cards.map((c, i) => (
          <motion.div
            key={i}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
            initial={{ x: c.x, y: c.y, rotateZ: c.r }}
            animate={{ x: c.x, y: c.y, rotateZ: c.r }}
            transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            className="absolute w-24 h-40 border border-[#1A1A1A] bg-white flex flex-col items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing tarot-shadow"
          >
            {/* Minimalist card back pattern */}
            <div className="w-full h-full border-[6px] border-white bg-[#1A1A1A] flex items-center justify-center relative">
               <div className="w-8 h-8 rotate-45 border border-white/30 absolute"></div>
               <div className="w-12 h-12 border border-white/10 rounded-full absolute"></div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-12 flex flex-col items-center gap-6 z-10">
        <div className="flex gap-4">
          <button 
            onClick={handleShuffle}
            className="px-6 py-2.5 text-[13px] tracking-[0.1em] uppercase border border-[#1A1A1A] bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
          >
            打乱 / SHUFFLE
          </button>
          <button 
            onClick={handleGather}
            className="px-6 py-2.5 text-[13px] tracking-[0.1em] uppercase border border-[#1A1A1A] bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors"
          >
            收拢 / GATHER
          </button>
        </div>
        <button 
          onClick={onComplete}
          className="px-6 py-2.5 text-[13px] tracking-[0.1em] uppercase border border-[#1A1A1A] bg-[#1A1A1A] text-white hover:bg-white hover:text-[#1A1A1A] transition-colors"
        >
          完成 / COMPLETE
        </button>
      </div>
    </motion.div>
  );
}
