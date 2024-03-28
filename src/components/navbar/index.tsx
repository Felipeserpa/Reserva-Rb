

import {Link} from "react-router-dom"

import { VscAccount } from "react-icons/vsc";
import { GrLogin } from "react-icons/gr";


import { useState } from 'react';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false); // Exemplo de uso de useState, mas não de loadingauth
  const [isLogged, setIsLogged] = useState(false)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    
  };
  const handleLogout = () => {
    // Lógica para fazer logout do cliente
    setIsLogged(false);
  };

  return (
    <nav className="bg-gray-800 p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">
          <img src="image/logo.jpg" className="rounded-full" alt="barbearia" style={{ width: 50 }} />
        </div>
        <div className={`md:flex ${menuOpen ? 'block' : 'hidden'}`}>
          <ul className="md:flex items-center">
            <li className="text-white  hover:bg-slate-200 mx-2  rounded-lg hover:text-slate-900 cursor-pointer"><Link to="/cliente">Agendar</Link></li>
            <li className="text-white mx-2 cursor-pointer  hover:bg-slate-200  rounded-lg hover:text-slate-900">Produtos</li>
            <li className="text-white mx-2 cursor-pointer  hover:bg-slate-200  rounded-lg hover:text-slate-900">Sobre</li>
            <li className="text-white mx-2 cursor-pointer  hover:bg-slate-200  rounded-lg hover:text-slate-900">Minha conta</li>
          </ul>
          <div>
            {isLogged ? (
              <button onClick={handleLogout} className="text-white">
                Sair
                <GrLogin className="ml-2" />
              </button>
            ) : (
              <Link to="/login" className="text-white">
                Entrar
                <VscAccount className="ml-2" />
              </Link>
            )}
          </div>
        </div>
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;


