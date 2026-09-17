import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function LastDay() {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title" style={{ color: 'var(--danger)' }}>Last-Day Revision</h1>
        <p className="text-muted">High-yield advice for the 24 hours before the exam.</p>
      </div>

      <div className="card" style={{ borderColor: 'var(--warning)', boxShadow: '0 4px 12px rgba(217, 119, 6, 0.1)' }}>
        <h2 className="card-title text-warning"><AlertTriangle size={24} /> DO NOT DO THIS</h2>
        <ul style={{ paddingLeft: '20px', lineHeight: 1.8, fontSize: '1.1rem' }}>
          <li><strong className="text-danger">Do not</strong> read any new topic. If you don't know it now, leave it.</li>
          <li><strong className="text-danger">Do not</strong> take a full mock test today. It will only cause anxiety.</li>
          <li><strong className="text-danger">Do not</strong> stay up late. Sleep is more critical than 5 extra facts.</li>
        </ul>
      </div>

      <div className="card" style={{ borderColor: 'var(--success)', boxShadow: '0 4px 12px rgba(22, 163, 74, 0.1)' }}>
        <h2 className="card-title text-success"><CheckCircle size={24} /> DO THIS</h2>
        <ul style={{ paddingLeft: '20px', lineHeight: 1.8, fontSize: '1.1rem' }}>
          <li><strong className="text-success">Review Error Book:</strong> Read the explanations for questions you previously got wrong.</li>
          <li><strong className="text-success">Scan Formulas:</strong> Go through the Formula Book for 30 minutes.</li>
          <li><strong className="text-success">Admit Card & ID:</strong> Print them out and pack your bag tonight.</li>
        </ul>
      </div>

      <div className="card">
        <h2 className="card-title">Exam Hall Strategy</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="callout callout-info">
            <strong>Round 1 (Fast & Furious):</strong> Go through all questions. Answer ONLY the ones you are 100% sure about. Skip calculations or lengthy puzzles.
          </div>
          <div className="callout callout-warning">
            <strong>Round 2 (Calculated Risks):</strong> Re-visit the skipped questions. Try to eliminate 2 options. If you can eliminate 2, take the guess (if negative marking permits).
          </div>
          <div className="callout callout-danger">
            <strong>Round 3 (Danger Zone):</strong> The tough ones. Don't spend more than 2 minutes on a single question. It's better to leave it than lose easy marks at the end.
          </div>
        </div>
      </div>
    </div>
  );
}
