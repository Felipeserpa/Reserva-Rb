/* eslint-disable react-hooks/rules-of-hooks */
import Navbar from "../../components/navbar";
import Footer from '../../components/footer';


export default function sobre () {


    return(

      <div className="text-white">
       <Navbar/>
      <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Sobre a Barbearia Reserva</h1>
      <p className="text-lg mb-4">
        A Barbearia Reserva é um espaço dedicado aos cuidados masculinos, oferecendo serviços de barbearia tradicional, cortes de cabelo, tratamentos estéticos, entre outros.
      </p>
      <p className="text-lg mb-4">
        Nossa equipe é formada por profissionais qualificados e experientes, comprometidos em oferecer um atendimento de qualidade e proporcionar uma experiência única para nossos clientes.
      </p>
      <p className="text-lg mb-4">
        Além dos serviços de barbearia, também oferecemos uma variedade de produtos de cuidados masculinos, incluindo pomadas, shampoos, cremes e acessórios.
      </p>
      <p className="text-lg mb-4">
        Venha nos visitar e descubra o que a Barbearia Reserva tem a oferecer para você. Estamos ansiosos para recebê-lo!
      </p>
    </div>
    <div className="mt-16">
      <Footer/>
    </div>

      
    </div>
  );
}
