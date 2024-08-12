import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App'; // Main App component
import Dashboard from './components/Dashboard';
import Flashcard from './components/Flashcard';


// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Component to render for root path
  },
  {
    path: '/dashboard',
    element: <Dashboard/>, // Component to render for /dashboard
  },
  {
    path: '/flashcard',
    element: <Flashcard/>, // Component to render for /flashcards
  },
  
]);

// Render the application
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
