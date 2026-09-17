import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import syllabusData from '../data/master_syllabus.json';

export default function PracticeLab() {
  const { logError } = useStore();
  const [activeSubject, setActiveSubject] = useState(syllabusData[0]);
  const [activeChapter, setActiveChapter] = useState(syllabusData[0].chapters[0]);

  const questions = activeChapter.questions || [];
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const question = questions[currentQIndex];

  const handleSubjectChange = (e) => {
    const subj = syllabusData.find(s => s.id === e.target.value);
    setActiveSubject(subj);
    setActiveChapter(subj.chapters[0]);
    resetQuiz();
  };

  const handleChapterChange = (e) => {
    const chap = activeSubject.chapters.find(c => c.id === e.target.value);
    setActiveChapter(chap);
    resetQuiz();
  };

  const resetQuiz = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const handleOptionSelect = (index) => {
    if (showExplanation) return; // Prevent changing answer after checking
    setSelectedOption(index);
  };

  const handleCheck = () => {
    if (selectedOption === null) return;
    setShowExplanation(true);
    
    // Log to error book if wrong
    if (selectedOption !== question.c) {
      logError(`${activeChapter.id}-q${currentQIndex}`, {
        topicId: activeChapter.id,
        topicTitle: activeChapter.title,
        qData: question,
        userAnswer: selectedOption
      });
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header">
        <h1 className="page-title">Practice Lab</h1>
        <p className="text-muted">Master topics by solving targeted questions.</p>
      </div>

      <div className="card" style={{ display: 'flex', gap: '20px', background: 'var(--panel)' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Subject</label>
          <select 
            value={activeSubject.id} 
            onChange={handleSubjectChange}
            style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
          >
            {syllabusData.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Topic</label>
          <select 
            value={activeChapter.id} 
            onChange={handleChapterChange}
            style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}
          >
            {activeSubject.chapters.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
          </select>
        </div>
      </div>

      {!question ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <h3 className="text-muted">No questions available for this topic yet.</h3>
        </div>
      ) : (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <span style={{ fontWeight: 600, color: 'var(--primary)' }}>Question {currentQIndex + 1} of {questions.length}</span>
            <span className="text-muted">Level {question.level}</span>
          </div>
          
          <h2 style={{ fontSize: '1.25rem', marginBottom: '24px', lineHeight: 1.5 }}>
            {question.q}
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {question.o.map((opt, idx) => {
              let btnClass = "quiz-option";
              if (showExplanation) {
                if (idx === question.c) btnClass += " correct";
                else if (idx === selectedOption) btnClass += " wrong";
              } else if (idx === selectedOption) {
                btnClass += " active";
              }

              return (
                <button 
                  key={idx} 
                  className={btnClass}
                  onClick={() => handleOptionSelect(idx)}
                  disabled={showExplanation}
                  style={!showExplanation && idx === selectedOption ? { borderColor: 'var(--primary)', background: 'var(--panel)' } : {}}
                >
                  {String.fromCharCode(65 + idx)}. {opt}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {!showExplanation ? (
              <button 
                className="btn btn-primary" 
                onClick={handleCheck}
                disabled={selectedOption === null}
                style={{ opacity: selectedOption === null ? 0.5 : 1 }}
              >
                Check Answer
              </button>
            ) : (
              <button 
                className="btn btn-primary" 
                onClick={handleNext}
                disabled={currentQIndex >= questions.length - 1}
              >
                {currentQIndex >= questions.length - 1 ? 'End of Topic' : 'Next Question'}
              </button>
            )}
          </div>

          {showExplanation && (
            <div className={`callout ${selectedOption === question.c ? 'callout-success' : 'callout-danger'}`} style={{ marginTop: '24px' }}>
              <h4 style={{ marginBottom: '8px' }}>
                {selectedOption === question.c ? '✅ Correct!' : '❌ Incorrect!'}
              </h4>
              <p><strong>Explanation:</strong> {question.explanation}</p>
              {selectedOption !== question.c && (
                <p style={{ marginTop: '8px', fontSize: '0.9rem' }} className="text-muted">
                  <em>This question has been automatically saved to your Error Book for revision.</em>
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
