import React, { useState } from 'react'
import './LoginSignup.css'

import user_icon from '../assets/person.png'
import email_icon from '../assets/email.png'
import password_icon from '../assets/password.png'

const LoginSignup = () => {   

    const [action, setAction]=useState("Login")
    const [formData, setFormData] = useState({name: "",email: "",password: ""});
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState(""); 
    const [showSuccess, setShowSuccess] = useState(false);
      const validateForm = () => { 
        const validationErrors = {};
    
        if (action === "Sign Up" && !formData.name.trim()) {
          validationErrors.name = "Name is required.";
        }
    
        if (!formData.email.trim()) {
          validationErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          validationErrors.email = "Invalid email address.";
        }
    
        if (!formData.password.trim()) {
          validationErrors.password = "Password is required.";
        } else if (formData.password.length < 6) {
          validationErrors.password = "Password must be at least 6 characters.";
        }
    
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
      };
    
     
      const handleSubmit = () => {
        if (validateForm()) {
          setSuccessMessage(
            action === "Login"
              ? "You have successfully logged in!"
              : "You have successfully signed up!"
          );setShowSuccess(true); 
       
          setFormData({name: "", email: "",password: ""});
          setErrors({});
          setTimeout(() => setShowSuccess(false), 3000);
        } else {
          setShowSuccess(false);; 
        }
       };
      
      
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

    return (
      <div className='container'>{showSuccess&&(
        <div className="success-popup">{successMessage}</div>)}
         
          <div className='header'>
              <div className='text'>{action}</div>
              <div className='underline'></div>
          </div>
          <div className='inputs'>
              {action==="Login"?<div></div>:<div className='input'>
                  <img src={user_icon} alt=""/>
                  <input  type="text"
                         name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleInputChange}/>
                    {errors.name && <span className="error">{errors.name}</span>}
              </div>}
              
              <div className='input'>
                  <img src={email_icon} alt=""/>
                  <input 
                  type="email"
                  name="email"
                  placeholder="Email Id"
                  value={formData.email}
                  onChange={handleInputChange}/>
                  {errors.email && <span className="error">{errors.email}</span>}
              </div>


              <div className='input'>
                  <img src={password_icon} alt=""/>
                  <input 
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}/>
                  {errors.password && <span className="error">{errors.password}</span>}
              </div>
          </div>
          

          {action==="Sign Up"?<div></div>:<div className='forgot-password'>Lost Password? <span>Click Here</span></div>}
  
          <div className='submit-container'>
          <div className={action === "Login" ? "submit gray" : "submit"}onClick={() => { setAction("Sign Up"); handleSubmit(); }}>Sign Up</div>
          <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => { setAction("Login"); handleSubmit();  }}> Login</div>      

          </div>
         
      </div>
    )
  }
  
  export default LoginSignup