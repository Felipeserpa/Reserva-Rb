import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConection";
import {
  RiDeleteBin6Line,
  RiCheckboxCircleLine,
  RiCalendarLine,
  RiScissorsCutLine,
  RiSearchLine,
  RiAddLine,
  RiDashboardLine,
  RiGroupLine,
  RiSettings4Line,
  RiMenu3Line,
  RiCloseLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

interface User {
  id: string;
  nome: string;
  tel: string;
  date: string;
  time: string;
  opcaoSelecionada: string;
  cortes: string;
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Controle do menu mobile

  const loadAgenda = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "agUser"));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];

      const sorted = usersData.sort(
        (a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time),
      );
      setUsers(sorted);
    } catch (error) {
      toast.error("Erro ao carregar agenda.");
    }
  };

  useEffect(() => {
    loadAgenda();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Deseja cancelar este agendamento?")) return;
    try {
      await deleteDoc(doc(db, "agUser", id));
      setUsers(users.filter((user) => user.id !== id));
      toast.success("Excluído!");
    } catch {
      toast.error("Erro ao excluir.");
    }
  };

  const handleArmazenar = async (userId: string) => {
    try {
      const userRef = doc(db, "agUser", userId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        await setDoc(doc(db, "relatorios", userId), userData);
        await deleteDoc(userRef);
        setUsers(users.filter((user) => user.id !== userId));
        toast.success("Concluído!");
      }
    } catch {
      toast.error("Erro ao processar.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a05] text-zinc-300 font-sans">
      {/* BOTÃO HAMBÚRGUER (Aparece apenas no Mobile) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 right-4 z-[60] bg-yellow-500 p-2 rounded-lg text-black"
      >
        {isSidebarOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
      </button>

      {/* SIDEBAR */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#0f0f0a] border-r border-white/5 p-6 transition-transform duration-300 transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:block
      `}
      >
        <div className="flex items-center gap-2 px-2 text-yellow-500 mb-10">
          <RiScissorsCutLine size={28} />
          <h1 className="text-xl font-bold tracking-tighter text-white uppercase">
            Stecnologic
          </h1>
        </div>

        <nav className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-3 py-3 bg-yellow-500/10 text-yellow-500 rounded-xl font-bold transition-all">
            <RiDashboardLine size={20} /> Painel
          </button>
          <Link
            to="/GestaoServicos"
            className="flex items-center gap-3 px-3 py-3 hover:bg-white/5 rounded-xl transition-all"
          >
            <RiGroupLine size={20} /> Gestão de Serviços
          </Link>
          <button className="flex items-center gap-3 px-3 py-3 hover:bg-white/5 rounded-xl transition-all">
            <RiSettings4Line size={20} /> Configurações
          </button>
        </nav>
      </aside>

      {/* OVERLAY PARA MOBILE (Fecha o menu ao clicar fora) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-4 lg:p-8 w-full overflow-hidden">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div className="relative w-full max-w-md">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar cliente..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 focus:border-yellow-500 outline-none transition-all text-sm"
            />
          </div>
          <button className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-black py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all">
            <RiAddLine size={20} /> NOVO AGENDAMENTO
          </button>
        </header>

        {/* CARDS DE RESUMO */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#14140f] p-5 rounded-2xl border border-white/5">
            <p className="text-[10px] uppercase text-zinc-500 font-black tracking-widest mb-1">
              Total
            </p>
            <h3 className="text-3xl font-bold text-white">{users.length}</h3>
          </div>
          <div className="bg-[#14140f] p-5 rounded-2xl border border-white/5 border-l-4 border-l-green-500">
            <p className="text-[10px] uppercase text-zinc-500 font-black tracking-widest mb-1">
              Status
            </p>
            <h3 className="text-xl font-bold text-green-500">ONLINE</h3>
          </div>
        </div>

        {/* TABELA (Desktop) E CARDS (Mobile) */}
        <div className="bg-[#14140f] rounded-2xl border border-white/5 overflow-hidden">
          {/* VISUALIZAÇÃO EM TABELA (Escondida no Mobile) */}
          <div className="hidden md:block">
            <table className="w-full text-left">
              <thead className="bg-white/[0.02] text-[10px] uppercase text-yellow-500 font-black">
                <tr>
                  <th className="p-5 tracking-widest">Data e Hora</th>
                  <th className="p-5 tracking-widest">Cliente</th>
                  <th className="p-5 tracking-widest">Serviço</th>
                  <th className="p-5 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {users.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-3">
                        <RiCalendarLine className="text-yellow-500" />
                        <div>
                          <p className="text-sm font-bold text-white">
                            {item.date}
                          </p>
                          <p className="text-xs text-zinc-500">{item.time}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-sm font-medium text-white">
                      {item.nome}
                    </td>
                    <td className="p-5">
                      <p className="text-sm text-white font-bold uppercase tracking-tighter">
                        {item.cortes}
                      </p>
                      <p className="text-[10px] text-yellow-500/60 font-bold uppercase">
                        {item.opcaoSelecionada}
                      </p>
                    </td>
                    <td className="p-5">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleArmazenar(item.id)}
                          className="p-2 bg-green-500/10 text-green-500 rounded-lg hover:bg-green-500 hover:text-black transition-all"
                        >
                          <RiCheckboxCircleLine size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"
                        >
                          <RiDeleteBin6Line size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* VISUALIZAÇÃO EM LISTA DE CARDS (Apenas Mobile) */}
          <div className="md:hidden divide-y divide-white/5">
            {users.map((item) => (
              <div
                key={item.id}
                className="p-5 space-y-4 hover:bg-white/[0.02]"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black bg-yellow-500 text-black px-2 py-0.5 rounded uppercase">
                      {item.time}
                    </span>
                    <h4 className="text-lg font-bold text-white mt-1">
                      {item.nome}
                    </h4>
                  </div>
                  <div className="text-right text-xs text-zinc-500 font-bold">
                    {item.date}
                  </div>
                </div>

                <div className="bg-black/20 p-3 rounded-xl border border-white/5">
                  <p className="text-xs font-bold text-white uppercase">
                    {item.cortes}
                  </p>
                  <p className="text-[10px] text-yellow-500 font-medium tracking-widest">
                    {item.opcaoSelecionada}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleArmazenar(item.id)}
                    className="flex-1 py-3 bg-green-500/10 text-green-500 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <RiCheckboxCircleLine size={18} /> CONCLUIR
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="flex-1 py-3 bg-red-500/10 text-red-500 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
                  >
                    <RiDeleteBin6Line size={18} /> CANCELAR
                  </button>
                </div>
              </div>
            ))}
          </div>

          {users.length === 0 && (
            <div className="p-20 text-center text-zinc-500 italic text-sm">
              Nenhum agendamento encontrado.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
