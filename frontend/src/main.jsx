import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import { RecoilRoot } from 'recoil'; // Import RecoilRoot
// import App from './App.jsx';
// import './index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <RecoilRoot> {/* Wrap your App component with RecoilRoot */}
//       <App />
//     </RecoilRoot>
//   </React.StrictMode>,
// );