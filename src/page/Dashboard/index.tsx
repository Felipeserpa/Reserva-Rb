import Navbar from "../../components/navbarAdmin";

import Footer from "../../components/footer";

const Dashboard = () => {
  return (
    <div>
      <Navbar />

      <div className=" text-white grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-3 font-bold text-xl mt-2 ml-2">
          Pagina Administrativa
        </div>

        <div className="row-span-2 col-span-2 font-bold text-xl mt-2">
          Serviços Disponivel
          <div className="  flex items-start grid-rows-3 grid-flow-col gap-4 mt-4">
            <img src="image/logo.jpg" alt="barbearia" style={{ width: 150 }} />

            <img src="image/logo.jpg" alt="barbearia" style={{ width: 150 }} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Dashboard;
