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
  addDoc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";

import { RiDeleteBin6Fill } from "react-icons/ri";
import { FcApproval } from "react-icons/fc";
import { db } from "../../services/firebaseConection";

const Dashboard = () => {
  const [users, setAguser] = useState([]);
  const [userData, setUserData] = useState([]);

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

  async function handleDelete(id: string) {
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
  // armezenar os dados do client em outro banco com outro
  const handleArmazenar = async (userId) => {
    try {
      // Referência ao documento do usuário na tabela original
      const userRef = doc(db, "agUser", userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();

        // Referência ao novo documento na outra tabela
        const newTableRef = doc(db, "relatorios", userId);

        // Copiando os dados para a nova tabela
        await setDoc(newTableRef, userData);

        console.log("Dados movidos com sucesso!");
        //cria um copia dos dados dos usuarios
        const reportref = collection(db, "relatorios");
        await addDoc(reportref, {
          userId,
          action: "dados movidos",
          timestamp: new Date(),
          orginalData: userData,
        });
        await deleteDoc(userRef);
      } else {
        console.log("Usuário não encontrado!");
      }
    } catch (error) {
      console.error("Erro ao mover dados:", error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="grid grid-cols-[15%_85%] h-screen">
        <div className="bg-yellow-200">
          <div>
            <p className="mt-2 text-center font-bold">Serviços Disponíveis</p>
            <button
              onClick={() => handleBuscar()}
              className=" ml-16
              
                hover:bg-yellow-600  rounded-full w-24 bg-white font-bold  mt-2  border-zinc-950 text-zinc-950"
            >
              Atualizar
            </button>
            <div className="ml-11">
              <Modal></Modal>
            </div>
          </div>
        </div>
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
                className="text-white px-2 py-1  ml-2 rounded-md bg-lime-600"
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
