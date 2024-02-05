import { createBrowserRouter } from "react-router-dom";

import  Home from "./page/home"
import  Cadastro  from './page/cadastro'
import   Login  from './page/login'
import Cliente from "./page/cliente";
import  Admin from "./page/admin";
import { Switch } from "react-router-dom";
import { AdminStatusProvider } from './components/context/adminStatus';
import { ClientStatusProvider } from './components/context/ClientStatusProvider';

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
    
       element: <Switch>
        <ClientStatusProvider>
        
         <Cliente />
      </ClientStatusProvider>

       </Switch>
   
  },
  {
    path:'/admin',
    element:<Switch>
        <AdminStatusProvider>
        
         <Admin />
      </AdminStatusProvider>
      
       </Switch>
  }


])
export {router}