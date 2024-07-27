import { SetStateAction, useEffect, useId, useState } from "react";
import Navbar from "../../../components/navbar";

import logoBarb from "./../../../../public/images/logo.jpg";

export default function Mconta() {
  const [currentPage, setCurrentPage] = useState("page-1");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (nextPage: SetStateAction<string>) => {
    setCurrentPage(nextPage); // Update state on link click
  };

  function editar() {
    const userid = localStorage.getItem("@detailUser");

    if (userid) {
      let userDetailObject = JSON.parse(userid);
      const uid = userDetailObject.uid;
      console.log("UID do usuário:", uid);
    }
  }

  return (
    <div>
      <Navbar />

      <div className="flex h-screen ">
        <div className="w-1/14  sm:w-1/4 md:w-1/6">
          {/* Conteúdo da coluna aqui */}
          <nav className=" flex-1 flex flex-col text-white">
            <a
              className="nav-link flex p-3 hover:bg-gray-700 text-white  mb-2 text-base"
              onClick={() => handleClick("page-1")}
            >
              <span className="text-sm">Perfil do Usuário</span>
            </a>
            <a
              href="#"
              className="nav-link flex p-3 hover:bg-gray-700  mb-2 text-base"
              onClick={() => handleClick("page-2")}
            >
              <span className="text-sm">Histórico de Compras</span>
            </a>
            <a
              href="#"
              className="nav-link flex p-3 hover:bg-gray-700  mb-2 text-base"
            >
              <span className="text-sm">Agendamentos e Reservas</span>
            </a>
          </nav>
        </div>

        <div className="content flex-grow p-4  bg-white">
          <div
            id="pagina-1"
            className={currentPage === "page-1" ? "" : "hidden"}
          >
            <div>
              <div className="grid justify-items-center mt-24">
                <img
                  src={logoBarb}
                  className="rounded-full"
                  alt="barbearia"
                  style={{ width: 200 }}
                />
                <form className="w-full max-w-xl flex flex-col  p-2 ">
                  <label className="p-1">Nome:</label>

                  <input
                    type="text"
                    className="rounded pl-1 border-slate-950 border-solid border-2"
                    placeholder="Digite seu nome"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />

                  <label className="p-1">Email:</label>

                  <input
                    type="email"
                    className="rounded pl-1 border-slate-950 border-2"
                    placeholder="Digite seu email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <label className="p-1  ">Senha:</label>

                  <input
                    type="password"
                    className="rounded pl-1 border-slate-950 border-2 "
                    placeholder="Digite sua senha"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="h-9 mt-3  bg-blue-600 rounded border-1 text-lg font-medium text-white p-1"
                    onClick={() => editar()}
                  >
                    Editar
                  </button>
                  <button className="h-9 mt-3  bg-blue-600 rounded border-1 text-lg font-medium text-white p-1">
                    Salvar Alterações
                  </button>
                </form>
              </div>
            </div>
            {/* Add your page 1 content here */}
          </div>

          <div
            id="pagina-2"
            className={currentPage === "page-2" ? "" : "hidden"}
          >
            <h1>Conteúdo da Página 2</h1>
            {/* Add your page 2 content here */}
          </div>
        </div>
      </div>
    </div>
  );
}
