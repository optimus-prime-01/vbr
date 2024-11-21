import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Total Users" value="250" />
        <DashboardCard title="Active Roles" value="8" />
        <DashboardCard title="Permissions" value="24" />
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-3xl font-bold text-blue-600">{value}</p>
  </div>
);

export default Dashboard;

