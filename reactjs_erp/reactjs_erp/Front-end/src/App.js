// App.js

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import  RecentPathsTracker   from "./layouts/AdminLayout/recentlyvisited";
// import { AuthProvider } from './AuthProvider'; // Import your AuthProvider
import routes, { renderRoutes } from './routes';

const App = () => {
  return (
    // <AuthProvider>
      <BrowserRouter basename={process.env.REACT_APP_BASE_NAME}>
        <RecentPathsTracker />
        {renderRoutes(routes)}
      </BrowserRouter>
    // </AuthProvider>
  );
};

export default App;
