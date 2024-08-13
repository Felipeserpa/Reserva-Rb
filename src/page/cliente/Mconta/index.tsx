import { SetStateAction, useEffect, useState } from "react";
import Navbar from "../../../components/navbar";

import {
  onSnapshot,
  query,
  orderBy,
  where,
  collection,
} from "firebase/firestore";
import { db } from "../../../services/fireaseConection";

export default function Mconta() {
  const [currentPage, setCurrentPage] = useState("page-1");
  const [user, setUser] = useState([]);
  const {tarefas, setTarefas] = useState([]);

  const handleClick = (nextPage: SetStateAction<string>) => {
    setCurrentPage(nextPage); // Update state on link click
  };

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser");
      if (userDetail) {
        setUser(JSON.parse(userDetail));

        const data = JSON.parse(userDetail);

        const tarefaRef = collection(db, "agUser");
        const q = query(
          tarefaRef,
          orderBy("created", "desc"),
          where("userUid", "==", data?.uid)
        );
        const unsub = onSnapshot(q, (snapshot) => {
         let lista: { id: string; tarefas: any; userUid: any; }[] = [];
         snapshot.forEach((doc)=>{
          lista.push({
            id:doc.id,
            tarefas:doc.data().tarefas,
            userUid:doc.data().userUid
          })
         })
         console.log(lista)
       setTarefas(lista)



        });
      }
    }
    loadTarefas();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="flex h-screen ">
        <div className="w-1/14  sm:w-1/4 md:w-1/6">
          {/* Conteúdo da coluna aqui */}
          <nav className=" flex-1 flex flex-col text-white">
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
              onClick={() => handleClick("page-3")}
            >
              <span className="text-sm">Agendamentos e Reservas</span>
            </a>
          </nav>
        </div>

        <div className="content flex-grow p-4  bg-white">
          <div
            id="pagina-2"
            className={currentPage === "page-2" ? "" : "hidden"}
          >
            <h1>Conteúdo da Página 2</h1>
            {/* Add your page 2 content here */}
          </div>

          <div
            id="pagina-3"
            className={currentPage === "page-3" ? "" : "hidden"}
          >
            <h1>Conteúdo da Página 3</h1>
            {/* Add your page 2 content here */}
          </div>
        </div>
      </div>
    </div>
  );
}
function loadTarefas(): import("react").DependencyList | undefined {
  throw new Error("Function not implemented.");
}
