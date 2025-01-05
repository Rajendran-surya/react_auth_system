import React from 'react';
import { Link } from 'react-router-dom';
import {Row, Col ,Card, Form, Button} from 'react-bootstrap';




const View_process = () => {
  return (
    <React.Fragment>
      <Row className='pad_gap'> 
        <Col md={4}></Col>
        <Col md={4}></Col>
        <Col md={4} style={{ textAlign: 'end' }}>
        <Link to="/basic/button">
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
              <Card.Title as="h5">Edit Process </Card.Title>
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
              <Col md={4} style={{ textAlign: 'end' }} >
              <Button  variant="primary" className="pull-right">
  Submit
</Button> 
                  
             
              <Button  variant="primary" className="pull-right">
  Update
</Button>

<Link to="/basic/button">
                 
               
           
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

export default View_process;
