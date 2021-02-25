import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/Dashboard';

import TestView from './views/test'

const routes = [
  {path:'/',element:<TestView />},
]

export default routes;