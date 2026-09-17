import React, { useState, useEffect } from 'react';
import syllabusData from '../data/master_syllabus.json';

export default function StudyBook() {
  const [activeSubject, setActiveSubject] = useState(syllabusData[0]);
  const [activeChapter, setActiveChapter] = useState(syllabusData[0].chapters[0]);

  return (
    <div className="studybook-container" style={{ display: 'flex', gap: '40px', height: '100%' }}>
      {/* Sidebar for chapters */}
      <div className="studybook-sidebar" style={{ width: '300px', flexShrink: 0, overflowY: 'auto', borderRight: '1px solid var(--border)', paddingRight: '20px' }}>
        <h2 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Syllabus</h2>
        {syllabusData.map((subj) => (
          <div key={subj.id} className="subject-group">
            <div 
              className="subject-title" 
              onClick={() => setActiveSubject(subj)}
            >
              {subj.label}
            </div>
            {activeSubject.id === subj.id && (
              <div className="topic-list">
                {subj.chapters.map(chap => (
                  <div 
                    key={chap.id} 
                    className={`topic-item ${activeChapter.id === chap.id ? 'active' : ''}`}
                    onClick={() => setActiveChapter(chap)}
                  >
                    {chap.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chapter Content */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '100px' }}>
        <div className="page-header">
          <div className="text-muted" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginBottom: '8px' }}>
            {activeSubject.label}
          </div>
          <h1 className="page-title">{activeChapter.title}</h1>
        </div>

        <div className="card">
          <h2 className="card-title text-primary">Concept Introduction</h2>
          <div className="callout callout-info">
            <p dangerouslySetInnerHTML={{ __html: activeChapter.concept.what }} />
            <p>{activeChapter.concept.why}</p>
          </div>
          <p style={{ marginTop: '16px' }}><strong>Easy Explanation:</strong> {activeChapter.concept.easy}</p>
          <p style={{ marginTop: '16px' }}><strong>Formal Definition:</strong> {activeChapter.concept.formal}</p>
        </div>

        {activeChapter.definitions.length > 0 && (
          <div className="card">
            <h2 className="card-title text-success">Must Remember Definitions</h2>
            <ul style={{ paddingLeft: '20px' }}>
              {activeChapter.definitions.map((d, i) => (
                <li key={i} style={{ marginBottom: '8px' }}>
                  <strong>{d.term}:</strong> {d.meaning}
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeChapter.examples.length > 0 && (
          <div className="card">
            <h2 className="card-title">Step-by-step Example</h2>
            {activeChapter.examples.map((ex, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <h4 style={{ marginBottom: '8px' }}>{ex.title}</h4>
                <div style={{ padding: '16px', background: 'var(--panel)', borderRadius: 'var(--radius)', borderLeft: '4px solid var(--muted)' }}>
                  {ex.content}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeChapter.formulas && activeChapter.formulas.length > 0 && (
          <div className="card" style={{ borderColor: 'var(--warning)', boxShadow: '0 4px 12px rgba(217, 119, 6, 0.1)' }}>
            <h2 className="card-title text-warning">Formula / Rule Box</h2>
            {activeChapter.formulas.map((f, i) => (
              <div key={i} className="callout callout-warning">
                <strong>{f.name}:</strong> 
                <div style={{ fontFamily: 'var(--font-mono)', padding: '8px 0', fontSize: '1.1rem' }}>{f.formula}</div>
                <div className="text-muted" style={{ fontSize: '0.9rem' }}>{f.meaning}</div>
              </div>
            ))}
          </div>
        )}

        {activeChapter.traps && activeChapter.traps.length > 0 && (
          <div className="card" style={{ borderColor: 'var(--danger)', boxShadow: '0 4px 12px rgba(220, 38, 38, 0.1)' }}>
            <h2 className="card-title text-danger">Exam Traps</h2>
            {activeChapter.traps.map((t, i) => (
              <div key={i} className="callout callout-danger">
                <strong>{t.title}</strong>
                <p>{t.description}</p>
              </div>
            ))}
          </div>
        )}

        {activeChapter.probable_questions && activeChapter.probable_questions.length > 0 && (
          <div className="card">
            <h2 className="card-title">What IOCL Could Ask</h2>
            <div className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '16px' }}>Probable question pattern — prediction, NOT leaked/confirmed question.</div>
            <ul style={{ paddingLeft: '20px' }}>
              {activeChapter.probable_questions.map((pq, i) => (
                <li key={i}>
                  <strong>{pq.pattern}:</strong> {pq.description}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}
