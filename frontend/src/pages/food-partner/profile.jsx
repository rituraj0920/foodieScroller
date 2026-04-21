import React from 'react';
import styles from './Profile.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState,useEffect } from 'react';

const ProfilePage = () => {
    const { id } = useParams();
    const [profile,setProfile ] = useState(null);
    //const videos = Array.from({length:9},(_, i)=>({id:i+1}))
    const [videos, setvideos] = useState([]);

  useEffect(()=>{
        axios.get(`http://localhost:3000/api/food-partner/${id}`,{withCredentials: true})
        .then(response=>{
            setProfile(response.data.foodPartner)
            setvideos(response.data.foodPartner.foodItems)
        })
  },[id])

  return (
    <div className={styles.container}>
      {/* Header Area */}
      <header className={styles.header}>
        <div >
          <img className={styles.avatar} src="https://kansascitymag.com/wp-content/uploads/2024/12/Green-Dirt-On-Oak_Charcutterie-1024x683.jpg" alt="" />
        </div>
        <div className={styles.info}>
          <div className={styles.badge}>{profile?.businessname}</div>
          <div className={styles.badge}>{profile?.email}</div>
        </div>
      </header>

      {/* Stats Area */}
      <section className={styles.statsBar}>
        <div className={styles.statItem}>
          <span>Total Meals</span>
          <div className={styles.statValue}>40</div>
        </div>
        <div className={styles.statItem}>
          <span>Customers Served</span>
          <div className={styles.statValue}>15k</div>
        </div>
      </section>

      {/* Video Grid */}
      <main className={styles.grid}>
        {videos.map((vid) => (
          <div key={vid.id} >
           <video className={styles.videoTile}
           style={{ objectFit:'cover', width:'100%'}}
           src={vid.video} muted></video>
          </div>
        ))}
      </main>
    </div>
  );
};

export default ProfilePage;