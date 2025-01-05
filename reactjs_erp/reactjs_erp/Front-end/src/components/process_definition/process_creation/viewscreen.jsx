import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Form } from 'react-bootstrap';

const View_process = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all users' roles
  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:5000/getAllUserRoles');
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  // Modify the user role
  const modifyUserRole = async (email, newRole) => {
    try {
      const response = await axios.post('http://localhost:5000/modifyUserDetails', { email, newRole });
      alert(response.data.message); // Notify success
      // Update the table row immediately
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      alert(err.response?.data?.error || 'Error updating user role');
    }
  };

  // Handle role change in the dropdown
  const handleRoleChange = (email, event) => {
    const newRole = event.target.value;
    modifyUserRole(email, newRole);
  };

  // Fetch users when the component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      {loading && <div>Loading...</div>}
      {error && <div className="text-danger">{error}</div>}
      {!loading && !error && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.user_id}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Form.Control
                    as="select"
                    value={user.user_role}
                    
                  >
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Manager">auth</option>
                  </Form.Control>
                </td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => modifyUserRole(user.email, user.user_role)}
                  >
                    Modify
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default View_process;
