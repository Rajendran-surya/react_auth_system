import React from 'react';
import { Link } from 'react-router-dom';
import {Row, Col ,Card, Form, Button,Table ,Dropdown, DropdownButton} from 'react-bootstrap';
import exportToExcel from './exportToExcel';



const handleExportToExcel = () => {
  // Define your data here or retrieve it from somewhere
  const processes = [
    { id: 1, processCode: 'Mark', processName: 'Otto', description: '@mdo', status: 'Otto' },
    { id: 2, processCode: 'Jacob', processName: 'Thornton', description: '@fat', status: 'Otto' }
  ];
  exportToExcel(processes);
};


const BasicButton = () => {
  return (
    <React.Fragment>
      <Row className='pad_gap'> 
        <Col md={4}></Col>
        <Col md={4}></Col>
        <Col md={4} style={{ textAlign: 'end' }}>
        <Link to="/basic/create_process">
  <Button variant='primary' className="text-capitalize">
    <i className='feather icon-plus' />
    Add Process
  </Button>
  </Link>
</Col>

          </Row>
     <Row>

      

 
      <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Search Process </Card.Title>
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
                    <Col md={4}>
              
                  
              </Col>
              <Col md={4}>
              
                  
              </Col>
              <Col style={{ textAlign: 'end' }} md={4}>
              <Button  variant="primary" className="pull-right">
  SEARCH
</Button>

                  
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



    <Row>
      <Col md={12}>

      <Card>
            <Card.Header>
              <Card.Title as="h5">Process Details</Card.Title>
          
            </Card.Header>
            <Card.Body>
           <Row>
            <Col md={6}>
            <Form.Control type="text" placeholder="Search..." />
            </Col>
            <Col md={3}>
            <DropdownButton title="Filter" className="ml-2">
                  <Dropdown.Item href="#">Filter 1</Dropdown.Item>
                  <Dropdown.Item href="#">Filter 2</Dropdown.Item>
                  <Dropdown.Item href="#">Filter 3</Dropdown.Item>
                </DropdownButton>
            </Col>
            <Col md={3}>
            <Button variant="primary" className="ml-2" onClick={handleExportToExcel}>
            <i  style={{ color: 'white' }}  className="feather icon-download"  />
                </Button>
            </Col>
           </Row>
          
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Process code</th>
                    <th>Process Name</th>
                    <th>Description</th>
                    <th>Status </th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>Otto</td>
                    <td> <Link to="/basic/edit_process"> {/* Link to the edit page */}
          <Button variant='btn-edit-view' className="btn-edit-view">
            <i className="feather icon-edit" /> {/* Edit icon */}
            
          </Button>
        </Link>
        <Link to="/basic/view_process"> {/* Link to the view page */}
          <Button variant='btn-edit-view' className="btn-edit-view">
            <i className="feather icon-eye" /> {/* View icon */}
            
          </Button>
        </Link></td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td>Otto</td>
                    <td> <Link to="/edit-page"> {/* Link to the edit page */}
          <Button variant='btn-edit-view' className="btn-edit-view">
            <i className="feather icon-edit" /> {/* Edit icon */}
            
          </Button>
        </Link>
        <Link to="/view-page"> {/* Link to the view page */}
          <Button variant='btn-edit-view' className="btn-edit-view">
            <i className="feather icon-eye" /> {/* View icon */}
            
          </Button>
        </Link></td>
                  </tr>
                 
                </tbody>
              </Table>
            </Card.Body>
          </Card>
      </Col>
    </Row>
    </React.Fragment>
  );
};

export default BasicButton;
