import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import syllabusData from '../data/master_syllabus.json';
import { Clock, AlertTriangle } from 'lucide-react';

export default function MockTests() {
  const { recordMockScore, logError } = useStore();
  const [testState, setTestState] = useState('menu'); // menu, active, result
  const [testQuestions, setTestQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);

  // Simple shuffle helper
  const shuffle = (array) => array.sort(() => Math.random() - 0.5);

  const startTest = (type) => {
    let pool = [];
    if (type === 'full') {
      syllabusData.forEach(s => {
        s.chapters.forEach(c => {
          if (c.questions) pool.push(...c.questions.map(q => ({...q, topicId: c.id, topicTitle: c.title})));
        });
      });
    }
    
    // Select 20 random questions for the mock
    const selected = shuffle(pool).slice(0, 20);
    if (selected.length === 0) return; // No questions generated

    setTestQuestions(selected);
    setAnswers({});
    setCurrentQIndex(0);
    setTimeLeft(20 * 60); // 20 mins
    setTestState('active');
  };

  const submitTest = () => {
    let calcScore = 0;
    testQuestions.forEach((q, idx) => {
      const userAns = answers[idx];
      if (userAns === q.c) {
        calcScore += 1;
      } else if (userAns !== undefined) {
        logError(`mock-${Date.now()}-${idx}`, {
          topicId: q.topicId,
          topicTitle: q.topicTitle,
          qData: q,
          userAnswer: userAns
        });
      }
    });

    setScore(calcScore);
    recordMockScore(calcScore, testQuestions.length, 'full');
    setTestState('result');
  };

  const handleOptionSelect = (optIdx) => {
    setAnswers(prev => ({ ...prev, [currentQIndex]: optIdx }));
  };

  if (testState === 'menu') {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Mock Tests</h1>
          <p className="text-muted">Simulate the real IOCL CBT environment.</p>
        </div>
        <div className="card">
          <h2 className="card-title">Available Tests</h2>
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
            <div style={{ flex: 1, border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '20px', textAlign: 'center' }}>
              <h3>Full Syllabus Mock</h3>
              <p className="text-muted" style={{ margin: '12px 0' }}>20 Random Questions • 20 Minutes</p>
              <button className="btn btn-primary" onClick={() => startTest('full')}>Start Test</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (testState === 'active') {
    const q = testQuestions[currentQIndex];
    const userAns = answers[currentQIndex];

    return (
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', background: 'white', padding: '16px', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <div style={{ fontWeight: 600 }}>Question {currentQIndex + 1} of {testQuestions.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--danger)', fontWeight: 600 }}>
            <Clock size={20} />
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </div>
          <button className="btn btn-primary" onClick={submitTest}>Submit Test</button>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '1.2rem', marginBottom: '24px', lineHeight: 1.5 }}>{q.q}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {q.o.map((opt, idx) => (
              <button 
                key={idx}
                className={`quiz-option ${userAns === idx ? 'active' : ''}`}
                onClick={() => handleOptionSelect(idx)}
                style={userAns === idx ? { borderColor: 'var(--primary)', background: 'var(--panel)' } : {}}
              >
                {String.fromCharCode(65 + idx)}. {opt}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <button 
            className="btn btn-outline" 
            disabled={currentQIndex === 0}
            onClick={() => setCurrentQIndex(prev => prev - 1)}
          >
            Previous
          </button>
          <button 
            className="btn btn-outline"
            disabled={currentQIndex === testQuestions.length - 1}
            onClick={() => setCurrentQIndex(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  if (testState === 'result') {
    const percentage = Math.round((score / testQuestions.length) * 100);
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Test Results</h1>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <h2 style={{ fontSize: '3rem', color: percentage >= 70 ? 'var(--success)' : 'var(--warning)', margin: 0 }}>
            {percentage}%
          </h2>
          <p className="text-muted" style={{ fontSize: '1.2rem', marginTop: '10px' }}>
            You scored {score} out of {testQuestions.length}
          </p>
          <div className="callout callout-info" style={{ textAlign: 'left', marginTop: '30px' }}>
            <AlertTriangle size={20} style={{ marginBottom: '-4px', marginRight: '8px' }} />
            Your incorrect answers have been automatically logged to the <strong>Error Book</strong>. Review them there to improve your score next time!
          </div>
          <button className="btn btn-primary" style={{ marginTop: '20px' }} onClick={() => setTestState('menu')}>
            Back to Mock Tests
          </button>
        </div>
      </div>
    );
  }
}
