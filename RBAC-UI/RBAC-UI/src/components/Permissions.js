import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearch } from '../contexts/SearchContext';

const Permissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [newPermission, setNewPermission] = useState({ name: '', description: '' });
  const { searchTerm } = useSearch();

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/permissions');
      setPermissions(response.data);
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  };

  const handleInputChange = (e) => {
    setNewPermission({ ...newPermission, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/permissions', newPermission);
      setNewPermission({ name: '', description: '' });
      fetchPermissions();
    } catch (error) {
      console.error('Error creating permission:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/permissions/${id}`);
      fetchPermissions();
    } catch (error) {
      console.error('Error deleting permission:', error);
    }
  };

  const filteredPermissions = permissions.filter(permission =>
    permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Permissions</h1>
      <form onSubmit={handleSubmit} className="mb-8 bg-gradient-to-r from-purple-100 to-indigo-100 p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={newPermission.name}
            onChange={handleInputChange}
            placeholder="Permission Name"
            className="p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
          <input
            type="text"
            name="description"
            value={newPermission.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded hover:from-purple-600 hover:to-indigo-600 transition-colors duration-200">
          Add Permission
        </button>
      </form>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gradient-to-r from-purple-200 to-indigo-200 text-indigo-700">
            <tr>
              <th className="py-3 px-6 text-left">Permission Name</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {filteredPermissions.map((permission) => (
              <tr key={permission._id} className="border-b border-gray-200 hover:bg-purple-50">
                <td className="py-3 px-6 text-left whitespace-nowrap">{permission.name}</td>
                <td className="py-3 px-6 text-left">{permission.description}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => handleDelete(permission._id)}
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

export default Permissions;

