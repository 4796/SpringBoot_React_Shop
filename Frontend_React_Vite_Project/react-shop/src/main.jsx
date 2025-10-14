import { StrictMode } from 'react'            //komponenta koja pomaze da se otkriju problemi
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(       //uzima element nazvan root i renderuje ga
  <StrictMode>              
    <App />             
  </StrictMode>,
)//za render roota koristi APP
