
import Modal from '../../components/modal';

import Navbar from '../../components/navbar';

import Footer from '../../components/footer';

const ClientPage = () => {

  return (


    <div>
      <Navbar />

      <div className=" text-white">

        <div className="flex flex-row mr-24 ">
          <div className="basis-1/4 ml-20 mx-8 mt-1">
            <img src="image/foto01.jpg" className='rounded-full  mt-3' alt="barbearia" style={{ width: 156 }} />
            <Modal></Modal>
          </div>
          <div className="basis-1/4">
            <img src="image/foto02.jpg" className='rounded-full mt-3 ' alt="barbearia " style={{ width: 150 }} />
            <Modal></Modal>
          </div>
        </div>
        <div className='mt-28'>
              <Footer/>
        </div>
    
      </div>

     


    </div>

  );


};
export default ClientPage;

