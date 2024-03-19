
import { SlSocialInstagram  } from "react-icons/sl";
import { ImWhatsapp } from "react-icons/im";
import { useState } from "react";
import { Link } from "react-router-dom";




const footer = () => {


    return ( 
      
 <div className="bg-indigo-50">
<div className="h-28 grid grid-cols-3 gap-4 content-center">

  <div className="ml-8">
    <p>Reserva Barbearia</p>
    <p>Telefone: (81) 99807-8137 </p>
  </div>

  <div className="ml-12">
    <p>Horario de Atendimento:</p>
    <p>Segunda a Sexta 09:00 Ás 21:00</p>
    <p>Sabado 09:00 Ás 21:00</p>
    <p>Domingo 09:00 Ás 13:00</p>

  </div>

  <div className="ml-16">
  <p>Rede socias</p>
 
<Link to='https://www.instagram.com/reserva_barbearia/'>
<SlSocialInstagram />
</Link>

<Link to='https://api.whatsapp.com/send?phone=5581998078137'> <ImWhatsapp /></Link>

  <p>º2024/Stecnologic</p>
  </div>

    </div>
    
 </div>
);
    };

export default footer    



