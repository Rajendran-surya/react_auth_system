import React, { useState, useEffect } from 'react';
import {Card, ListGroup, Dropdown } from 'react-bootstrap';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios'; // Import Axios for making HTTP requests

import ChatList from './ChatList';

// Import user avatars
import avatar1 from '../../../../assets/images/user/avatar-1.jpg';
import avatar2 from '../../../../assets/images/user/avatar-2.jpg';
import avatar3 from '../../../../assets/images/user/avatar-3.jpg';
import avatar4 from '../../../../assets/images/user/avatar-4.jpg';

const NavRight = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate('/app/process/default');
  };

  const [listOpen, setListOpen] = useState(false);
  const [userDetails, setUserDetails] = useState(null); // State to store user details

  useEffect(() => {
    // Fetch user details from API
    const fetchData = async () => {
      try {
     
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          const { username, password } = JSON.parse(storedUserData);

          const response = await axios.post('http://localhost:5000/Login', { username, password });

          if (!response.data) {
            throw new Error('Failed to fetch user details');
          }

          setUserDetails(response.data);
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
  
    fetchData();
  }, []); // Empty dependency array ensures the effect runs only once after component mount
  
  const notiData = [
    {
      name: 'Joseph William',
      image: avatar2,
      details: 'Purchase New Theme and make payment',
      activity: '30 min'
    },
    {
      name: 'Sara Soudein',
      image: avatar3,
      details: 'currently login',
      activity: '30 min'
    },
    {
      name: 'Suzen',
      image: avatar4,
      details: 'Purchase New Theme and make payment',
      activity: 'yesterday'
    }
  ];

  return (
    <React.Fragment>
   <ListGroup as="ul" bsPrefix=" " className="navbar-nav ml-auto" id="navbar-right">
   <ListGroup.Item as="li" bsPrefix=" ">
   {userDetails && (
  <span className='user-details'>
   <a>  <i className="feather icon-user icon" /> - {userDetails.username} </a>
  <a>
   <i className="feather icon-shield " /> - {userDetails.user_role}</a></span>
)}
   </ListGroup.Item>

      <ListGroup.Item as="li" bsPrefix=" ">

    
        
    
        </ListGroup.Item>
      
        <ListGroup.Item as="li" bsPrefix=" ">
          <Dropdown align="start" className="drp-user">
            <Dropdown.Toggle as={Link} variant="link" to="#" id="dropdown-basic">
              <i className="icon feather icon-settings" />
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="profile-notification">
              <div className="pro-head">
                <img src={avatar1} className="img-radius" alt="User Profile" />
                <span>{userDetails && userDetails.username}</span>
                <Link to="/Login" className="dud-logout" title="Logout">
                  <i className="feather icon-log-out" />
                </Link>
              </div>
              <ListGroup as="ul" bsPrefix=" " variant="flush" className="pro-body">
              
                <ListGroup.Item as="li" bsPrefix=" ">
                  <Link to="/Login" className="dropdown-item">
                    <i className="feather icon-log-out" /> Logout
                  </Link>
                </ListGroup.Item>
              </ListGroup>
            </Dropdown.Menu>
          </Dropdown>
        </ListGroup.Item>
      </ListGroup>
      <ChatList listOpen={listOpen} closed={() => setListOpen(false)} />
    </React.Fragment>
  );
};

export default NavRight;
