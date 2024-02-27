import { useState } from 'react';
import {Link} from "react-router-dom"

import {useForm} from 'react-hook-form';

 import {z} from 'zod';

import {zodResolver} from '@hookform/resolvers/zod'


import styles from './login.module.css';

const schema = z.object({

    email:z.string().email("insira um email válido").nonempty("o campo email é obrigatório"),
    password:z.number().min(6)

});



 export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

const {register, handleSubmit, formState: {errors},} = useForm({

resolver :zodResolver(schema),

});

    return (

        <div className={styles.body}>
            <div className="grid justify-items-center mt-24">
 
            <img src="image/logo.jpg" className='rounded-full' alt="barbearia" style={{width:200}}/>

                <form onSubmit={handleSubmit((d) => console.log(d))} className="w-full max-w-xl flex flex-col px-28 p-2">

                    <label className='p-1  text-slate-300'>Email:</label>

                    <input type="email" {...register('email')} id="email"  className="rounded" name='email'     placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    {errors.email?.message && <p>{errors.email?.message}</p>}

                    <label className='p-1 text-slate-300'>Senha:</label>

                    <input type="password"  {...register('password', { valueAsNumber: true })} id="password"  className="rounded" name='password' placeholder='*****' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.password?.message && <p>{errors.password?.message}</p>}

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
