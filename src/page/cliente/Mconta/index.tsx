import { SetStateAction, useState } from "react";
import Navbar from "../../../components/navbar";
export default function Mconta() {
  const [currentPage, setCurrentPage] = useState("page-1");

  const handleClick = (nextPage: SetStateAction<string>) => {
    setCurrentPage(nextPage); // Update state on link click
  };
  return (
    <div>
      <Navbar />
      <nav className="flex-1 flex flex-col">
        <a
          className="nav-link flex p-3 hover:bg-gray-700 text-white"
          onClick={() => handleClick("page-1")}
        >
          <span className="text-sm">Home</span>
        </a>
        <a
          href="#"
          className="nav-link flex p-3 hover:bg-gray-700"
          onClick={() => handleClick("page-2")}
        >
          <span className="text-sm">Dashboard</span>
        </a>
        <a href="#" className="nav-link flex p-3 hover:bg-gray-700">
          <span className="text-sm">Settings</span>
        </a>
      </nav>

      {/* Content Area */}
      <div className="content flex-grow p-4 text-center">
        <div id="pagina-1" className={currentPage === "page-1" ? "" : "hidden"}>
          <h1>Conteúdo da Página 1</h1>
          {/* Add your page 1 content here */}
        </div>

        <div id="pagina-2" className={currentPage === "page-2" ? "" : "hidden"}>
          <h1>Conteúdo da Página 2</h1>
          {/* Add your page 2 content here */}
        </div>
      </div>
    </div>
  );
}
