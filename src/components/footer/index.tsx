import { SlSocialInstagram } from "react-icons/sl";
import { ImWhatsapp } from "react-icons/im";

import { Link } from "react-router-dom";
import React from "react";

const footer = () => {
  return (
    <div className="bg-slate-900 pt-6 pb-8 px-4 sm:px-8 lg:px-20 flex justify-center">
      <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center text-center">
        {/* Informações de Contato */}
        <div className="text-white">
          <p className="font-mono text-lg">Reserva Barbearia</p>
          <p>Contato: (81) 99807-8137</p>
        </div>

        {/* Horário de Atendimento */}
        <div className="text-white">
          <p className="font-semibold">Horário de Atendimento:</p>
          <p>Segunda a Sexta 09:00 às 21:00</p>
          <p>Sábado 09:00 às 21:00</p>
          <p>Domingo 09:00 às 13:00</p>
        </div>

        {/* Redes Sociais */}
        <div className="text-white">
          <p className="font-semibold">Redes Sociais</p>
          <div className="flex justify-center gap-4 mt-2">
            <Link
              to="https://www.instagram.com/reserva_barbearia/"
              className="text-xl"
            >
              <SlSocialInstagram />
            </Link>
            <Link
              to="https://api.whatsapp.com/send?phone=5581998078137"
              className="text-xl"
            >
              <ImWhatsapp />
            </Link>
          </div>
          <p className="mt-4 text-sm">º2024/Stecnologic</p>
        </div>
      </div>
    </div>
  );
};

export default footer;
