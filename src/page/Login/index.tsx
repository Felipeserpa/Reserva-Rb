import { useState } from 'react';



import styles from './login.module.css';

 export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function handleSubmit() {

    }

    return (

        <div className={styles.body}>
            <div className="grid justify-items-center mt-24">
 
            <img src="image/logo.jpg" alt="barbearia" style={{width:200}}/>

                <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2 p-2">

                    <label className='p-1  text-slate-300'>Email:</label>

                    <input type='email' className="rounded" name='email' placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)} />

                    <label className='p-1 text-slate-300'>Senha:</label>

                    <input type='senha' className="rounded" name='password' placeholder='*****' value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button
                        type="submit"
                        className="h-9 mt-3  bg-blue-600 rounded border-1 text-lg font-medium text-white p-1 ">
                        Acessar
                    </button>

                  <p className='p-1 text-slate-300'>Não tem conta?Cadastre-se</p>
                  
                  <p  className ='text-slate-300'>Esqueceu a senha?</p>

                </form>

            </div>

        </div>


    )

}
