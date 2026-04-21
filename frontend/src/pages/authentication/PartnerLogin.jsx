import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";



const PartnerLogin=()=> {
   
   const navigate= useNavigate();


    const handleSUbmit=async (e)=>{
      e.preventDefault();

    
      const email = e.target.email.value;
      const password = e.target.password.value;
      
      
      await axios.post("http://localhost:3000/api/auth/food-partner/login",{
          
          email,
          password
      },{withCredentials:true})
      .then(response=>{
        console.log(response.data);
        navigate("/create-food");
      })
      .catch(error =>{
        console.error("there was an error resgiestered");

      })


      

       
    }




  return (
    <main className="auth-container">
      <div className="auth-header">
        <span className="badge">Partner Portal</span>
        <h1>Grow your business</h1>
        <p>Log in to manage your menu and orders.</p>
      </div>
      
      <form onSubmit={handleSUbmit}>
        <div className="form-group">
          <label htmlFor="email">Business Email</label>
          <input type="email" id="email" placeholder="contact@yourrestaurant.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="••••••••" required />
        </div>
        <button type="submit" className="btn-primary">Access Dashboard</button>
      </form>

      <div className="auth-footer">
        Not a partner yet? <a href="/food-partner/register">Apply now</a>
      </div>

      <div className="switch-portal text-muted">
        Looking for food? <a href="/user/login">User Login</a>
      </div>
    </main>
  );
}

export default PartnerLogin;