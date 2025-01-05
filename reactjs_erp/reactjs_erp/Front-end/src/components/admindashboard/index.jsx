import React, { useState, useEffect } from 'react';


const Dashboard = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Retrieve error and response data from localStorage when the component mounts
    const storedError = localStorage.getItem('error');
    const storedResponse = localStorage.getItem('response');
    if (storedError) {
      setError(storedError);
    }
    if (storedResponse) {
      setResponse(JSON.parse(storedResponse));
    }
  }, []);

  const handleClick = () => {
    fetch('https://arrowapi.algomojo.in/v1/testapi/testgetapi?name=test&email=test@test.com')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'error') {
          setError(data.error_msg);
        } else {
          setResponse(data);
          setError(null);
          // Save response data to localStorage
          localStorage.setItem('response', JSON.stringify(data));
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        // Save error to localStorage
        localStorage.setItem('error', 'Error fetching data. Please try again later.');
      });
  };

  const handleAddToFavorites = () => {
    // Your existing handleAddToFavorites code
  };

  return (
    <div>
      {/* Add the RecentPathsTracker component */}
      {/* Your existing Dashboard content */}
      {/* <h1>Dashboard</h1>
      <button onClick={handleClick}>Call API</button>
      <button onClick={handleAddToFavorites}>Add to Favorites</button>
      {error && <p>Error: {error}</p>}
      {response && !error && <pre>{JSON.stringify(response, null, 2)}</pre>} */}
    </div>
  );
};

export default Dashboard;
