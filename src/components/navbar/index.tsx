import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConection";

import {
  RiUser3Line,
  RiLogoutBoxRLine,
  RiMenu3Line,
  RiCloseLine,
  RiCalendarCheckLine,
  RiShoppingBag3Line,
} from "react-icons/ri"; // Troquei para Remix Icons que são mais modernos
import React from "react";

interface Users {
  nome: string;
}

function Navbar() {
  const [menuOpens, setMenuOpens] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [users, setUser] = useState<Users | null>(null);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Efeito para mudar o estilo ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    const userDetail = localStorage.getItem("@detailUser");
    if (userDetail) {
      setUser(JSON.parse(userDetail));
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      logout();
      navigate("/login"); // Geralmente volta para o login
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-[#0a0a05]/80 backdrop-blur-xl border-b border-white/5 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO E NOME */}
        <Link to="/cliente" className="flex items-center gap-3 group">
          <div className="relative">
            {users && (
              <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#0a0a05] rounded-full"></span>
            )}
          </div>
        </Link>

        {/* LINKS DESKTOP */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-zinc-400">
            <li className="hover:text-yellow-500 transition-colors">
              <Link to="/cliente" className="flex items-center gap-2">
                <RiCalendarCheckLine size={18} /> Agendar
              </Link>
            </li>
            <li className="hover:text-yellow-500 transition-colors">
              <Link to="/produtos" className="flex items-center gap-2">
                <RiShoppingBag3Line size={18} /> Produtos
              </Link>
            </li>
            <li className="hover:text-yellow-500 transition-colors">
              <Link to="/Mconta">Minha Conta</Link>
            </li>
          </ul>

          {/* PERFIL E LOGOUT */}
          <div className="flex items-center gap-4 pl-8 border-l border-white/10">
            <div className="text-right hidden lg:block">
              <p className="text-[10px] text-zinc-500 uppercase font-bold">
                Bem-vindo
              </p>
              <p className="text-sm text-white font-bold">
                {users?.nome || "Cliente"}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-zinc-300 hover:bg-yellow-500 hover:text-black transition-all">
                <RiUser3Line size={20} />
              </button>
              <button
                onClick={handleLogout}
                className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all"
              >
                <RiLogoutBoxRLine size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* BOTÃO MOBILE */}
        <button
          onClick={() => setMenuOpens(!menuOpens)}
          className="md:hidden text-white p-2 bg-white/5 rounded-lg"
        >
          {menuOpens ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
        </button>
      </div>

      {/* MENU MOBILE */}
      <div
        className={`md:hidden absolute top-full left-0 w-full bg-[#0f0f0a] border-b border-white/5 transition-all duration-300 overflow-hidden ${
          menuOpens ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="p-6 space-y-4">
          <MobileLink
            to="/cliente"
            label="Agendar"
            icon={<RiCalendarCheckLine />}
          />
          <MobileLink
            to="/produtos"
            label="Produtos"
            icon={<RiShoppingBag3Line />}
          />
          <MobileLink to="/Mconta" label="Minha Conta" icon={<RiUser3Line />} />
          <div className="h-[1px] bg-white/5 my-4"></div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 text-red-500 font-bold p-3 rounded-xl bg-red-500/5"
          >
            <RiLogoutBoxRLine size={20} /> Sair
          </button>
        </ul>
      </div>
    </nav>
  );
}

// Subcomponente para o Menu Mobile
function MobileLink({
  to,
  label,
  icon,
}: {
  to: string;
  label: string;
  icon: any;
}) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center gap-3 text-zinc-300 font-bold p-3 hover:bg-white/5 rounded-xl transition-all"
      >
        <span className="text-yellow-500">{icon}</span>
        {label}
      </Link>
    </li>
  );
}

export default Navbar;
