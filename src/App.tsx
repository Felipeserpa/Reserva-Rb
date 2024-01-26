import { createBrowserRouter } from "react-router-dom";

import  Home from "./page/home"
import  Cadastro  from './page/cadastro'
import   Login  from './page/login'

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