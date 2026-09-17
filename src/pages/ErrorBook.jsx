import React, { useState } from 'react';
import { useStore } from '../store/StoreContext';
import { Trash2 } from 'lucide-react';

export default function ErrorBook() {
  const { errorBook, removeError } = useStore();
  const errors = Object.entries(errorBook).sort((a, b) => b[1].timestamp - a[1].timestamp);

  const [activeErrorId, setActiveErrorId] = useState(null);

  if (errors.length === 0) {
    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Error Book</h1>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <h3 className="text-muted">Your Error Book is empty!</h3>
          <p style={{ marginTop: '12px' }}>Mistakes from the Practice Lab and Mock Tests will automatically appear here for revision.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Error Book</h1>
        <p className="text-muted">Review your mistakes to prevent repeating them in the actual exam.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
          <h2 style={{ padding: '20px', borderBottom: '1px solid var(--border)', margin: 0, fontSize: '1.1rem' }}>
            Logged Errors ({errors.length})
          </h2>
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {errors.map(([id, data]) => (
              <div 
                key={id} 
                onClick={() => setActiveErrorId(id)}
                style={{ 
                  padding: '16px 20px', 
                  borderBottom: '1px solid var(--border)', 
                  cursor: 'pointer',
                  background: activeErrorId === id ? 'var(--panel-hover)' : 'transparent',
                  borderLeft: activeErrorId === id ? '4px solid var(--danger)' : '4px solid transparent'
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--muted)', marginBottom: '4px' }}>
                  {data.topicTitle}
                </div>
                <div style={{ fontSize: '0.95rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {data.qData.q}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {activeErrorId ? (
            (() => {
              const data = errorBook[activeErrorId];
              const q = data.qData;
              return (
                <div className="card" style={{ position: 'relative' }}>
                  <button 
                    onClick={() => removeError(activeErrorId)}
                    style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--muted)' }}
                    title="Remove from Error Book"
                  >
                    <Trash2 size={20} />
                  </button>
                  <h2 className="card-title text-danger">Review Mistake</h2>
                  <div className="text-muted" style={{ marginBottom: '20px' }}>Topic: {data.topicTitle}</div>
                  
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', lineHeight: 1.5 }}>{q.q}</h3>
                  
                  <div style={{ marginBottom: '24px' }}>
                    {q.o.map((opt, idx) => {
                      let bg = 'white', border = 'var(--border)';
                      if (idx === q.c) {
                        bg = 'var(--success-bg)'; border = 'var(--success)';
                      } else if (idx === data.userAnswer) {
                        bg = 'var(--danger-bg)'; border = 'var(--danger)';
                      }
                      
                      return (
                        <div key={idx} style={{ 
                          padding: '12px 16px', 
                          marginBottom: '8px', 
                          border: `1px solid ${border}`, 
                          background: bg,
                          borderRadius: 'var(--radius)' 
                        }}>
                          {String.fromCharCode(65 + idx)}. {opt}
                          {idx === q.c && <span style={{ float: 'right' }}>✅ Correct</span>}
                          {idx === data.userAnswer && <span style={{ float: 'right' }}>❌ Your Answer</span>}
                        </div>
                      );
                    })}
                  </div>

                  <div className="callout callout-info">
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                </div>
              );
            })()
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
              Select an error from the list to review it.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
