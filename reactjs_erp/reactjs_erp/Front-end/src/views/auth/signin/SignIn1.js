// Signin1.js
import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Finfolab from './Finfolab-Logo.png';
import AuthLogin from './FirebaseLogin';

const Signin1 = () => {
  const [loggedIn, setLoggedIn] = useState(false); // State to track login status
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle login
  const handleLogin = (userData) => {
    setUsername(userData.username);
    setPassword(userData.password);
    setLoggedIn(true);
    // Store user data in localStorage
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  useEffect(() => {
    // Check if user data exists in localStorage and set state accordingly
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const parsedUserData = JSON.parse(storedUserData);
      setUsername(parsedUserData.username);
      setPassword(parsedUserData.password);
      setLoggedIn(true);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="auth-wrapper">
        <div className="auth-content">
          <div className="">
            <span className="r" />
            <span className="r s" />
            <span className="r s" />
            <span className="r" />
          </div>
          <Card className="borderless text-center">
            <Card.Body>
              <div className="mb-4">
                {/* <img src={Finfolab} style={{ width: '83px' }} className="img-radius" alt="User Profile" /> */}
                <h4>Authentication System </h4>
              </div>
              <AuthLogin onLogin={handleLogin} />
              <p className="mb-2 text-muted">
                Forgot password?{' '}
                <NavLink to="/auth/reset-password-1" className="f-w-400">
                  Reset
                </NavLink>
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signin1;
