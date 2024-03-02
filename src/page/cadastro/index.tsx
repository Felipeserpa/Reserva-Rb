
import { useState } from 'react';
import { Link } from "react-router-dom";

import {useForm,} from 'react-hook-form';

import {z} from 'zod';

import {zodResolver} from '@hookform/resolvers/zod'


const schema = z.object({

nome:z.string({ required_error: "Name is required",
invalid_type_error: "Name must be a string"}),

email:z.string().email('Insira o email valido').min(1,{message:'required'}),
password:z.number().min(8),

}).required()




export default function cadastro() {

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")



const {register,handleSubmit,formState:{errors},} = useForm({resolver:zodResolver(schema),
})
 const onSubmit = (data) => console.log(data)



    return (

        <div>
            <div className='grid justify-items-center mt-24'>
                <img src="image/logo.jpg" className='rounded-full' alt="barbearia" style={{ width: 200 }} />
                <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-xl flex flex-col px-20 p-2'>

                    <label className='p-1  text-slate-300'>Nome:</label>

                    <input type="text" {...register("nome")}className="rounded" placeholder='Digite seu nome' name='nome' value={nome} onChange={(e) => setNome(e.target.value)} />
                    <p>{errors.nome?.message}</p>

                    <label className='p-1  text-slate-300'>Email:</label>

                    <input type="email" {... register("email")} className="rounded" placeholder='Digite seu email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <p>{errors.email?.message}</p>

                    <label className='p-1  text-slate-300'>Senha:</label>

                    <input type="password" {...register("password")} className="rounded" placeholder='Digite sua senha' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <p>{errors.password?.message}</p> 

                    <button className='h-9 mt-3  bg-blue-600 rounded border-1 text-lg font-medium text-white p-1'>Cadastrar</button>

                    <Link to="/Login">
                        <p className='font-medium px-3 py-2 text-slate-100  hover:text-slate-500'>já tem conta?Entrar</p>
                    </Link>
                </form>

            </div>

        </div>


    );
}