import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RecentPathsTracker = () => {
  const location = useLocation();
  const [recentPath, setRecentPath] = useState('');

  useEffect(() => {
    setRecentPath(location.pathname);
  }, [location]);

  const sendRecentPathToAPI = (path) => {
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
      console.error('User data not found in local storage');
      return;
    }
    const { username, password } = JSON.parse(storedUserData);

    const data = {
      username,
      password,
      url: path,
      title: document.title,
    };

    fetch('http://localhost:5000/recentlyvisited', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (response.ok) {
        console.log('Recent path sent to API successfully');
      } else {
        console.error('Failed to send recent path to API');
      }
    })
    .catch(error => {
      console.error('Error while sending recent path to API:', error);
    });
  };

  useEffect(() => {
    if (recentPath !== '') {
      sendRecentPathToAPI(recentPath);
    }
  }, [recentPath]);

  return (
    <div>
      {/* Render your application components */}
    </div>
  );
};

export default RecentPathsTracker;
