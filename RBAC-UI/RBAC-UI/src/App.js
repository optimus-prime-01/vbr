import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SearchProvider } from './contexts/SearchContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Users from './components/Users';
import Roles from './components/Roles';
import Permissions from './components/Permissions';

function App() {
  return (
    <Router>
      <SearchProvider>
        <div className="flex h-screen bg-gradient-to-br from-purple-100 to-indigo-100">
          <Navbar />
          <div className="flex-1 overflow-x-hidden overflow-y-auto p-6">
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/users" component={Users} />
              <Route path="/roles" component={Roles} />
              <Route path="/permissions" component={Permissions} />
            </Switch>
          </div>
        </div>
      </SearchProvider>
    </Router>
  );
}

export default App;

