import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
import {Route,Routes} from 'react-router-dom'
import Form from './Components/Form';
import Homepage from './Components/Homepage';


function App() {



  return (
    <>
   
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    
    
    </>
  );
}

export default App;
