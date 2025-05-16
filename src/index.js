import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

if (localStorage.getItem("graphSessionToken") === null) {
  localStorage.setItem("graphSessinToken", "");
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
