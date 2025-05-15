import { useState } from 'react'

import './App.css'
import Header from './Components/Header'
import Add from './Components/Add';
import {  Routes,Route } from 'react-router'
import Home from './Components/Home';
import EditPatient from './Components/Edit';
// import PatientForm from './Components/Etc.JSX';


function App() {


  return (
    <>
      <Header/>
      <Routes>
       <Route path="/add" element={<Add />} />
       <Route path="/" element={<Home />} />
       <Route path="/edit/:id" element={<EditPatient />} />
      </Routes>
      {/* l<PatientForm/> */}
    </>
  )
}

export default App
