import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {Row, Col ,Card, Form, Button} from 'react-bootstrap';




const Create_process = () => {
  const [isFavorite, setIsFavorite] = useState(false); 

  const handleToggleFavorite = () => {
    // Toggle the favorite state
    setIsFavorite(prevIsFavorite => !prevIsFavorite);

    // Add to or remove from favorites
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
      setError('User data not found in local storage');
      return;
    }
    const { username, password } = JSON.parse(storedUserData);

    const data = {
      username,
      password,
      url: window.location.pathname,
      title: document.title,
    };

    fetch('http://localhost:5000/addToFavorites', {
      method: 'POST', // Use DELETE method if removing from favorites, POST method if adding
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          // If response is not OK, handle the error
          return response.json().then(errorResponse => {
            throw new Error(errorResponse.error);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Response from server:', data); // Log the response here
        // Handle success if needed
      })
      .catch(error => {
        console.error('Error adding/removing from favorites:', error.message);
        setError(error.message);
      });
  };

  return (
    <React.Fragment>
       <div onClick={handleToggleFavorite} style={{ cursor: 'pointer' }}>
        {/* Render different icon based on isFavorite state */}
       {isFavorite ? (
 <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
 <path fill="none" d="M0 0h24v24H0z"/>
 <path fill="#000000" d="M12 2l3.09 6.45L22 9.24l-5.59 5.46L18.18 22 12 18.25 5.82 22l1.77-7.31L2 9.24l6.91-.79z"/>
</svg>


) : (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFD700" d="M12 2l3.09 6.45L22 9.24l-5.59 5.46L18.18 22 12 18.25 5.82 22l1.77-7.31L2 9.24l6.91-.79z"/>
  </svg>
)}

      </div>
      <Row className='pad_gap'> 
        <Col md={4}></Col>
        <Col md={4}></Col>
        <Col md={4} style={{ textAlign: 'end' }}>
        <Link to="/basic/create_process">
  <Button variant='primary' className="text-capitalize">
    <i className='feather icon-arrow-left' />
    Back
  </Button>
  </Link>
</Col>

          </Row>
     <Row>

      

 
      <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Create Process </Card.Title>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={12}>
                  <Form>
                  <Row> 
                  {/* <Col md={4}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                    <Form.Label>Broker</Form.Label>
                    <Form.Control as="select">
                      <option>AB</option>
                      <option>AN</option>
                      <option>GC</option>
                      <option>ICICI</option>
                      <option>ZE</option>
                    </Form.Control>
                  </Form.Group>
                  </Col> */}
                  <Col md={6}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Process Code</Form.Label>
                    <Form.Control type="text" placeholder="Process Code" />
                  </Form.Group>
                  
                    </Col>
                    <Col md={6}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Process  Name</Form.Label>
                    <Form.Control type="text" placeholder="Process  Name" />
                  </Form.Group>
                  
                    </Col>
                    </Row>
                    <Row> 
                  <Col md={6}>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
  <Form.Label>STATUS</Form.Label>
  <div style={{ position: 'relative' }}>
    <Form.Control as="select">
      <option>ALL</option>
      <option>Order Placed</option>
      <option>Order Received</option>
      <option>Order Rejected</option>
      <option>Success</option>
    </Form.Control>
    <button
      type="button"
      style={{
        position: 'absolute',
        top: '0px',
        right: '0px',
        padding: '11px 15px',
        border: 'none',
        background: 'rgb(76, 108, 174)',
        cursor: 'pointer',
        color: 'white',
        borderRadius: '0 5px 5px 0', // Removed semicolon and added camelCase for borderRadius
      }}
      
      onClick={() => {
        // Handle reset action here
        console.log("Reset action triggered");
      }}
    >
      <i className='feather icon-refresh-cw' />

    </button>
  </div>
</Form.Group>

                  </Col>
                  <Col md={6}>
              
                  
                    </Col>
                  
                    </Row>
                    <Row>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                  </Form.Group>
                    </Row>
                    <Row>
                    <Col md={8}>
              
                  
              </Col>
              <Col md={2} style={{ textAlign: 'end' }}>
              <Button  variant="primary" className="pull-right">
  Submit
</Button> 
                  
              </Col>
              <Col style={{ textAlign: 'end' }} md={2}>

<Link to="/basic/create_process">
                 
               
           
              <Button  variant="primary" className="pull-right">
  Cancel
</Button>
</Link> 

                  
              </Col>
                    </Row>
                  
                  </Form>
                </Col>
                <Col md={6}>
                 
                
               
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

    
    
    </Row> 
    </React.Fragment>
  );
};

export default Create_process;
