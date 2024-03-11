
import Modal from '../../components/modal';

import Navbar from '../../components/navbar'


const ClientPage = () => {

  return (


    <div>
      <Navbar />

      <div className=" text-white grid grid-rows-3 grid-flow-col gap-4">

        <div className="row-span-3 font-bold text-xl mt-2 ml-2">Barbearia RB</div>

        <div className="row-span-2 col-span-2 font-bold text-xl mt-2">Agendamentos

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-1 mt-6 '>
            <div>
            <p>Barbeiro Rayssa</p>
            <img src="image/foto01.jpg" className='rounded-full  mt-3' alt="barbearia" style={{ width: 150 }}/>
            <Modal></Modal>
            </div>
            
            <div>
            <p>Barbeiro Vitor</p>
            <img src="image/foto02.jpg"  className='rounded-full mt-3' alt="barbearia " style={{ width: 150 }} />
            <button>Agendar</button>
            </div>

          </div>

        </div>
      </div>


    </div>

  );


};
export default ClientPage;

