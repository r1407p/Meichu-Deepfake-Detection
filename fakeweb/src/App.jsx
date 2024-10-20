import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import './styles/index.css'

function App() {

  return (
    <>
      <Navbar/>
      <main className={`min-h-screen transition-all duration-300`}>
        <Outlet/>
      </main>
    </>
  )
}

export default App
