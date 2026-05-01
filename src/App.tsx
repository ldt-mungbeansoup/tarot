import { useState, useMemo } from 'react';
import { TAROT_DECK, TarotCard } from './data/tarot';
import { SpreadType } from './data/spreads';
import { InputPhase } from './components/InputPhase';
import { ShufflePhase } from './components/ShufflePhase';
import { DrawPhase } from './components/DrawPhase';
import { ResultPhase } from './components/ResultPhase';

type Step = 'input' | 'shuffle' | 'draw' | 'result';

interface DeckCard extends TarotCard {
  isReversed: boolean;
  deckIndex: number;
}

export default function App() {
  const [step, setStep] = useState<Step>('input');
  const [question, setQuestion] = useState('');
  const [spread, setSpread] = useState<SpreadType | null>(null);
  
  // The deck we use for drawing (after shuffling)
  const [deck, setDeck] = useState<DeckCard[]>([]);
  // The selected card indices from the deck
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  // 1. Complete Input
  const handleInputComplete = (q: string, s: SpreadType) => {
    setQuestion(q);
    setSpread(s);
    setStep('shuffle');
  };

  // 2. Complete Shuffle
  const handleShuffleComplete = () => {
    // Generate the deck of 78 cards with random reversed state
    const newDeck: DeckCard[] = [...TAROT_DECK]
      // Shuffle the array array itself physically
      .sort(() => Math.random() - 0.5)
      .map((card, idx) => ({
        ...card,
        isReversed: Math.random() > 0.5,
        deckIndex: idx
      }));
    setDeck(newDeck);
    
    // Make sure we shuffle the positions
    setStep('draw');
  };

  // 3. Complete Draw
  const handleDrawComplete = (indices: number[]) => {
    setSelectedIndices(indices);
    setStep('result');
  };

  const handleReset = () => {
    setStep('input');
    setQuestion('');
    setSpread(null);
    setDeck([]);
    setSelectedIndices([]);
  };

  // Assemble results
  const results = useMemo(() => {
    if (!spread || selectedIndices.length === 0 || deck.length === 0) return [];
    
    return selectedIndices.map((idx, i) => {
      const card = deck[idx];
      return {
        card,
        isReversed: card.isReversed,
        positionName: spread.positions[i] || `Position ${i + 1}`
      };
    });
  }, [spread, selectedIndices, deck]);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-200">
      {step === 'input' && (
        <InputPhase onComplete={handleInputComplete} />
      )}
      {step === 'shuffle' && (
        <ShufflePhase onComplete={handleShuffleComplete} />
      )}
      {step === 'draw' && spread && (
        <DrawPhase spread={spread} onComplete={handleDrawComplete} />
      )}
      {step === 'result' && spread && (
        <ResultPhase 
          question={question} 
          spread={spread} 
          results={results} 
          onReset={handleReset} 
        />
      )}
    </div>
  );
}

