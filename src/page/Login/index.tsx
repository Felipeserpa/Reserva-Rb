import { useState } from 'react';
import {Link} from "react-router-dom"

import { useForm } from "react-hook-form"



import styles from './login.module.css';


 export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

   const { register, handleSubmit } = useForm()
    const onSubmit = (data) => console.log(data)

 


    return (

        <div className={styles.body}>
            <div className="grid justify-items-center mt-24">
 
            <img src="image/logo.jpg" className='rounded-full' alt="barbearia" style={{width:200}}/>

                <form onSubmit={handleSubmit (onSubmit)} className="w-full max-w-xl flex flex-col px-2 p-2">

                    <label className='p-1  text-slate-300'>Email:</label>

                    <input {...register("email", { required: true, maxLength: 20 })} className="rounded" name='email' placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)} />
                   
                    <label className='p-1 text-slate-300'>Senha:</label>

                    <input type='number'  {...register("password", { min: 8, max: 10 })}  className="rounded" name='password' placeholder='*****' value={password} onChange={(e) => setPassword(e.target.value)} />
               

                    <button
                        type="submit"
                        className="h-9 mt-3  bg-blue-600 rounded border-1 text-lg font-medium text-white p-1 ">
                        Acessar
                    </button>
                    <Link to="/cadastro">
                    <p className='font-medium px-3 py-2 text-slate-100  hover:text-slate-500'>Não tem conta?Cadastre-se</p>
                    </Link>
              
                  <p  className ='text-slate-300'>Esqueceu a senha?</p>

                  
                </form>

            </div>

        </div>


    )

}
