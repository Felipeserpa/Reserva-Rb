import { json, Link, useNavigate } from "react-router-dom";

import { VscAccount } from "react-icons/vsc";
import { GrLogin } from "react-icons/gr";
import { useEffect, useState } from "react";

import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConection";
import logoBarb from "./../../../public/images/logo.jpg";

function Navbar() {
  // Exemplo de uso de useState, mas não de loadingauth
  const [menuOpens, setMenuOpens] = useState(false);

  const [user, setUser] = useState({});

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const currentUser = auth.currentUser;
    const auths = getAuth();
    localStorage.setItem("currentUser", currentUser?.uid ?? "");
    logout();
    try {
      await signOut(auths);
      const storedUserId = localStorage.getItem("currentUser") ?? "";
      if (currentUser && currentUser.uid === storedUserId) {
        // Continue com o processo de logout
        navigate("/cliente");
        console.log("Usuário desconectado com sucesso!");
      } else {
        console.log("Logout ignorado - outro usuário já fez login.");
      }
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      // Lógica para fazer logout do cliente
    }
  };
  useEffect(() => {
    async function checkLogin() {
      const userDetail = localStorage.getItem("@detailUser");

      if (userDetail) {
        const userDetailObject = JSON.parse(userDetail);
        setUser(userDetailObject);
      }
    }

    checkLogin();
  }, []);

  const toggle = () => {
    setMenuOpens(!menuOpens);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
      <div className=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="/cliente"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src={logoBarb}
            className="rounded-full"
            alt="barbearia"
            style={{ width: 60 }}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Reserva Barbearia
          </span>
        </a>
        <button
          onClick={toggle}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`md:block ${
            menuOpens ? "block" : "hidden"
          } cursor-pointer`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">
              <Link to="/cliente">Agendar</Link>
            </li>
            <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              Produtos
            </li>
            <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              <Link to="/sobre">Sobre</Link>
            </li>
            <li className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              <Link to="/Mconta"> Minha conta</Link>
            </li>

            <Link to="/cliente" className="text-white mr-20">
              <VscAccount className="ml-2" size={25} />
              <h1>Seja bem-vindo {user.nome}</h1>
            </Link>
            <div>
              <button onClick={handleLogout} className="text-white">
                <GrLogin className="ml-2" size={20} />
              </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
