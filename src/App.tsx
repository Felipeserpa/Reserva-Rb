import { createBrowserRouter } from "react-router-dom";

import  Home from "./page/home"
import  Cadastro  from './page/cadastro'
import   Login  from './page/login'
import Cliente from "./page/cliente";
import  Admin from "./page/admin";
import AdminLogin from "./page/AdminLogin";

const router =createBrowserRouter([


  
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/cadastro',
    element:<Cadastro/>

  },
  {
    path:'/login',
    element:<Login/>
  },
  {

       path:'/cliente',
       element: <Cliente />

  },
  {
    path:'/admin',
    element:<Admin />
    
      
  },{
    path:'/AdminLogin',
    element:<AdminLogin/>
  }



])
export {router}