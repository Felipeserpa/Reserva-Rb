import Modal from "../../components/modal";

import Navbar from "../../components/navbar";
import foto01 from "./../../../public/images/foto01.jpg";
import foto02 from "./../../../public/images/foto02.jpg";
import Footer from "../../components/footer";

const ClientPage = () => {
  return (
    <div>
      <Navbar />

      <div className=" text-white">
        <div className="flex flex-row mr-60 ">
          <div className="basis-1/4 ml-20 mx-8 mt-1">
            <img
              src={foto01}
              className="rounded-full  mt-3 "
              alt="barbearia"
              style={{ width: 156 }}
            />
            <Modal></Modal>
          </div>
          <div className="basis-1/4">
            <img
              src={foto02}
              className="rounded-full mt-3 "
              alt="barbearia "
              style={{ width: 152 }}
            />
            <Modal></Modal>
          </div>
        </div>
        <div className="mt-44">
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default ClientPage;
