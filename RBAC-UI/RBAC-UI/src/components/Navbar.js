import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSearch } from '../contexts/SearchContext';

const Navbar = () => {
  const location = useLocation();
  const { searchTerm, setSearchTerm } = useSearch();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-indigo-700' : '';
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white w-64 space-y-6 py-7 px-2">
      <div className="text-2xl font-bold text-center mb-6 text-yellow-300">RBAC Admin</div>
      <div className="px-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded bg-purple-500 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />
      </div>
      <ul>
        <NavItem to="/" text="Dashboard" isActive={isActive('/')} />
        <NavItem to="/users" text="Users" isActive={isActive('/users')} />
        <NavItem to="/roles" text="Roles" isActive={isActive('/roles')} />
        <NavItem to="/permissions" text="Permissions" isActive={isActive('/permissions')} />
      </ul>
    </nav>
  );
};

const NavItem = ({ to, text, isActive }) => (
  <li className="mb-2">
    <Link
      to={to}
      className={`flex items-center space-x-2 p-2 rounded hover:bg-indigo-700 transition-colors duration-200 ${isActive}`}
    >
      <span>{text}</span>
    </Link>
  </li>
);

export default Navbar;

