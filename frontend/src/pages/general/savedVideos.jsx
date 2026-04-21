import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './savedVideo.css';

const SavedVideos = () => {
  const [savedVideos, setSavedVideos] = useState([]);

  useEffect(() => {
    // Fetch saved videos from localStorage when page loads
    const saved = localStorage.getItem('mySavedReels');
    if (saved) {
      setSavedVideos(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="saved-page-wrapper">
      <div className="saved-header">
        <h2>Saved Reels</h2>
      </div>

      <div className="saved-grid">
        {savedVideos.length === 0 ? (
          <div className="empty-state">
            <p>You haven't saved any videos yet.</p>
          </div>
        ) : (
          savedVideos.map((video) => (
            <div key={video._id} className="grid-item">
              <video src={video.video} muted playsInline className="grid-video" />
            </div>
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
};

// We reuse the exact same Bottom Nav here so you can navigate back!
const BottomNav = () => {
  const location = useLocation();
  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </Link>
      <Link to="/saved" className={`nav-item ${location.pathname === '/saved' ? 'active' : ''}`}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </Link>
    </nav>
  );
};

export default SavedVideos;