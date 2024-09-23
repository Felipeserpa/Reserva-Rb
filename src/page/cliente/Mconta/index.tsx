import { SetStateAction, useEffect, useState } from "react";
import Navbar from "../../../components/navbar";

import {
  onSnapshot,
  query,
  where,
  collection,
  orderBy,
} from "firebase/firestore";

import { db } from "../../../services/firebaseConection";

interface agendamentos {
  opcaoSelecionada: ReactNode;
  id: string;
  nome: string;
  data: string;
  time: string;
  tel: string;
  cortes: string;
  opcaoselecionada: string;
}

export default function Mconta() {
  const [currentPage, setCurrentPage] = useState("page-1");

  const [user, setUser] = useState({});

  const [agendamento, setAgendamento] = useState<agendamentos[]>([]);

  const handleClick = (nextPage: SetStateAction<string>) => {
    setCurrentPage(nextPage); // Update state on link click
  };

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser");
      setUser(JSON.parse(userDetail));

      if (userDetail) {
        const data = JSON.parse(userDetail);

        const tarefaRef = collection(db, "agUser");
        const q = query(
          tarefaRef,
          orderBy("created", "desc"),
          where("userUid", "==", data?.uid)
        );
        console.log(tarefaRef);

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const lista:
            | ((prevState: agendamentos[]) => agendamentos[])
            | { id: string; nome: string }[] = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nome: doc.data().nome,
              date: doc.data().date,
              time: doc.data().time,
              tel: doc.data().tel,
              cortes: doc.data().cortes,
              opcaoSelecionada: doc.data().opcaoSelecionada,
            });
          });

          setAgendamento(lista);
        });

        // Retornar a função de cancelamento para desinscrever no momento certo
        return () => {
          unsubscribe();
        };
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

        <div className="content flex-grow p-4 bg-white">
          <div
            id="pagina-2"
            className={currentPage === "page-2" ? "" : "hidden"}
          >
            <h1></h1>
            {/* Adicione o conteúdo da página 2 aqui */}
          </div>

          <div
            id="pagina-3"
            className={currentPage === "page-3" ? "" : "hidden"}
          >
            <p className="font-bold">Meus Agendamentos</p>
            <div className="flex flex-wrap gap-4">
              {agendamento.map((agendamentos) => (
                <article
                  key={agendamentos.id}
                  className="p-4 bg-white shadow-md rounded-lg flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <p className="font-bold"> Nome:{agendamentos.nome}</p>
                  <p className="font-bold"> Data:{agendamentos.date}</p>
                  <p className="font-bold"> Hora:{agendamentos.time}</p>
                  <p className="font-bold"> Contato:{agendamentos.tel}</p>
                  <p className="font-bold">
                    {" "}
                    Modelo de Corte:{agendamentos.cortes}
                  </p>
                  <p className="font-bold">
                    Profissional:{agendamentos.opcaoSelecionada}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
