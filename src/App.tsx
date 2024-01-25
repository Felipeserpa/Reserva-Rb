import { createBrowserRouter } from "react-router-dom";

import  Home  from "./page/Home"
import  Cadastro  from './page/Cadastro'
import   Login  from './page/Login'

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
  

])
export {router}