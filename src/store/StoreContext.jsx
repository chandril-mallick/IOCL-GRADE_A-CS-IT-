import React, { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export function StoreProvider({ children }) {
  // Load initial state
  const loadState = (key, defaultVal) => {
    const saved = localStorage.getItem(`iocl_master_${key}`);
    return saved ? JSON.parse(saved) : defaultVal;
  };

  const [bookmarks, setBookmarks] = useState(() => loadState('bookmarks', {}));
  const [errorBook, setErrorBook] = useState(() => loadState('errors', {}));
  const [mockScores, setMockScores] = useState(() => loadState('mocks', []));
  const [topicProgress, setTopicProgress] = useState(() => loadState('progress', {}));

  // Save on change
  useEffect(() => { localStorage.setItem('iocl_master_bookmarks', JSON.stringify(bookmarks)); }, [bookmarks]);
  useEffect(() => { localStorage.setItem('iocl_master_errors', JSON.stringify(errorBook)); }, [errorBook]);
  useEffect(() => { localStorage.setItem('iocl_master_mocks', JSON.stringify(mockScores)); }, [mockScores]);
  useEffect(() => { localStorage.setItem('iocl_master_progress', JSON.stringify(topicProgress)); }, [topicProgress]);

  // Helpers
  const toggleBookmark = (id, data) => {
    setBookmarks(prev => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = data;
      return next;
    });
  };

  const logError = (questionId, questionData) => {
    setErrorBook(prev => ({
      ...prev,
      [questionId]: { ...questionData, timestamp: Date.now() }
    }));
  };

  const removeError = (questionId) => {
    setErrorBook(prev => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const markTopicComplete = (topicId) => {
    setTopicProgress(prev => ({ ...prev, [topicId]: true }));
  };

  const recordMockScore = (score, total, type) => {
    setMockScores(prev => [...prev, { score, total, type, date: Date.now() }]);
  };

  const value = {
    bookmarks, toggleBookmark,
    errorBook, logError, removeError,
    mockScores, recordMockScore,
    topicProgress, markTopicComplete
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
