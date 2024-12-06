import Modal from "../../components/modal";

import Navbar from "../../components/navbar";
import foto01 from "./../../../public/images/foto1.jpg";
import foto02 from "./../../../public/images/foto2.jpg";
import foto03 from "./../../../public/images/foto3.jpg";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";
import React from "react";

const ClientPage = () => {
  const [status, setStatus] = useState("Offline"); // Inicializa o status como "Offline"
  const [statusFuncionario2, setStatusFuncionario2] = useState("Offline");

  useEffect(() => {
    const intervalo = setInterval(() => {
      const agora = new Date();
      const horarioInicio = 10; // Horário de abertura
      const horarioFim = 22; // Horário de fechamento
      const horas = agora.getHours();

      // Atualiza o status com base no horário
      const novoStatus =
        horas >= horarioInicio && horas < horarioFim ? "Online" : "Offline";
      setStatus(novoStatus); // Atualiza o estado
    }, 1000); // Atualiza a cada segundo

    // Limpa o intervalo ao desmontar o componente
    return () => clearInterval(intervalo);
  }, []); // Executa apenas na montagem

  //2 funcionario vitor
  useEffect(() => {
    const intervaloFuncionario2 = setInterval(() => {
      const agora = new Date();
      const horarioInicio2 = 9; // Funcionário 2 começa às 12h
      const horarioFim2 = 18; // Funcionário 2 termina às 20h
      const horas = agora.getHours();

      const novoStatus2 =
        horas >= horarioInicio2 && horas < horarioFim2 ? "Online" : "Offline";
      setStatusFuncionario2(novoStatus2);
    }, 1000);

    return () => clearInterval(intervaloFuncionario2);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="text-white flex flex-col items-center">
        <div className="flex flex-wrap justify-center lg:justify-between gap-6 p-4 w-full max-w-6xl">
          {/* Primeiro Item */}
          <div className="flex flex-col items-center basis-full sm:basis-1/3 lg:basis-1/4">
            <img
              src={foto01}
              className="rounded-full mt-3"
              alt="barbearia"
              style={{ width: "50%" }}
            />
            <p className="p-2 text-center">
              Serviço <strong>{status}</strong>
            </p>
            <Modal />
          </div>

          {/* Segundo Item */}
          <div className="flex flex-col items-center basis-full sm:basis-1/3 lg:basis-1/4">
            <img
              src={foto03}
              className="rounded-full mt-5"
              alt="barbearia"
              style={{ width: "50%" }}
            />
            <p className="p-2 text-center">
              Serviço <strong>{statusFuncionario2}</strong>
            </p>
            <Modal />
          </div>

          {/* Terceiro Item */}
          <div className="flex flex-col items-center basis-full sm:basis-1/3 lg:basis-1/4">
            <img
              src={foto02}
              className="rounded-full mt-5"
              alt="barbearia"
              style={{ width: "50%" }}
            />
            <p className="p-2 text-center">
              Serviço <strong>{statusFuncionario2}</strong>
            </p>
            <Modal />
          </div>
        </div>

        <div className="mt-20 sm:mt-40 w-full">
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default ClientPage;
