
import React from 'react';

import { useStatus } from '../../components/context/statusContext';

import Navbar from '../../components/navbar'


const ClientPage = () => {
  const { isOnline } = useStatus();

  return (


    <div>
      <Navbar />

      <div className=" text-white grid grid-rows-3 grid-flow-col gap-4">

        <div className="row-span-3 font-bold text-xl mt-2 ml-2">Barbearia RB</div>

        <div className="row-span-2 col-span-2 font-bold text-xl mt-2">Serviços Disponivel

          <div className='  flex items-start grid-rows-3 grid-flow-col gap-4 mt-4'>
            <img src="image/logo.jpg" alt="barbearia" style={{ width: 200 }} />
            <h1>Client Page</h1>
      <p>Status: {isOnline ? 'Online' : 'Offline'}</p>
            <div>
            
            </div>

          </div>

        </div>
      </div>


    </div>

  );


};
export default ClientPage;

