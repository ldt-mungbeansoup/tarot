import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { SpreadType } from '../data/spreads';

interface DrawPhaseProps {
  spread: SpreadType;
  onComplete: (selectedIndices: number[]) => void;
}

export function DrawPhase({ spread, onComplete }: DrawPhaseProps) {
  const NUM_CARDS = 78;
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);
  
  const [rotation, setRotation] = useState(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  const radius = Math.min(typeof window !== 'undefined' ? window.innerWidth : 800, typeof window !== 'undefined' ? window.innerHeight : 800) * 0.35;

  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastX.current;
    setRotation(prev => prev + deltaX * 0.5);
    lastX.current = e.clientX;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
  };
  
  const handleBgClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.tarot-card-draw')) return;
    if ((e.target as HTMLElement).closest('.confirm-btn')) return;
    setHighlightedIndex(null);
  };

  const handleCardClick = (index: number) => {
    if (selectedIndices.includes(index)) return; 
    setHighlightedIndex(index);
  };

  const handleConfirmSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (highlightedIndex === null) return;
    
    const newSelected = [...selectedIndices, highlightedIndex];
    setSelectedIndices(newSelected);
    setHighlightedIndex(null);
    
    if (newSelected.length === spread.cardCount) {
      setTimeout(() => {
        onComplete(newSelected);
      }, 800);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen overflow-hidden bg-white select-none relative"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleBgClick}
    >
      <header className="absolute top-10 left-12 right-12 flex justify-between items-center z-10 pointer-events-none max-w-5xl mx-auto w-full px-4 sm:px-0">
        <div className="text-xs tracking-[0.2em] font-bold uppercase text-[#1A1A1A]">Tarot Ritual</div>
        <div className="text-xs text-gray-400 hidden sm:block">DRAW</div>
      </header>

      <div className="absolute top-24 text-center z-10 pointer-events-none">
        <h2 className="font-serif text-2xl italic mb-2 text-gray-400">指引之环</h2>
        <p className="text-[10px] tracking-widest uppercase text-gray-500">
          左右拖动旋转圆环 · 单击抽出 · 点击下方按钮确认
        </p>
        <div className="mt-4 text-xs font-bold tracking-wider text-[#1A1A1A] uppercase">
          已抽 / DRAWN: {selectedIndices.length} / {spread.cardCount}
        </div>
      </div>

      <div 
        className="relative w-full h-[80vh] flex items-center justify-center cursor-ew-resize"
      >
        <motion.div 
          className="relative w-0 h-0"
          animate={{ rotateZ: rotation }}
          transition={{ type: 'tween', ease: 'linear', duration: 0 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {Array.from({ length: NUM_CARDS }).map((_, i) => {
            const angleDeg = (i / NUM_CARDS) * 360;
            const angleRad = (angleDeg * Math.PI) / 180;
            const isSelected = selectedIndices.includes(i);
            const isHighlighted = highlightedIndex === i;
            
            const extraDist = isHighlighted ? 60 : 0;
            const currentRadius = radius + extraDist;
            
            const x = Math.cos(angleRad) * currentRadius;
            const y = Math.sin(angleRad) * currentRadius;
            
            return (
              <motion.div
                key={i}
                className={`tarot-card-draw absolute w-16 h-28 border border-[#1A1A1A] flex items-center justify-center cursor-pointer transition-colors ${
                  isHighlighted ? 'bg-gray-50 tarot-shadow' : 'bg-white'
                }`}
                style={{ 
                  left: '-2rem', 
                  top: '-3.5rem',  
                }}
                initial={false}
                animate={{
                  x,
                  y,
                  rotateZ: angleDeg + 90,
                  opacity: isSelected ? 0 : 1,
                  scale: isSelected ? 0.8 : (isHighlighted ? 1.1 : 1),
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(i);
                }}
              >
                <div className="w-full h-full border-[3px] border-white bg-[#1A1A1A] flex items-center justify-center relative">
                   <div className="w-4 h-4 rotate-45 border border-white/30 absolute"></div>
                   <div className="w-6 h-6 border border-white/10 rounded-full absolute"></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="absolute bottom-12 right-12 z-10 pointer-events-none">
        <button 
          onClick={handleConfirmSelection}
          disabled={highlightedIndex === null}
          className={`px-6 py-2.5 text-[13px] tracking-[0.1em] uppercase border transition-all duration-300 pointer-events-auto ${
            highlightedIndex !== null 
              ? 'border-[#1A1A1A] bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white' 
              : 'border-[rgba(26,26,26,0.2)] bg-transparent text-gray-400 opacity-50 cursor-not-allowed pointer-events-none'
          }`}
        >
          确定选择 / CONFIRM
        </button>
      </div>
    </motion.div>
  );
}
