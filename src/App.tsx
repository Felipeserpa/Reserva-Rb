import { createBrowserRouter } from "react-router-dom";

import Home from "./page/home";
import Cadastro from "./page/cadastro";
import Login from "./page/Login";

import Cliente from "./page/cliente";
import Mconta from "./page/cliente/Mconta";
import Admin from "./page/admin";
import AdminLogin from "./page/AdminLogin";
import Sobre from "./page/sobre";
import RecSenha from "./page/Login/RecSenha";
import { Private } from "../src/routes/Private";
import PrivateRoute from "./routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/cliente",
    element: (
      <Private>
        <Cliente />
      </Private>
    ),
  },
  {
    path: "/Mconta",
    element: <Mconta />,
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute path={"/admin"} element={<Admin />}>
        <Admin />
      </PrivateRoute>
    ),
  },
  {
    path: "/AdminLogin",
    element: <AdminLogin />,
  },
  {
    path: "/sobre",
    element: <Sobre />,
  },
  {
    path: "/login/RecSenha",
    element: <RecSenha />,
  },
]);
export { router };
