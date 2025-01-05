import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Row, Col, Card, Alert } from 'react-bootstrap';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword1 = ({ className, ...rest }) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  return (
    <React.Fragment>
      <Formik
        initialValues={{
          email: '',
          newPassword: '', // Added newPassword field
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Invalid email').required('Email is required'),
          newPassword: Yup.string().required('New password is required'), // Validation for new password
        })}
        onSubmit={(values, { setSubmitting }) => {
          axios
            .post('http://localhost:5000/resetpassword', values) // Sending both email and newPassword
            .then((response) => {
              setSuccess('Password successfully reset. Please log in with your new password.');
              setError(null);
              navigate('/login'); // Redirect to login page after 3 seconds
            })
            .catch((error) => {
              setError(error.response?.data?.error || 'An error occurred');
              setSuccess(null);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} className={className} {...rest}>
            <div className="auth-wrapper">
              <div className="auth-content">
                <Card className="borderless">
                  <Row className="align-items-center text-center">
                    <Col>
                      <Card.Body>
                        <div className="mb-4">
                          <i className="feather icon-mail auth-icon" />
                        </div>
                        <h3 className="mb-3 f-w-400">Reset Password</h3>
                        <div className="input-group mb-4">
                          <input
                            className="form-control"
                            name="email"
                            placeholder="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="text"
                            value={values.email}
                          />
                          {touched.email && errors.email && (
                            <small className="text-danger form-text">{errors.email}</small>
                          )}
                        </div>
                        <div className="input-group mb-4">
                          <input
                            className="form-control"
                            name="newPassword"
                            placeholder="New Password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            type="password"
                            value={values.newPassword}
                          />
                          {touched.newPassword && errors.newPassword && (
                            <small className="text-danger form-text">{errors.newPassword}</small>
                          )}
                        </div>
                        <button
                          className="btn btn-primary mb-4"
                          disabled={isSubmitting}
                          type="submit"
                        >
                          Reset Password
                        </button>
                      </Card.Body>
                    </Col>
                  </Row>
                </Card>
              </div>
            </div>

            {error && (
              <Col sm={12}>
                <Alert variant="danger">{error}</Alert>
              </Col>
            )}

            {success && (
              <Col sm={12} className="mt-2">
                <Alert variant="success">{success}</Alert>
              </Col>
            )}
          </form>
        )}
      </Formik>

      <hr />
    </React.Fragment>
  );
};

ResetPassword1.propTypes = {
  className: PropTypes.string,
};

export default ResetPassword1;
