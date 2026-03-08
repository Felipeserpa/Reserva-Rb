import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  setDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConection";
import {
  RiDeleteBin6Line,
  RiCheckboxCircleLine,
  RiCalendarLine,
  RiUserLine,
  RiScissorsCutLine,
  RiSearchLine,
  RiAddLine,
  RiDashboardLine,
  RiGroupLine,
  RiSettings4Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";

// Interface atualizada conforme seu Firestore
interface User {
  id: string;
  nome: string;
  tel: string;
  date: string;
  time: string;
  opcaoSelecionada: string; // Barbeiro
  cortes: string; // Serviço
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);

  const loadAgenda = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "agUser"));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];

      // Ordenação
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
    <div className="flex min-h-screen bg-[#13130a] text-zinc-300 font-sans">
      {/* SIDEBAR ESTILIZADA */}
      <aside className="w-64 border-r border-white/5 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2 px-2 text-yellow-500">
          <RiScissorsCutLine size={28} />
          <h1 className="text-xl font-bold tracking-tighter text-white">
            CROWN&CO
          </h1>
        </div>

        <nav className="flex flex-col gap-2">
          <button className="flex items-center gap-3 px-3 py-2 bg-yellow-500/10 text-yellow-500 rounded-lg">
            <RiDashboardLine /> Agendamentos
          </button>
          <button className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-all">
            <RiGroupLine />

            <Link to="/servicos">Serviços</Link>
          </button>
          <button className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 rounded-lg transition-all">
            <RiSettings4Line /> Configurações
          </button>
        </nav>
      </aside>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="flex-1 p-8">
        {/* HEADER */}
        <header className="flex justify-between items-center mb-10">
          <div className="relative w-full max-w-md">
            <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              type="text"
              placeholder="Buscar cliente..."
              className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 focus:border-yellow-500 outline-none transition-all"
            />
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-all">
            <RiAddLine size={20} /> Novo Agendamento
          </button>
        </header>

        {/* CARDS DE RESUMO (Mockados para o layout) */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-[#1c1c12] p-4 rounded-xl border border-white/5">
            <p className="text-[10px] uppercase text-zinc-500 font-bold">
              Total Hoje
            </p>
            <h3 className="text-2xl font-bold text-white">{users.length}</h3>
          </div>
          <div className="bg-[#1c1c12] p-4 rounded-xl border border-white/5 text-green-500">
            <p className="text-[10px] uppercase text-zinc-500 font-bold">
              Confirmados
            </p>
            <h3 className="text-2xl font-bold">18</h3>
          </div>
        </div>

        {/* TABELA DE AGENDAMENTOS */}
        <div className="bg-[#1c1c12] rounded-xl border border-white/5 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/[0.02] text-[10px] uppercase text-yellow-500/70">
              <tr>
                <th className="p-4 font-bold tracking-widest">Data e Hora</th>
                <th className="p-4 font-bold tracking-widest">Cliente</th>
                <th className="p-4 font-bold tracking-widest">
                  Serviço / Barbeiro
                </th>
                <th className="p-4 font-bold tracking-widest text-right">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-white/[0.02] transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <RiCalendarLine className="text-yellow-500" />
                      <div>
                        <p className="text-sm font-bold text-white">
                          {item.date}
                        </p>
                        <p className="text-xs text-zinc-500">{item.time}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center text-xs font-black uppercase">
                        {item.nome.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {item.nome}
                        </p>
                        <p className="text-[10px] text-zinc-500">{item.tel}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-white font-medium">
                      {item.cortes}
                    </p>
                    <p className="text-[10px] text-yellow-500/60 uppercase">
                      {item.opcaoSelecionada}
                    </p>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleArmazenar(item.id)}
                        className="p-2 hover:bg-green-500/20 text-green-500 rounded-lg transition-all"
                        title="Concluir"
                      >
                        <RiCheckboxCircleLine size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 hover:bg-red-500/20 text-red-500 rounded-lg transition-all"
                        title="Deletar"
                      >
                        <RiDeleteBin6Line size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="p-10 text-center text-zinc-500 italic">
              Nenhum agendamento para hoje.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
