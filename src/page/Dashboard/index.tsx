import Navbar from "../../components/navbarAdmin";

import Footer from "../../components/footer";
import { useEffect, useState } from "react";

import { getFirestore, collection, getDocs } from "firebase/firestore";
const Dashboard = () => {
  const [users, setAguser] = useState([]);

  useEffect(() => {
    async function loadAgenda() {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "agUser"));
      const users: ((prevState: never[]) => never[]) | { id: string }[] = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setAguser(users);
      console.log(users);
    }

    loadAgenda();
  }, []);
  function buscarAgendamentos(
    event: MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <Navbar />

      <div>
        <select onChange={(e) => setMes(e.target.value)}>
          {/* Opções para selecionar o mês */}
        </select>
        <select onChange={(e) => setAno(e.target.value)}>
          {/* Opções para selecionar o ano */}
        </select>
        <button onClick={buscarAgendamentos}>Buscar Agendamentos</button>
      </div>

      <div className=" text-white grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-3 font-bold text-xl mt-2 ml-2">
          Pagina Administrativa
        </div>

        <div className="row-span-2 col-span-2 font-bold text-xl mt-2">
          Serviços Disponivel
          <div className="  flex items-start grid-rows-3 grid-flow-col gap-4 mt-4">
            <div className="flex flex-wrap gap-4">
              {users.map((item) => (
                <article
                  key={item.id}
                  className="p-2 shadow-md rounded-lg flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
                >
                  <p className="font-bold"> Nome:{item.nome}</p>
                  <p> Contato:{item.tel}</p>
                  <p> Data:{item.date}</p>
                  <p>Hora:{item.time}</p>
                  <p>Barbeiro:{item.opcaoSelecionada}</p>
                  <p>Corte:{item.cortes}</p>
                  <button>Deletar</button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-72">
        <Footer />
      </div>
    </div>
  );
};
export default Dashboard;
