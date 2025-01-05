import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Table } from 'react-bootstrap';

const Process = () => {

  const [businessUnits, setBusinessUnits] = useState([]);
  const [favorites, setfavorites] = useState([]);
  const [recentlyVisited, setRecentlyVisited] = useState([]);
  
  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          const { username, password } = JSON.parse(storedUserData);

          const response = await fetch('http://localhost:5000/ProcessDetails', {
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
          setBusinessUnits(data.process_details);
          setRecentlyVisited(data.recently_visited);
          setfavorites(data.favorites);
        }
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div>
      <Row>
        <Col md={6} xl={4}>
          <Card className="card-social card_body_height">
            <div className='process_header'>
              <p>Business Units</p>
            </div>
            <Card.Body>
              <Table responsive hover className='table_border'>
                <tbody>
                  {businessUnits.map((unit, index) => (
                    <tr key={index}>
                      <td className="center-text">
                        <Link className='black_color' to={`${unit.url}`}>{unit.business_units}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <Card className="card-social card_body_height">
            <div className='process_header'>
              <p>Recently Visited</p>
            </div>
            <Card.Body>
              <Table responsive hover className='table_border'>
                <tbody>
                  {recentlyVisited.map((item, index) => (
                    <tr key={index}>
                      <td className="center-text">
                        <Link className='black_color' to={`${item.url}`}>{item.recently_visited}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4}>
          <Card className="card-social card_body_height">
            <div className='process_header'>
              <p>Favourites</p>
            </div>
            <Card.Body>
              <Table responsive hover className='table_border'>
              <tbody>
                  {favorites.map((item, index) => (
                    <tr key={index}>
                      <td className="center-text">
                        <Link className='black_color' to={`${item.url}`}>{item.favorites}</Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Process;
