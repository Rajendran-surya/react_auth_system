import React, { useState, useEffect } from 'react';
import { Button, Form, Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const View_process = () => {
  // State to hold the username, password, and new password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch username and password from localStorage on component mount
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const { username, password } = JSON.parse(storedUserData);
      setUsername(username);
      setPassword(password);
    } else {
      setError('User data not found in local storage');
    }
  }, []);

  // Handle the password reset API call
  const handleResetPassword = () => {
    if (!newPassword) {
      setError('Please enter a new password');
      return;
    }

    axios.post('http://localhost:5000/changepassword_details', {
      username: username,
      newPassword: newPassword,
    })
    .then(response => {
      setSuccess('Password successfully reset');
      setPassword(newPassword); // Update the password in the state
    })
    .catch(err => {
      console.error('Error resetting password:', err);
      setError('Failed to reset password');
    });
  };

  return (
    <React.Fragment>
      <Row className="pad_gap">
        <Col md={4}></Col>
        <Col md={4}></Col>
        <Col md={4}></Col>
      </Row>

      <Row>
        <Col sm={12}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Change Password</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3" controlId="formBasicNewPassword">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
                <Row>
                  <Col style={{ textAlign: 'end' }} md={4}>
                    <Button
                      variant="primary"
                      className="pull-right"
                      onClick={handleResetPassword}
                    >
                      change Password
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default View_process;
