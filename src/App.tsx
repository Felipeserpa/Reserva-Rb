import { createBrowserRouter } from "react-router-dom";

import  Home from "./page/home"
import  Cadastro  from './page/cadastro'
import   Login  from './page/Login'
import Cliente from "./page/cliente";
import  Admin from "./page/admin";
import AdminLogin from "./page/AdminLogin";

 import { Private } from "../src/routes/Private";
 import { PrivateAdmin } from "./routes/PrivateAdmin";


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
       element: <Private><Cliente /></Private>

  },
  {
    path:'/admin',
    element: <PrivateAdmin><Admin/></PrivateAdmin>
      
  },{
    
    path:'/AdminLogin',
    element:<AdminLogin/>
  }



])
export {router}