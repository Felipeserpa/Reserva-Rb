import Modal from "../../components/modal";

import Navbar from "../../components/navbar";
import foto01 from "./../../../public/images/foto01.jpg";
import foto02 from "./../../../public/images/foto02.jpg";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";

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

      <div className=" text-white">
        <div className="flex flex-row mr-60 ">
          <div className="relative h-32 w-64 ...">
            <div className="absolute inset-y-0 left-0 w-16"></div>
          </div>
          <div className="basis-1/4 ml-10 mx-8 mt-2">
            <img
              src={foto01}
              className="rounded-full  mt-3 "
              alt="barbearia"
              style={{ width: 156 }}
            />
            <p className="p-2 ml-3">
              Serviço <strong>{status}</strong>
            </p>
            <Modal></Modal>
          </div>
          <div className="basis-1/4">
            <img
              src={foto02}
              className="rounded-full mt-5 "
              alt="barbearia "
              style={{ width: 152 }}
            />
            <p className="p-2 ml-3">
              Serviço <strong>{statusFuncionario2}</strong>
            </p>
            <Modal></Modal>
          </div>
        </div>
        <div className="mt-40">
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default ClientPage;
