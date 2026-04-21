import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { useNavigate } from "react-router-dom";

 const UserRegister=()=> {
    
  const navigate= useNavigate();


    const handleSUbmit=async (e)=>{
      e.preventDefault();

      const fullName = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      
      
      const response =await axios.post("http://localhost:3000/api/auth/user/register",{
          fullName,
          email,
          password
      }) 


      console.log(response.data);

       navigate("/");
    }

   



  return (
    <main className="auth-container">
      <div className="auth-header">
        <h1>Create an account</h1>
        <p>Join us to discover great food.</p>
      </div>
      
      <form onSubmit={handleSUbmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" placeholder="John Doe" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="you@example.com" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Create a password" required />
        </div>
        <button type="submit" className="btn-primary">Create Account</button>
      </form>

      <div className="auth-footer">
        Already have an account? <a href="/user/login">Sign in</a>
      </div>
    </main>
  );
}

export default UserRegister;