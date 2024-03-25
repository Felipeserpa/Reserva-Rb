import { useState } from 'react';
import {Link} from "react-router-dom";
import {useForm} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import styles from './login.module.css';



import { auth } from '../../services/fireaseConection';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';


const schema = z.object({

    email:z.string().email("insira um email válido").min(1,{message:'required'}),
    password: z.string().min(1, { message: 'A senha é obrigatória' }),

});

 export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
     const navigate = useNavigate();

const {register, handleSubmit, formState: {errors},} = useForm({

resolver :zodResolver(schema),
});

const onSubmit = async () => {
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      navigate('/cliente') 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};



    return (

        <div className={styles.body}>
            <div className="grid justify-items-center mt-24">
 
            <img src="image/logo.jpg" className='rounded-full' alt="barbearia" style={{width:200}}/>

                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl flex flex-col px-20 p-2">

                    <label className='p-1  text-slate-300'>Email:</label>

                    <input type="email" {...register('email')} id="email"  className="rounded" name='email' placeholder='Digite seu email' value={email} onChange={(e) => setEmail(e.target.value)} />
                     <p className='text-slate-300'>{errors.email?.message}</p>

                    <label className='p-1 text-slate-300'>Senha:</label>

                    <input type="password"  {...register('password')} id="password"  className="rounded" name='password' placeholder='*****' value={password} onChange={(e) => setPassword(e.target.value)} />
                   <p className='text-slate-300'>{errors.password?.message}</p>

                    <button
                        type="submit"
                        className="h-9 mt-3  bg-blue-600 rounded border-1 text-lg font-medium text-white p-1 ">
                       Login
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
