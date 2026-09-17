import React from 'react';

export default function SevenDayPlan() {
  const plan = [
    { day: 1, title: 'Operating Systems & Architecture', desc: 'Focus on Processes, Deadlocks, Memory Management, and Pipelining.' },
    { day: 2, title: 'Data Structures & Algorithms', desc: 'Trees, Graphs, Sorting, Searching, and Hashing.' },
    { day: 3, title: 'Database Management Systems', desc: 'Normalization, SQL Queries, Transaction Management, and Concurrency.' },
    { day: 4, title: 'Computer Networks', desc: 'OSI Model, TCP/IP, IP Addressing, Routing Algorithms, and Security.' },
    { day: 5, title: 'Software Engg & Web Tech', desc: 'SDLC, Testing, HTML/CSS/JS Basics, XML, and Security Protocols.' },
    { day: 6, title: 'Full Syllabus Mock Tests', desc: 'Take 2 full mock tests and strictly review the Error Book.' },
    { day: 7, title: 'Formulas & Last Day Revision', desc: 'Memorize the Formula Book. Do not study new concepts.' },
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">7-Day Study Plan</h1>
        <p className="text-muted">A structured guide to cracking the exam in the final week.</p>
      </div>

      <div className="card">
        {plan.map(p => (
          <div key={p.day} style={{ display: 'flex', gap: '20px', marginBottom: '30px', paddingBottom: '30px', borderBottom: '1px dashed var(--border)' }}>
            <div style={{ 
              width: '60px', height: '60px', 
              background: 'var(--primary)', color: 'white', 
              borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.5rem', fontWeight: 'bold', flexShrink: 0 
            }}>
              {p.day}
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{p.title}</h2>
              <p className="text-muted">{p.desc}</p>
            </div>
          </div>
        ))}
        <div style={{ textAlign: 'center', color: 'var(--success)', fontWeight: 'bold', fontSize: '1.2rem', padding: '20px 0' }}>
          Day 8: Exam Day 🚀
        </div>
      </div>
    </div>
  );
}
