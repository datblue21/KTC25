// Create LoginContext to manage login state
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from '../pages/Login';
import Tasks from '../pages/Tasks';
import Customer from '../pages/Customer';
import PrivateRoute from '../components/PrivateRoute';

export default function TasksManagementWithZustand() {
  return (
    <div className="bg-gray-50">
      <BrowserRouter>
        <div className="container-fluid mx-auto px-8 py-4">
          <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/tasks"
              element={
              <PrivateRoute>
                <Tasks />
              </PrivateRoute>
              }
            />
            <Route
              path="/customer"
              element={
                <PrivateRoute>
                  <Customer />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}