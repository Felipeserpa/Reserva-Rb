import { useState } from "react";
import { json, Link, useNavigate } from "react-router-dom";
import logoBarb from "./../../../public/images/logo.jpg";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const schema = z
  .object({
    nome: z.string().min(8, { message: "A nome é obrigatória" }),
    email: z
      .string()
      .email("Insira o email valido")
      .min(1, { message: "required" }),
    password: z.string().min(1, { message: "A senha é obrigatória" }),
  })
  .required();

export default function cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async () => {
    const auth = getAuth();

    try {
      // Criar usuário na autenticação do Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Criar usuário no banco de dados
      const db = getFirestore();
      await addDoc(collection(db, "users"), {
        nome: nome,
        email: email,
        password: password,
        uid: user.uid,

        // Adicione outros campos conforme necessário wPLktTHDArhK2xgbpFJ9QlxQnYc2
      });
      // Armazenar informações do usuário no localStorage
      const userData = {
        uid: user.uid,
        email: user.email,
        nome: nome,
        password: password,
      };
      localStorage.setItem("@detailUser", JSON.stringify(userData));

      console.log("Usuário registrado com sucesso!");
      toast.success("Seja bem-vindo ao Sistema!");
      navigate("/cliente");
      return user;

      // Você pode adicionar mais lógica aqui, como redirecionar o usuário para outra página após o login bem-sucedido
    } catch (error) {
      toast.error("Erro ao criar usuário!");
      console.error("Erro ao criar usuário:");
      // Tratar erros conforme necessário
    }
  };

  return (
    <div>
      <div className="grid justify-items-center mt-24">
        <img
          src={logoBarb}
          className="rounded-full"
          alt="barbearia"
          style={{ width: 200 }}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-xl flex flex-col px-20 p-2"
        >
          <label className="p-1  text-slate-300">Nome:</label>

          <input
            type="text"
            {...register("nome")}
            className="rounded pl-1"
            placeholder="Digite seu nome"
            name="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <p className="text-slate-300">{errors.nome?.message}</p>

          <label className="p-1  text-slate-300">Email:</label>

          <input
            type="email"
            {...register("email")}
            className="rounded pl-1"
            placeholder="Digite seu email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-slate-300">{errors.email?.message}</p>

          <label className="p-1  text-slate-300">Senha:</label>

          <input
            type="password"
            {...register("password")}
            className="rounded pl-1"
            placeholder="Digite sua senha"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-slate-300">{errors.password?.message}</p>

          <button className="h-9 mt-3  bg-blue-600 rounded border-1 text-lg font-medium text-white p-1">
            Cadastrar
          </button>

          <Link to="/Login">
            <p className="font-medium px-3 py-2 text-slate-100  hover:text-slate-500">
              já tem conta?Entrar
            </p>
          </Link>
        </form>
      </div>
    </div>
  );
}
