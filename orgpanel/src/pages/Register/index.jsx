import React from 'react';
import './styles.css';
import profile_pic from '../../assets/profile_pic_testing.png'

function Register() {
  return (
    <div className="container">
      <div className="logoContainer">
        
        <img src={profile_pic} alt="Logo" className="logo" />
        <span className="logoText">YESI</span>
      </div>

      <div className="formContainer">
        <div className="loginText">Register your Organization</div>

        <input
          className="input"
          type="text"
          placeholder="Enter your Organization Name"
        />

        <input
          className="input"
          type="text"
          placeholder="Enter your Organization Email"
        />

        <input
          className="input"
          type="password"
          placeholder="Enter your password"
        />

        <button className="submitButton">Submit</button>

        <div className="registerContainer">
          <span>New to the app?</span>
          <a href="register" className="registerLink">
            Register
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
