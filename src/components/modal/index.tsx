import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import Modal from "react-modal";
import { db } from "../../services/fireaseConection";
import { getAuth } from "firebase/auth";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

export default function modal() {
  let subtitle: HTMLHeadingElement | null;
  const [modalIsOpen, setIsOpen] = useState(false);

  const [nome, setNome] = useState("");
  const [tel, setTel] = useState("(81)");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#0004e2";
  }

  function closeModal() {
    setIsOpen(false);
  }

  async function handleSubmit() {
    const auth = getAuth();
    const user = auth.currentUser;
    try {
      // Obtenha o usuário autenticado
      if (!user) {
        console.error("Usuário não autenticado.");
        return;
      }

      // Adicione o agendamento com o UID do usuário
      await addDoc(collection(db, "agUser"), {
        nome: nome,
        tel: tel,
        date: date,
        time: time,
        userId: user.uid, // Adicione o UID do usuário
      });

      console.log("Agendamento cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar agendamento:", error);
    }
  }
  return (
    <div>
      <button
        onClick={openModal}
        className="ml-5  hover:bg-cyan-600 rounded-full w-24 mt-2"
      >
        Agendar
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Seja Bem-vindo</h2>

        <div className="font-mono text-lg"> Reserva Barbearia</div>
        <form onSubmit={handleSubmit} className="flex flex-col w-96">
          <label className="font-sans pt-0.5">Nome:</label>
          <input
            type="nome"
            className="border-2 rounded-full border-zinc-950 pl-2"
            name="nome"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <label className="font-sans pt-0.5">Telefone:</label>
          <input
            type="number"
            className="w-1/2 border-2 rounded-full border-zinc-950 pl-2"
            name="tel"
            placeholder="(081)"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
          />

          <label className="font-sans pt-0.5">Data:</label>
          <input
            type="date"
            className="w-1/2 border-2 rounded-full border-zinc-950 pl-2"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label className="font-sans pt-0.5">Horário:</label>
          <input
            type="time"
            className="w-1/2 border-2 rounded-full border-zinc-950 pl-2"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <label>Profissional:</label>

          <select className="w-1/2 border-2 rounded-full border-zinc-950">
            <option>----</option>
            <option>Raisy</option>
            <option>Vitor</option>
          </select>

          <div className="flex justify-center">
            <button className="w-24 mt-2 bg-sky-900 hover:bg-cyan-600  border-solid border-2 border-sky-500     outline-blue-500  text-white rounded-full mr-2">
              Enviar
            </button>

            <button
              className="w-24 mt-2 border-solid border-2 border-red-500 rounded-full bg-red-800  hover:bg-red-600 text-white"
              onClick={closeModal}
            >
              Fechar
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
