import React, { useState } from 'react';
import syllabusData from '../data/master_syllabus.json';

export default function Formulas() {
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterTopic, setFilterTopic] = useState('All');

  const formulas = [];
  syllabusData.forEach(subj => {
    if (filterSubject === 'All' || filterSubject === subj.id) {
      subj.chapters.forEach(chap => {
        if (filterTopic === 'All' || filterTopic === chap.title) {
          if (chap.formulas && chap.formulas.length > 0) {
            chap.formulas.forEach(f => {
              formulas.push({
                subject: subj.label,
                topic: chap.title,
                name: f.name,
                formula: f.formula,
                meaning: f.meaning
              });
            });
          }
        }
      });
    }
  });

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 className="page-title">Formula Book</h1>
          <p className="text-muted">A consolidated list of all rules, sutras, and formulas.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <select 
            className="btn btn-outline" 
            value={filterSubject} 
            onChange={(e) => {
              setFilterSubject(e.target.value);
              setFilterTopic('All'); // Reset topic when subject changes
            }}
          >
            <option value="All">All Subjects</option>
            {syllabusData.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>

          {filterSubject !== 'All' && (
            <select 
              className="btn btn-outline" 
              value={filterTopic} 
              onChange={(e) => setFilterTopic(e.target.value)}
              style={{ maxWidth: '250px' }}
            >
              <option value="All">All Topics</option>
              {syllabusData.find(s => s.id === filterSubject)?.chapters.map(c => (
                <option key={c.id} value={c.title}>{c.title}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
        {formulas.map((f, i) => (
          <div key={i} className="card" style={{ borderTop: '4px solid var(--warning)' }}>
            <div className="text-muted" style={{ fontSize: '0.8rem', marginBottom: '8px' }}>
              {f.subject} &gt; {f.topic}
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>{f.name}</h3>
            <div style={{ 
              background: 'var(--warning-bg)', 
              padding: '16px', 
              borderRadius: 'var(--radius)', 
              fontFamily: 'var(--font-mono)', 
              fontSize: '1.1rem',
              color: 'var(--ink)',
              marginBottom: '12px'
            }}>
              {f.formula}
            </div>
            <div className="text-muted" style={{ fontSize: '0.9rem' }}>
              {f.meaning}
            </div>
          </div>
        ))}
      </div>

      {formulas.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <p className="text-muted">No formulas found for the selected subject.</p>
        </div>
      )}
    </div>
  );
}
