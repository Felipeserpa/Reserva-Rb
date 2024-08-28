import { SetStateAction, useEffect, useState } from "react";
import Navbar from "../../../components/navbar";

import {
  onSnapshot,
  query,
  orderBy,
  where,
  collection,
} from "firebase/firestore";
import { db } from "../../../services/firebaseConection";

export default function Mconta() {
  const [currentPage, setCurrentPage] = useState("page-1");
  const [user, setUser] = useState({});
  const [tarefas, setTarefas] = useState([]);

  const handleClick = (nextPage: SetStateAction<string>) => {
    setCurrentPage(nextPage); // Update state on link click
  };

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser");
      if (userDetail) {
        const data = JSON.parse(userDetail);
        console.log("Dados do usuário:", data); // Verifique os dados do usuário

        setUser(data);

        const tarefaRef = collection(db, "agUser");
        const q = query(
          tarefaRef,
          orderBy("created", "desc"),
          where("userUid", "==", data?.uid)
        );
        console.log("Consulta Firestore:", q); // Verifique a consulta

        const unsub = onSnapshot(q, (snapshot) => {
          console.log("Snapshot size:", snapshot.size); // Verifique o tamanho do snapshot
          if (snapshot.empty) {
            console.log("Nenhum documento encontrado.");
          } else {
            let lista: {
              id: string;
              nome: any;
              userId: any;
              cortes: any;
              date: any;
              tel: any;
              time: any;
              opcaoSelecionada: any;
            }[] = [];
            snapshot.forEach((doc) => {
              console.log("Documento encontrado:", doc.data()); // Verifique os dados do documento
              lista.push({
                id: doc.id,
                nome: doc.data().nome,
                userId: doc.data().userId,
                date: doc.data().date,
                tel: doc.data().tel,
                time: doc.data().time,
                opcaoSelecionada: doc.data().opcaoSelecionada,
                cortes: doc.data().cortes,
              });
            });
            console.log("Lista de Tarefas:", lista);
            setTarefas(lista); // Atualiza o estado de tarefas
          }
        });

        // Cleanup subscription on unmount
        return () => unsub();
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
            <h1>Conteúdo da Página 2</h1>
            {/* Adicione o conteúdo da página 2 aqui */}
          </div>

          <div
            id="pagina-3"
            className={currentPage === "page-3" ? "" : "hidden"}
          >
            <p className="font-bold">Minhas Reservas</p>
            <div className="flex flex-wrap gap-4">
              {tarefas.map((item) => (
                <article
                  key={item.id}
                  className="p-4 bg-white shadow-md rounded-lg flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <p className="font-bold"> Nome:{item.nome}</p>
                  <p> Contato:{item.tel}</p>
                  <p> Data:{item.date}</p>
                  <p>Hora:{item.time}</p>
                  <p>Barbeiro:{item.opcaoSelecionada}</p>
                  <p>Corte:{item.cortes}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
