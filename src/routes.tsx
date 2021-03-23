import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/Dashboard';

import TestView from './views/testc'
import MainContent from './views/Main'
import RecordsData from './views/RecordsData'

const routes = [
  {path:'/',element: <DashboardLayout/ >,
   children:[
    {path:'app',element:<MainContent />},
    {path:'app/main', element:<MainContent />},
    {path:'app/list', element:<RecordsData />}
  ]
},
  {path:'*',element:<TestView />},
]

export default routes;