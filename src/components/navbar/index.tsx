import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">
        <img src="image/logo.jpg" className="rounded-full" alt="barbearia" style={{ width:50 }} />
        </div>
        <div className={`md:flex ${menuOpen ? 'block' : 'hidden'}`}>
          <ul className="md:flex items-center">
            <li className="text-white  hover:bg-slate-200 mx-2  rounded-lg hover:text-slate-900 cursor-pointer">Agendar</li>
            <li className="text-white mx-2 cursor-pointer  hover:bg-slate-200  rounded-lg hover:text-slate-900">Produtos</li>
            <li className="text-white mx-2 cursor-pointer  hover:bg-slate-200  rounded-lg hover:text-slate-900">Sobre</li>
            <li className="text-white mx-2 cursor-pointer  hover:bg-slate-200  rounded-lg hover:text-slate-900">Minha conta</li>
            <li className="text-white mx-2 cursor-pointer  hover:bg-slate-200  rounded-lg hover:text-slate-900">Sair</li>
          </ul>
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
};

export default Navbar;
