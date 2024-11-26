import Navbar from "../../components/navbarAdmin";
import Modal from "../../components/modal";
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
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FcApproval } from "react-icons/fc";
import { db } from "../../services/firebaseConection";

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

  // Função para ordenar os dados
  const sortUsersByDateAndTime = (usersArray: any[]) => {
    return usersArray.sort((a, b) => {
      const dateComparison = a.date.localeCompare(b.date);
      if (dateComparison !== 0) return dateComparison;
      return a.time.localeCompare(b.time);
    });
  };

  // Carregar agenda inicial
  useEffect(() => {
    loadAgenda();
  }, []);

  // Função para carregar agendamentos
  const loadAgenda = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "agUser"));
      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const sortedUsers = sortUsersByDateAndTime(usersData);
      setUsers(sortedUsers);
    } catch (error) {
      console.error("Erro ao carregar a agenda:", error);
      toast.error("Erro ao carregar a agenda.");
    }
  };

  // Função para deletar agendamento
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "agUser", id));
      toast.success("Agendamento excluído com sucesso!");
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Erro ao excluir agendamento:", error);
      toast.error("Erro ao excluir o agendamento.");
    }
  };

  // Função para mover dados para outra coleção
  const handleArmazenar = async (userId: string) => {
    try {
      const userRef = doc(db, "agUser", userId);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast.error("Usuário não encontrado.");
        return;
      }

      const userData = userSnap.data();
      const newTableRef = doc(db, "relatorios", userId);

      // Mover os dados para a nova coleção
      await setDoc(newTableRef, userData);
      toast.success("Dados movidos com sucesso!");

      // Adicionar log de ação
      const reportRef = collection(db, "relatorios");
      await addDoc(reportRef, {
        userId,
        action: "Dados movidos",
        timestamp: new Date(),
        originalData: userData,
      });

      // Deletar o documento original
      await deleteDoc(userRef);
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Erro ao mover dados:", error);
      toast.error("Erro ao mover dados.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-[15%_85%] h-screen">
        {/* Sidebar */}
        <div className="bg-yellow-200">
          <div>
            <p className="mt-2 text-center font-bold">Serviços Disponíveis</p>
            <button
              onClick={loadAgenda}
              className="ml-16 hover:bg-yellow-600 rounded-full w-24 bg-white font-bold mt-2 border-zinc-950 text-zinc-950"
            >
              Atualizar
            </button>
            <div className="ml-11">
              <Modal />
            </div>
          </div>
        </div>

        {/* Lista de usuários */}
        <div className="bg-yellow-400">
          {users.map((item) => (
            <article
              key={item.id}
              className="p-4 rounded-lg shadow-md font-bold"
            >
              <p className="font-bold text-blue-500">Nome: {item.nome}</p>
              <p>Contato: {item.tel}</p>
              <p>Data: {item.date}</p>
              <p>Hora: {item.time}</p>
              <p>Barbeiro: {item.opcaoSelecionada}</p>
              <p>Corte: {item.cortes}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-2 py-1 rounded-md"
              >
                <RiDeleteBin6Fill />
              </button>
              <button
                onClick={() => handleArmazenar(item.id)}
                className="text-white px-2 py-1 ml-2 rounded-md bg-lime-600"
              >
                <FcApproval />
              </button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
