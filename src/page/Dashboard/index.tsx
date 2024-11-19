import Navbar from "../../components/navbarAdmin";
import Modal from "../../components/modal";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { RiDeleteBin6Fill } from "react-icons/ri";
import { db } from "../../services/firebaseConection";

const Dashboard = () => {
  const [users, setAguser] = useState([]);

  useEffect(() => {
    async function loadAgenda() {
      try {
        const db = getFirestore();
        const querySnapshot = await getDocs(collection(db, "agUser"));

        // Ordenando os dados pela data e hora (campos "date" e "time")
        const sortedUsers = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .sort((a, b) => {
            const dateComparison = a.date.localeCompare(b.date);
            if (dateComparison !== 0) {
              return dateComparison;
            }
            return a.time.localeCompare(b.time);
          });

        setAguser(sortedUsers);
        console.log(sortedUsers);
      } catch (error) {
        console.error("Erro ao carregar a agenda:", error);
      }
    }

    loadAgenda();
  }, []);

  async function handleDelete(id) {
    const docRef = doc(db, "agUser", id);
    await deleteDoc(docRef).then(() => {
      toast.success("Agendamento excluido com sucesso!");
    });
  }
  // Res tante do seu componente...

  async function handleBuscar() {
    try {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "agUser"));

      // Ordenando os dados pela data e hora (campos "date" e "time")
      const sortedUsers = querySnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => {
          const dateComparison = a.date.localeCompare(b.date);
          if (dateComparison !== 0) {
            return dateComparison;
          }
          return a.time.localeCompare(b.time);
        });

      setAguser(sortedUsers);
      console.log(sortedUsers);
    } catch (error) {
      console.error("Erro ao carregar a agenda:", error);
    }
  }

  return (
    <div>
      <Navbar />

      <div className="grid grid-cols-[15%_85%] h-screen">
        <div className="bg-red-500">
          <div>
            <p className="mt-2 text-center">Serviços Disponíveis</p>
            <button
              onClick={() => handleBuscar()}
              className=" ml-16  hover:bg-yellow-600  rounded-full w-24 bg-white  mt-2  border-zinc-950 text-zinc-950"
            >
              Atualizar
            </button>

            <Modal></Modal>
          </div>
        </div>
        <div className="bg-yellow-500">
          {users.map((item) => (
            <article key={item.id} className="p-4 rounded-lg shadow-md">
              <p className="font-bold text-blue-600">Nome: {item.nome}</p>
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
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
