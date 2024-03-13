
import { useState } from 'react';
import Modal from 'react-modal';



const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  Modal.setAppElement('#root');


export default function modal(){

    let subtitle: HTMLHeadingElement | null;
    const [modalIsOpen, setIsOpen] = useState(false);

    const [nome, setNome] = useState('');

    const [tel, setTel] = useState('081');
    const [date ,setDate]= useState('');
    const [time, setTime]= useState('');



  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    function handleSubmit(){

     console.log(nome, tel, date, time)

    }
    return(

        <div>
        <button onClick={openModal}>Agendar</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Seja Bem-vindo</h2>
          
          <div> Reserva Barbearia</div>
          <form onSubmit={handleSubmit}>
            
           <input type='nome' name='nome' placeholder='Digite seu nome' value={nome} onChange={(e) =>setNome(e.target.value)}/>

           <input type='number' name='tel' placeholder='(081)' value={tel} onChange={(e) =>setTel(e.target.value)}/>

           <input type='date' name='date'  value={date} onChange={(e) =>setDate(e.target.value)}/>

           <input type='time' name='time'  value={time} onChange={(e) =>setTime(e.target.value)}/>


            <button>Enviar</button>
            <button onClick={closeModal}>Fechar</button>
          </form>
        </Modal>
      </div>


    );
}