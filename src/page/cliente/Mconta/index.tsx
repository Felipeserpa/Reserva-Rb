import { useEffect, useState } from "react";
import Navbar from "../../../components/navbar";
import {
  onSnapshot,
  query,
  where,
  collection,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../services/firebaseConection";
import {
  RiCalendarCheckLine,
  RiHistoryLine,
  RiTimeLine,
  RiUserVoiceLine,
  RiScissorsLine,
  RiWhatsappLine,
} from "react-icons/ri";
import React from "react";

interface agendamentos {
  id: string;
  nome: string;
  date: string;
  time: string;
  tel: string;
  cortes: string;
  opcaoSelecionada: string;
  data: string;
  opcaoselecionadats: string;
}

export default function Mconta() {
  const [currentPage, setCurrentPage] = useState("page-3"); // Iniciando na página de agendamentos
  const [, setUser] = useState<{ uid: string } | null>(null);
  const [agendamento, setAgendamento] = useState<agendamentos[]>([]);

  const handleClick = (nextPage: string) => {
    setCurrentPage(nextPage);
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
          where("userUid", "==", data?.uid),
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const lista: agendamentos[] = [];
          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              nome: doc.data().nome ?? "Nome não disponível",
              date: doc.data().date ?? "Data não disponível",
              time: doc.data().time ?? "Hora não disponível",
              tel: doc.data().tel ?? "Contato não disponível",
              cortes: doc.data().cortes ?? "Corte não selecionado",
              opcaoSelecionada:
                doc.data().opcaoSelecionada ?? "Profissional não selecionado",
              data: doc.data().data ?? "Data não informada",
              opcaoselecionadats:
                doc.data().opcaoselecionadats ?? "Opção não selecionada",
            });
          });
          setAgendamento(lista);
        });

        return () => unsubscribe();
      }
    }
    loadTarefas();
  }, []);

  return (
    <div className="min-h-screen bg-[#13130a] text-zinc-300">
      <Navbar />

      <div className="flex h-[calc(100vh-64px)]">
        {/* SIDEBAR LATERAL ESTILIZADA */}
        <aside className="w-64 border-r border-white/5 p-6 flex flex-col gap-4">
          <h2 className="text-[10px] uppercase font-bold text-yellow-500/50 tracking-[2px] mb-4">
            Menu da Conta
          </h2>

          <button
            onClick={() => handleClick("page-3")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentPage === "page-3"
                ? "bg-yellow-500 text-black font-bold shadow-lg shadow-yellow-500/10"
                : "hover:bg-white/5 text-zinc-400"
            }`}
          >
            <RiCalendarCheckLine size={20} />
            <span className="text-sm">Meus Agendamentos</span>
          </button>

          <button
            onClick={() => handleClick("page-2")}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              currentPage === "page-2"
                ? "bg-yellow-500 text-black font-bold"
                : "hover:bg-white/5 text-zinc-400"
            }`}
          >
            <RiHistoryLine size={20} />
            <span className="text-sm">Histórico</span>
          </button>
        </aside>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-grow p-8 overflow-y-auto">
          {/* PÁGINA DE AGENDAMENTOS */}
          <div
            className={
              currentPage === "page-3" ? "max-w-5xl mx-auto" : "hidden"
            }
          >
            <header className="mb-10">
              <h1 className="text-3xl font-bold text-white mb-2">
                Meus Agendamentos
              </h1>
              <p className="text-zinc-500">
                Gerencie suas reservas e horários na barbearia.
              </p>
            </header>

            <div className="grid gap-4">
              {agendamento.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-3xl">
                  <RiCalendarCheckLine
                    size={48}
                    className="mx-auto text-zinc-700 mb-4"
                  />
                  <p className="text-zinc-500">
                    Você ainda não possui agendamentos.
                  </p>
                </div>
              ) : (
                agendamento.map((item) => (
                  <article
                    key={item.id}
                    className="group bg-[#1c1c12] border border-white/5 p-6 rounded-2xl hover:border-yellow-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="flex items-center gap-6">
                      {/* Ícone Lateral */}
                      <div className="hidden sm:flex w-14 h-14 bg-yellow-500/10 text-yellow-500 rounded-2xl items-center justify-center group-hover:bg-yellow-500 group-hover:text-black transition-all">
                        <RiScissorsLine size={24} />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="bg-yellow-500/10 text-yellow-500 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                            {item.cortes}
                          </span>
                          <span className="text-xs text-zinc-500 font-medium italic">
                            #{item.id.slice(0, 5)}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                          {item.nome}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-400">
                          <div className="flex items-center gap-1.5">
                            <RiUserVoiceLine className="text-yellow-500/50" />
                            {item.opcaoSelecionada}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <RiWhatsappLine className="text-yellow-500/50" />
                            {item.tel}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Data e Hora Card */}
                    <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                      <div className="text-right">
                        <p className="text-white font-bold text-lg">
                          {item.date}
                        </p>
                        <div className="flex items-center justify-end gap-1 text-yellow-500 font-mono text-sm">
                          <RiTimeLine size={14} />
                          {item.time}
                        </div>
                      </div>
                      <div className="w-[1px] h-10 bg-white/10"></div>
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-[10px] font-bold text-green-500 mt-1 uppercase tracking-tighter">
                          Ativo
                        </span>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>

          {/* PÁGINA DE HISTÓRICO (Vazia por enquanto) */}
          <div className={currentPage === "page-2" ? "" : "hidden"}>
            <h1 className="text-3xl font-bold text-white mb-2">
              Histórico de Compras
            </h1>
            <p className="text-zinc-500">Veja seus atendimentos passados.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
