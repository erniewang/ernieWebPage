import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { fetchAllFiles } from './googleDriveApi';

(async function() {
  if (!localStorage.getItem('fileNames')) {
    const fileNames = await fetchAllFiles();
    console.log("thing to storge",fileNames);
    localStorage.setItem("fileNames",  JSON.stringify(fileNames));
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>
  );
})();
