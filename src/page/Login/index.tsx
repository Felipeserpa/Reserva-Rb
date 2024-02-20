import { useState } from 'react';
import {Link} from "react-router-dom"

import {useForm} from 'react-hook-form';




import styles from './login.module.css';


 export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

 
const {register , handleSubmit, formState:{errors} } = useForm();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onSubmit = (data: any) =>{

    console.log(data);
};
 


    return (

        <div className={styles.body}>
            <div className="grid justify-items-center mt-24">
 
            <img src="image/logo.jpg" className='rounded-full' alt="barbearia" style={{width:200}}/>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl flex flex-col px-2 p-2">

                    <label className='p-1  text-slate-300'>Email:</label>

                    <input type="email" id="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className="rounded" name='email' placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)} />
                   {errors.email && errors.email.type === 'required' && <span className='text-slate-300'>O email é obrigatório.</span>}
                   {errors.email && errors.email.type === 'pattern' && <span className='text-slate-300'>O email deve ser válido.</span>}

                    <label className='p-1 text-slate-300'>Senha:</label>

                    <input type="password" id="senha" {...register('senha', { required: true, minLength: 6 })} className="rounded" name='password' placeholder='*****' value={password} onChange={(e) => setPassword(e.target.value)} />
                    {errors.senha && errors.senha.type === 'required' && <span className='text-slate-300'>A senha é obrigatória.</span>}
                    {errors.senha && errors.senha.type === 'minLength' && <span className='text-slate-300'>A senha deve ter pelo menos 6 caracteres.</span>}

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
