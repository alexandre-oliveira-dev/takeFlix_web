import React from "react";
import './App.css'
import RoutesApp from './services/router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <ToastContainer autoClose={3000}></ToastContainer>
        <RoutesApp></RoutesApp>
      </BrowserRouter>
    </div>
  )
}

export default App;