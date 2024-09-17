import { SetStateAction, useEffect, useState } from "react";
import Navbar from "../../../components/navbar";

import {
  onSnapshot,
  query,
  orderBy,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../services/firebaseConection";

export default function Mconta() {
  const [currentPage, setCurrentPage] = useState("page-1");

  const [agendamentos, setAgendamentos] = useState([]);

  const handleClick = (nextPage: SetStateAction<string>) => {
    setCurrentPage(nextPage); // Update state on link click
  };
  useEffect(() => {
    async function fetchAgendamentos() {
      try {
        const postsRef = collection(db, "agUser");
        const querySnapshot = await getDocs(postsRef);

        if (!querySnapshot.empty) {
          const lista = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            nome: doc.data().nome,
            userId: doc.data().userId,
            date: doc.data().date,
            tel: doc.data().tel,
            time: doc.data().time,
            opcaoSelecionada: doc.data().opcaoSelecionada,
            cortes: doc.data().cortes,
            // Adicione outras propriedades conforme necessário
          }));
          setAgendamentos(lista);
        }
      } catch (error) {
        console.error("Erro ao carregar os agendamentos:", error);
      }
    }

    fetchAgendamentos();
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

        <div className="content flex-grow p-4 bg-white">
          <div
            id="pagina-2"
            className={currentPage === "page-2" ? "" : "hidden"}
          >
            <h1>Conteúdo da Página 2</h1>
            {/* Adicione o conteúdo da página 2 aqui */}
          </div>

          <div
            id="pagina-3"
            className={currentPage === "page-3" ? "" : "hidden"}
          >
            <p className="font-bold">Minhas Reservas</p>
            <div className="flex flex-wrap gap-4">
              {agendamentos.map((agendamento) => (
                <article
                  key={agendamento.id}
                  className="p-4 bg-white shadow-md rounded-lg flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <p className="font-bold"> Nome:{agendamento.nome}</p>
                  Data:{agendamento.date}
                  Hora: {agendamento.time}
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
