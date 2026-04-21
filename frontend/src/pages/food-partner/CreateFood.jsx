import React, { useState, useEffect } from 'react';
import './createFood.css';
import { data } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function CreateFood() {
  const [foodName, setFoodName] = useState('');
  const [description, setDescription] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const navigate=useNavigate();

  // Handle generating and cleaning up the video preview URL
  useEffect(() => {
    if (!videoFile) {
      setVideoUrl('');
      return;
    }

    // Create a temporary local URL for the selected video
    const objectUrl = URL.createObjectURL(videoFile);
    setVideoUrl(objectUrl);

    // Cleanup: Free up browser memory when the component unmounts or video changes
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [videoFile]);

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setVideoFile(file);
    } else {
      alert("Please select a valid video file.");
      e.target.value = null; // Reset the input
    }
  };

  const removeVideo = () => {
    setVideoFile(null);
  };

  const handleSubmit =async (e) => {
    e.preventDefault();

    if (!videoFile) {
  alert("Please upload a video");
  return;
}
    

    const formData = new FormData();
    formData.append('name',foodName);
    formData.append('description',description);
    formData.append('video',videoFile);

    const responce =await axios.post("http://localhost:3000/api/food",formData,{
      withCredentials:true,
    })

    console.log(responce.data);

    navigate("/");

  };
  

  return (
    <div className="create-food-container">
      <form className="create-food-form" onSubmit={handleSubmit}  encType="multipart/form-data">
        
        <div className="form-header">
          <h2>Create New Recipe</h2>
          <p>Share your latest culinary creation</p>
        </div>

        {/* Enhanced Video Input Area */}
        <div className="form-group">
          <label>Recipe Video</label>
          
          {!videoUrl ? (
            <label htmlFor="food-video" className="video-dropzone">
              <div className="dropzone-content">
                <svg className="upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                <span className="dropzone-text">Click to browse videos</span>
                <span className="dropzone-hint">MP4, WebM, or OGG</span>
              </div>
              <input
                type="file"
                id="food-video"
                accept="video/*"
                onChange={handleVideoChange}
                className="hidden-file-input"
              />
            </label>
          ) : (
            <div className="video-preview-wrapper">
              <video src={videoUrl} controls className="video-preview" />
              <button type="button" onClick={removeVideo} className="remove-video-btn">
                Change Video
              </button>
            </div>
          )}
        </div>

        {/* Name Input */}
        <div className="form-group">
          <label htmlFor="food-name">Food Name</label>
          <input
            type="text"
            id="food-name"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="e.g., Spicy Garlic Noodles"
            className="form-control"
            required
          />
        </div>

        {/* Description Input */}
        <div className="form-group">
          <label htmlFor="food-desc">Description</label>
          <textarea
            id="food-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us about this dish..."
            className="form-control"
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">
          Publish Recipe
        </button>

      </form>
    </div>
  );
}