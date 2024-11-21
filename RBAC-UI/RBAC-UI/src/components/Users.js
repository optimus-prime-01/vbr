import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearch } from '../contexts/SearchContext';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });
  const [roles, setRoles] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const { searchTerm } = useSearch();

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users', newUser);
      setNewUser({ name: '', email: '', role: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig.key) {
      sortableUsers.sort((a, b) => {
        if (sortConfig.key === 'role.name') {
          if (a.role.name < b.role.name) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a.role.name > b.role.name) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
        } else {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const filteredUsers = sortedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Users</h1>
      <form onSubmit={handleSubmit} className="mb-8 bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="name"
            value={newUser.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="email"
            name="email"
            value={newUser.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <select
            name="role"
            value={newUser.role}
            onChange={handleInputChange}
            className="p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          >
            <option value="">Select Role</option>
            {roles.map(role => (
              <option key={role._id} value={role._id}>{role.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded hover:from-purple-600 hover:to-indigo-600 transition-colors duration-200">
          Add User
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-purple-200 to-indigo-200 text-indigo-700">
            <tr>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => requestSort('name')}>
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => requestSort('email')}>
                Email {sortConfig.key === 'email' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="py-3 px-6 text-left cursor-pointer" onClick={() => requestSort('role.name')}>
                Role {sortConfig.key === 'role.name' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {filteredUsers.map((user) => (
              <tr key={user._id} className="border-b border-gray-200 hover:bg-purple-50">
                <td className="py-3 px-6 text-left whitespace-nowrap">{user.name}</td>
                <td className="py-3 px-6 text-left">{user.email}</td>
                <td className="py-3 px-6 text-left">{user.role.name}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-gradient-to-r from-red-400 to-red-500 text-white px-3 py-1 rounded hover:from-red-500 hover:to-red-600 transition-colors duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

