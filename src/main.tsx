import React from 'react'
import ReactDOM from 'react-dom/client'
import {router} from './App.tsx'
import {RouterProvider} from 'react-router-dom'
import './index.css'

import { AuthProvider } from "c:/Users/Felipe serpa/OneDrive/Documentos/React Projetos/reserva-barbearia/src/contexts/AuthContext";




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
<AuthProvider>
     <RouterProvider router={router}/>
</AuthProvider>

  </React.StrictMode>,
)
