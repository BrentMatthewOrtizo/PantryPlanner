// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from "react"; // Import React
import { StrictMode } from "react"; // Enforce React best practices
import { createRoot } from "react-dom/client"; // React 18 root API
import "./index.css"; // Global styles
import App from "./App.jsx"; // Main application component

// Ensure there's a valid root in index.html
const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found. Ensure index.html has a <div id='root'></div>.");
}

// Render the application
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
