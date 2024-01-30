import React, { useState } from 'react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 ">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">Logo</div>
        <div className={`md:flex ${menuOpen ? 'block' : 'hidden'}`}>
          <ul className="md:flex items-center">
            <li className="text-white mx-2 cursor-pointer">Agendar</li>
            <li className="text-white mx-2 cursor-pointer">Produtos</li>
            <li className="text-white mx-2 cursor-pointer">Sobre</li>
            <li className="text-white mx-2 cursor-pointer">Minha conta</li>
            <li className="text-white mx-2 cursor-pointer">Sair</li>
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
