import { addDoc, collection, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";
import Modal from "react-modal";

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { toast } from "react-toastify";
import React from "react";

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
  const [modalIsOpen, setIsOpen] = useState(false);

  const [nome, setNome] = useState("");
  const [tel, setTel] = useState("(81)");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [opcaoSelecionada, setOpcaoSelecinada] = useState("");
  const [cortes, setCortes] = useState("");

  const auth = getAuth();
  const db = getFirestore();

  //tempo para fechar o modal
  const tempoParaFechar = 25000;

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (modalIsOpen) {
      const timeer = setTimeout(() => {
        setIsOpen(false);
      }, tempoParaFechar);
      return () => clearTimeout(timeer);
    }
  }, [modalIsOpen]);

  const handleFormSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) {
        return;
      }

      // Adicione o agendamento com o UID do usuário
      await addDoc(collection(db, "agUser"), {
        created: new Date(),
        nome,
        tel,
        date,
        time,
        userUid: user.uid,
        opcaoSelecionada,
        cortes,
      });

      toast.success("Agendamento cadastrado com sucesso!");

      console.log("Agendamento cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar agendamento:", error);
    }
  };

  // Observador para identificar o usuário conectado
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Exemplo de uso:
    } else {
      // O usuário não está autenticado
      console.log("Usuário não autenticado.");
    }
  });

  return (
    <div>
      <button
        onClick={openModal}
        className="ml-5  hover:bg-yellow-600 rounded-full w-24 mt-2 font-bold  bg-white  border-zinc-950 text-black"
      >
        Agendar
      </button>
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>Seja Bem-vindo</h2>

        <div className="font-mono text-lg"> Reserva Barbearia</div>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col w-96 space-y-4"
        >
          <div>
            <label htmlFor="nome" className="font-sans">
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              className="w-full border-2 rounded-full border-zinc-950 pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="nome"
              placeholder="Digite seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="tel" className="font-sans">
              Telefone:
            </label>
            <input
              type="tel"
              id="tel"
              className="w-full border-2 rounded-full border-zinc-950 pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="tel"
              placeholder="(081)"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="date" className="font-sans">
              Data:
            </label>
            <input
              type="date"
              id="date"
              className="w-full border-2 rounded-full border-zinc-950 pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="time" className="font-sans">
              Horário:
            </label>
            <input
              type="time"
              id="time"
              className="w-full border-2 rounded-full border-zinc-950 pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="cortes" className="font-sans">
              Modelos de Cortes:
            </label>
            <select
              id="cortes"
              className="w-full border-2 rounded-full border-zinc-950 pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={cortes}
              onChange={(e) => setCortes(e.target.value)}
            >
              <option value="">----</option>
              <option value="Social">Social</option>
              <option value="Degradê">Degradê</option>
              <option value="Navalhado">Navalhado</option>
              <option value="Tesoura">Tesoura</option>
              <option value="Barba">Barba</option>
              <option value="Sobrancelha">Sobrancelha</option>
              <option value="Unhas">Unhas</option>
              <option value="Kids">Kids</option>
              <option value="Limpeza de Pele">Limpeza de Pele</option>
              <option value="Cabelo+barba">Cabelo + Barba</option>
            </select>
          </div>

          <div>
            <label htmlFor="profissional" className="font-sans">
              Profissional:
            </label>
            <select
              id="profissional"
              className="w-full border-2 rounded-full border-zinc-950 pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={opcaoSelecionada}
              onChange={(e) => setOpcaoSelecinada(e.target.value)}
            >
              <option value="">----</option>
              <option value="Raisy">Raisy</option>
              <option value="Vitor">Vitor</option>
              <option value="Ari">Ari</option>
            </select>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="submit"
              className="w-24 bg-sky-900 hover:bg-cyan-600 border-solid border-2 border-sky-500 outline-none text-white rounded-full py-1 focus:ring-2 focus:ring-cyan-500"
            >
              Enviar
            </button>

            <button
              type="button"
              className="w-24 bg-red-800 hover:bg-red-600 border-solid border-2 border-red-500 text-white rounded-full py-1 focus:ring-2 focus:ring-red-500"
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
