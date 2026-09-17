import React from 'react';
import { useStore } from '../store/StoreContext';
import syllabusData from '../data/master_syllabus.json';
import { Target, BookOpen, AlertTriangle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { topicProgress, errorBook, mockScores } = useStore();

  const totalTopics = syllabusData.reduce((acc, subj) => acc + subj.chapters.length, 0);
  const completedTopics = Object.keys(topicProgress).length;
  const progressPercent = totalTopics === 0 ? 0 : Math.round((completedTopics / totalTopics) * 100);

  const errorCount = Object.keys(errorBook).length;
  const avgMockScore = mockScores.length > 0 
    ? Math.round(mockScores.reduce((acc, curr) => acc + (curr.score / curr.total) * 100, 0) / mockScores.length)
    : 0;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="text-muted">Welcome back. Here is your preparation status.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '30px' }}>
        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ padding: '10px', background: 'var(--primary)', color: 'white', borderRadius: '50%' }}>
              <BookOpen size={20} />
            </div>
            <h3 style={{ fontSize: '1rem', margin: 0 }}>Syllabus Completion</h3>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{progressPercent}%</div>
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>{completedTopics} / {totalTopics} Topics</div>
        </div>

        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ padding: '10px', background: 'var(--warning)', color: 'white', borderRadius: '50%' }}>
              <Target size={20} />
            </div>
            <h3 style={{ fontSize: '1rem', margin: 0 }}>Avg Mock Score</h3>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{avgMockScore}%</div>
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>{mockScores.length} tests taken</div>
        </div>

        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ padding: '10px', background: 'var(--danger)', color: 'white', borderRadius: '50%' }}>
              <AlertTriangle size={20} />
            </div>
            <h3 style={{ fontSize: '1rem', margin: 0 }}>Error Book</h3>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{errorCount}</div>
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>Items to review</div>
        </div>

        <div className="card" style={{ marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ padding: '10px', background: 'var(--success)', color: 'white', borderRadius: '50%' }}>
              <TrendingUp size={20} />
            </div>
            <h3 style={{ fontSize: '1rem', margin: 0 }}>Exam Readiness</h3>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>
            {Math.round((progressPercent + avgMockScore) / 2)}%
          </div>
          <div className="text-muted" style={{ fontSize: '0.85rem' }}>Estimated</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
        <div>
          <div className="card">
            <h2 className="card-title">Subject Progress</h2>
            {syllabusData.map(subj => {
              const subjTopics = subj.chapters.length;
              const subjCompleted = subj.chapters.filter(c => topicProgress[c.id]).length;
              const subjPercent = Math.round((subjCompleted / subjTopics) * 100);
              
              return (
                <div key={subj.id} style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 500 }}>{subj.label}</span>
                    <span className="text-muted">{subjPercent}%</span>
                  </div>
                  <div style={{ height: '8px', background: 'var(--secondary)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${subjPercent}%`, background: 'var(--primary)' }}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div>
          <div className="card">
            <h2 className="card-title">Quick Actions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Link to="/book" className="btn btn-primary" style={{ justifyContent: 'center' }}>Continue Reading</Link>
              <Link to="/practice" className="btn btn-outline" style={{ justifyContent: 'center' }}>Practice Random Topic</Link>
              <Link to="/error-book" className="btn btn-outline" style={{ justifyContent: 'center', borderColor: 'var(--danger)', color: 'var(--danger)' }}>Review Errors</Link>
              <Link to="/mock" className="btn btn-outline" style={{ justifyContent: 'center', borderColor: 'var(--warning)', color: 'var(--warning)' }}>Take Mock Test</Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
