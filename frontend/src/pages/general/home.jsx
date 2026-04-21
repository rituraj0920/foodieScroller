import React, { useState, useEffect } from 'react';
import './reels.css';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const Reels = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 1. Initialize saved videos from localStorage
  const [savedVideos, setSavedVideos] = useState(() => {
    const saved = localStorage.getItem('mySavedReels');
    return saved ? JSON.parse(saved) : [];
  });


  

  useEffect(() => {
    axios.get("http://localhost:3000/api/food/", { withCredentials: true })
      .then(response => {
         
        console.log(response.data);

        if (response.data === 401) {
          setError("Unauthorized 401: You might need to send a token or cookies. you should login first ");
          return;
        }
        if (response.data && response.data.foodItems) {
          setVideos(response.data.foodItems);
        } else {
          setVideos([]); 
        }
      })
      .catch(err => {
        console.error("Error fetching reels:", err);
        setError("Failed to load videos from the server.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  

  // 2. Function to handle saving/unsaving
  const handleToggleSave = (video) => {
    let updatedSaved;
    const isAlreadySaved = savedVideos.some(v => v._id === video._id);

    if (isAlreadySaved) {
      // Remove from saved list
      updatedSaved = savedVideos.filter(v => v._id !== video._id);
    } else {
      // Add to saved list
      updatedSaved = [...savedVideos, video];
    }

    setSavedVideos(updatedSaved);
    localStorage.setItem('mySavedReels', JSON.stringify(updatedSaved)); // Persist data
  };

  if (isLoading) return <div className="status-screen"><h2>Loading...</h2></div>;
  if (error) return <div className="status-screen"><h2>{error}</h2></div>;

  return (
    <div className="app-wrapper">
      <div className="reels-container">
        {videos?.length === 0 ? (
          <h2 className="status-screen">No videos found.</h2>
        ) : (
          videos?.map((video) => (
            <VideoItem 
              key={video._id} 
              data={video} 
              isSaved={savedVideos.some(v => v._id === video._id)}
              onSave={() => handleToggleSave(video)}
            />
          ))
        )}
      </div>
      <BottomNav />
    </div>
  );
};

const VideoItem = ({ data, isSaved, onSave }) => {
  
  const [isLiked, setIsLiked] = useState(false);
  

  const [likeCount, setLikeCount] = useState(data.likeCount );

  // 2. Helper function to format large numbers (e.g., 1200 -> 1.2K, 1500000 -> 1.5M)
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num;
  };

  // 3. Function to handle clicking the Like button
   async function likeVideo(item) {

        const response = await axios.post("http://localhost:3000/api/food/like", { foodId: item._id }, {withCredentials: true})

        if(response.data.like){
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }else{
            console.log("Video unliked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
        
    }

  return (
    <div className="video-item">
      <video 
        className="video-player" 
        src={data.video} 
        autoPlay 
        muted 
        loop 
        playsInline
      />
      
      <div className="video-overlay">
        
        {/* Left Side: Description and Button */}
        <div className="overlay-left">
          <p className="video-description">{data.description || "Description goes here"}</p>
          <Link className="visit-store-btn" to={`/food-partner/${data.foodPartner}`}>
            visit store
          </Link>
        </div>

        {/* Right Side: Action Icons with Dynamic Counts */}
        <div className="overlay-right">
          
          {/* LIKE BUTTON */}
          <button className="action-btn" onClick={()=>likeVideo(data._id)}>
            <svg 
              width="32" height="32" viewBox="0 0 24 24" 
              fill={isLiked ? "#ff3040" : "none"} /* Turns red when liked */
              stroke={isLiked ? "#ff3040" : "currentColor"} /* Border matches red */
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              style={{ transition: 'all 0.2s ease' }} /* Smooth color transition */
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <span>{formatNumber(likeCount)}</span>
          </button>
          
          {/* COMMENT BUTTON */}
          <button className="action-btn">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>{formatNumber(data.comments || 45)}</span>
          </button>

          {/* SAVE BUTTON */}
          <button className="action-btn" onClick={onSave}>
            <svg 
              width="32" height="32" viewBox="0 0 24 24" 
              fill={isSaved ? "currentColor" : "none"} 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>{formatNumber(data.savesCount)}</span>
          </button>

        </div>
      </div>
    </div>
  );
};

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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>
      </Link>
    </nav>
  );
};

export default Reels;
