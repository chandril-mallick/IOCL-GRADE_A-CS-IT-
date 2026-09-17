import React, { useState } from 'react';
import syllabusData from '../data/master_syllabus.json';

export default function Flashcards() {
  // Aggregate all definitions across the syllabus for the flashcards
  const allCards = [];
  syllabusData.forEach(subj => {
    subj.chapters.forEach(chap => {
      if (chap.definitions) {
        chap.definitions.forEach(def => {
          allCards.push({
            topic: chap.title,
            subject: subj.label,
            term: def.term,
            meaning: def.meaning
          });
        });
      }
    });
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = allCards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % allCards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + allCards.length) % allCards.length);
    }, 150);
  };

  if (allCards.length === 0) {
    return <div style={{ padding: '40px' }}>No flashcards generated.</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Flashcards</h1>
        <p className="text-muted">Quick revision of all key definitions in the syllabus.</p>
      </div>

      <div style={{ maxWidth: '600px', margin: '40px auto', perspective: '1000px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px', color: 'var(--muted)' }}>
          Card {currentIndex + 1} of {allCards.length}
        </div>

        <div 
          onClick={() => setIsFlipped(!isFlipped)}
          style={{
            width: '100%',
            height: '350px',
            position: 'relative',
            transition: 'transform 0.6s',
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            cursor: 'pointer'
          }}
        >
          {/* Front (Term) */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px'
          }}>
            <div style={{ position: 'absolute', top: '20px', left: '20px', color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600 }}>
              {currentCard.subject} &gt; {currentCard.topic}
            </div>
            <h2 style={{ fontSize: '2rem', textAlign: 'center' }}>{currentCard.term}</h2>
            <div style={{ position: 'absolute', bottom: '20px', color: 'var(--muted)', fontSize: '0.85rem' }}>
              Click to flip
            </div>
          </div>

          {/* Back (Meaning) */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            background: 'var(--panel)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--primary)',
            boxShadow: '0 8px 16px rgba(37, 99, 235, 0.15)',
            transform: 'rotateY(180deg)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px'
          }}>
            <h3 style={{ fontSize: '1.25rem', textAlign: 'center', lineHeight: 1.6, fontWeight: 400 }}>
              {currentCard.meaning}
            </h3>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
          <button className="btn btn-outline" onClick={handlePrev}>&larr; Previous</button>
          <button className="btn btn-primary" onClick={handleNext}>Next &rarr;</button>
        </div>
      </div>
    </div>
  );
}
