// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { router } from './routes/Routes'; // Assuming routes are defined elsewhere
import { RouterProvider } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
