import React from 'react';
import { useStore } from '../store/StoreContext';
import { Link } from 'react-router-dom';

export default function Bookmarks() {
  const { bookmarks, toggleBookmark } = useStore();
  const bList = Object.entries(bookmarks);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Bookmarks</h1>
        <p className="text-muted">Saved topics for quick reference.</p>
      </div>

      {bList.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px' }}>
          <p className="text-muted">You haven't bookmarked anything yet.</p>
          <p style={{ marginTop: '10px' }}><Link to="/book" className="btn btn-primary">Go to MasterBook</Link></p>
        </div>
      ) : (
        <div className="card">
          {bList.map(([id, data]) => (
            <div key={id} style={{ padding: '16px 0', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{data.title}</h3>
                <div className="text-muted" style={{ fontSize: '0.85rem' }}>{data.subject}</div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link to={`/book?topic=${id}`} className="btn btn-outline">Read</Link>
                <button className="btn btn-outline" style={{ color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => toggleBookmark(id, data)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
