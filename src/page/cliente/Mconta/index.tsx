import { SetStateAction, useEffect, useState } from "react";
import Navbar from "../../../components/navbar";

export default function Mconta() {
  const [currentPage, setCurrentPage] = useState("page-1");

  const handleClick = (nextPage: SetStateAction<string>) => {
    setCurrentPage(nextPage); // Update state on link click
  };

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
              <span className="text-sm"></span>
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
            <div></div>
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
