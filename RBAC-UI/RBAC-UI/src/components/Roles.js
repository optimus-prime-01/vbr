import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearch } from '../contexts/SearchContext';

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [permissions, setPermissions] = useState([]);
  const { searchTerm } = useSearch();

  useEffect(() => {
    fetchRoles();
    fetchPermissions();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/roles');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchPermissions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/permissions');
      setPermissions(response.data);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === 'permissions') {
      const selectedPermissions = Array.from(e.target.selectedOptions, (option) => option.value);
      setNewRole({ ...newRole, permissions: selectedPermissions });
    } else {
      setNewRole({ ...newRole, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/roles', newRole);
      setNewRole({ name: '', permissions: [] });
      fetchRoles();
    } catch (error) {
      console.error('Error creating role:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/roles/${id}`);
      fetchRoles();
    } catch (error) {
      console.error('Error deleting role:', error);
    }
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.permissions.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Roles</h1>
      <form onSubmit={handleSubmit} className="mb-8 bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newRole.name}
            onChange={handleInputChange}
            placeholder="Role Name"
            className="p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <select
            name="permissions"
            value={newRole.permissions}
            onChange={handleInputChange}
            multiple
            className="p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          >
            {permissions.map((permission) => (
              <option key={permission._id} value={permission._id}>
                {permission.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded hover:from-purple-600 hover:to-indigo-600 transition-colors duration-200">
          Add Role
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-purple-200 to-indigo-200 text-indigo-700">
            <tr>
              <th className="py-3 px-6 text-left">Role Name</th>
              <th className="py-3 px-6 text-left">Permissions</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {filteredRoles.map((role) => (
              <tr key={role._id} className="border-b border-gray-200 hover:bg-purple-50">
                <td className="py-3 px-6 text-left whitespace-nowrap">{role.name}</td>
                <td className="py-3 px-6 text-left">
                  {role.permissions.map(permission => permission.name).join(', ')}
                </td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleDelete(role._id)}
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

export default Roles;

