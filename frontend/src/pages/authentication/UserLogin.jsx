
import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";



const UserLogin=()=> {
   const navigate= useNavigate();


    const handleSUbmit=async (e)=>{
      e.preventDefault();

     
      const email = e.target.email.value;
      const password = e.target.password.value;
      
      
      await axios.post("http://localhost:3000/api/auth/user/login",{
          
          email,
          password
      },{withCredentials:true})
      .then(response=>{
        console.log(response.data);
        navigate("/");
      })
      .catch(error =>{
        console.error("there was an error resgiestered");

      })


      

       
    }
  return (
    <main className="auth-container">
      <div className="auth-header">
        <h1>Welcome back</h1>
        <p>Enter your details to access your account.</p>
      </div>
      
      <form onSubmit={handleSUbmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="you@example.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="••••••••" required />
        </div>
        <button type="submit" className="btn-primary">Sign In</button>
      </form>

      <div className="auth-footer">
        Don't have an account? <a href="/user/register">Sign up</a>
      </div>

      <div className="switch-portal text-muted">
        Are you a restaurant or caterer? <a href="/food-partner/login">Partner Login</a>
      </div>
    </main>
  );
}

export default UserLogin;