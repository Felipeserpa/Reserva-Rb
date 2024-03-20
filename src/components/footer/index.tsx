
import { SlSocialInstagram } from "react-icons/sl";
import { ImWhatsapp } from "react-icons/im";

import { Link } from "react-router-dom";




const footer = () => {


  return (

    <div className="bg-slate-900 pt-2  pb-6 pr-20">
      <div className="h-38 grid grid-cols-3 gap-4 content-center">

        <div className="ml-8 text-white">
          <p className='font-mono'>Reserva Barbearia</p>
          <p>Contato: (81) 99807-8137 </p>
        </div>

        <div className="ml-12 text-white">
          <p>Horario de Atendimento:</p>
          <p>Segunda a Sexta 09:00 Ás 21:00</p>
          <p>Sabado 09:00 Ás 21:00</p>
          <p>Domingo 09:00 Ás 13:00</p>

        </div>

        <div className="ml-16  text-white ">
          <p>Rede socias</p>
          <div className=" size-6 pt-1">
            <Link to='https://www.instagram.com/reserva_barbearia/'>
              <SlSocialInstagram />
            </Link>
          </div>
          <Link to='https://api.whatsapp.com/send?phone=5581998078137' className=""> <ImWhatsapp /></Link>

          <p className="">º2024/Stecnologic</p>
        </div>

      </div>

    </div>
  );
}

export default footer



