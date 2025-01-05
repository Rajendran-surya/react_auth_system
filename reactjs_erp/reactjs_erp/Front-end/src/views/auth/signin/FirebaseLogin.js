import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Row, Col, Button, Alert } from 'react-bootstrap';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for making HTTP requests

const FirebaseLogin = ({ className, onLogin, ...rest }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [error, setError] = useState(null); // State to store authentication error

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          username: '',
          password: '',
          rememberMe: false
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().required('Username is required'),
          password: Yup.string().required('Password is required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          // Send login request to backend server
          axios.post('http://localhost:5000/Login', values)
            .then(response => {
              // If login is successful, call the onLogin callback with username and password
              onLogin(values);
              // If login is successful, navigate to the dashboard
              navigate('/app/basic/create_process');
            })
            .catch(error => {
              // If there's an error with authentication, display the error message
              setError(error.response.data.error);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
            <div className="form-group mb-3">
              <input
                className="form-control"
                name="username"
                placeholder='Username'
                onBlur={handleBlur}
                onChange={handleChange}
                type="text"
                value={values.username}
              />
              {touched.username && errors.username && <small className="text-danger form-text">{errors.username}</small>}
            </div>
            <div className="form-group mb-4">
              <input
                className="form-control"
                placeholder='Password'
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.password}
              />
              {touched.password && errors.password && <small className="text-danger form-text">{errors.password}</small>}
            </div>

            {error && (
              <Col sm={12}>
                <Alert variant="danger">{error}</Alert>
              </Col>
            )}

            <div className="custom-control custom-checkbox  text-start mb-4 mt-2">
              <input type="checkbox" className="custom-control-input" id="customCheck1" />
            
              <label className="custom-control-label" htmlFor="customCheck1">
                <span style={{ marginLeft: '10px' }}>Remember Me.</span>
              </label>
            </div>

            <Row>
              <Col mt={2}>
                <Button className="btn-block" disabled={isSubmitting} size="large" type="submit" variant="primary">
                  Login
                </Button>
              </Col>
            </Row>
          </form>
        )}
      </Formik>

      <hr />
    </React.Fragment>
  );
};

FirebaseLogin.propTypes = {
  className: PropTypes.string,
  onLogin: PropTypes.func.isRequired
};

export default FirebaseLogin;
