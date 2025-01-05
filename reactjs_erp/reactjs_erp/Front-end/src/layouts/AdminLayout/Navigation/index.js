import React, { useState, useContext, useEffect } from 'react';
import { ConfigContext } from '../../../contexts/ConfigContext';
import useWindowSize from '../../../hooks/useWindowSize';
import NavLogo from './NavLogo';
import MenuItems from './NavContent/MenuItems';
import { useLocation } from 'react-router-dom'; // Import useLocation from react-router-dom

const Navigation = () => {
  const configContext = useContext(ConfigContext);
  const { layoutType, collapseMenu } = configContext.state;
  const windowSize = useWindowSize();
  const [menuItems, setMenuItems] = useState([]);
  const location = useLocation(); // Get current location using useLocation hook

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // Check if the current path is "dashboard/default"
        if (location.pathname !== '/app/process/default') {
          // Retrieve user data from localStorage
          const storedUserData = localStorage.getItem('userData');
          if (storedUserData) {
            const { username, password } = JSON.parse(storedUserData);
            // Fetch menu items using username and password
            const response = await fetch('http://localhost:5000/Login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ username, password })
            });
            if (!response.ok) {
              throw new Error('Failed to fetch menu items');
            }
            const data = await response.json();
            console.log('Received data:', data);
            setMenuItems(data.items);
          }
        }
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, [location.pathname]); // Fetch menu items whenever the location changes

  let navClass = ['pcoded-navbar'];
  navClass = [...navClass, layoutType];
  if (windowSize.width < 992 && collapseMenu) {
    navClass = [...navClass, 'mob-open'];
  } else if (collapseMenu) {
    navClass = [...navClass, 'navbar-collapsed'];
  }
  let navBarClass = ['navbar-wrapper'];

  let navContent = (
    <div className={navBarClass.join(' ')}>
      <NavLogo />
      <MenuItems menuItems={menuItems} />
    </div>
  );

  if (windowSize.width < 992) {
    navContent = (
      <div className="navbar-wrapper">
        <NavLogo />
      
        <MenuItems menuItems={menuItems} />
      </div>
    );
  }

  return (
    <React.Fragment>
      
      <nav className={navClass.join(' ')}>
        {navContent}
      </nav>
    </React.Fragment>
  );
};

export default Navigation;
