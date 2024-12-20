import { useState } from "react";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import logoBarb from "./../../../public/images/logo.jpg";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./login.module.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConection";
import { toast } from "react-toastify";
import React from "react";

const schema = z.object({
  email: z
    .string()
    .email("insira um email válido")
    .min(1, { message: "required" }),
  password: z.string().min(1, { message: "A senha é obrigatória" }),
});

export default function AdminLogin() {
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
    try {
      // Tenta fazer login com o Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Verifica se o usuário é um administrador
      const isAdmin = user.email === "rayssa@gmail.com";

      if (isAdmin) {
        // Se for um administrador, redireciona para a página de admin
        navigate("/Dashboard");
        toast.success("Seja Bem-vindo(a)!");
      } else {
        // Caso contrário, redireciona para alguma outra página (se necessário)
        navigate("/outra-rota");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      // Trate o erro conforme necessário (ex.: exiba uma mensagem de erro)
    }
  };
  return (
    <div className={styles.body}>
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
          <label className="text-slate-300 p-1 text-xl">Área Restrita</label>

          <label className="p-1  text-slate-300">Email:</label>

          <input
            type="email"
            {...register("email")}
            id="email"
            className="rounded"
            name="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="text-slate-300">{String(errors?.message || "")}</p>

          <label className="p-1 text-slate-300">Senha:</label>

          <input
            type="password"
            {...register("password")}
            id="password"
            className="rounded"
            name="password"
            placeholder="*****"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <p className="text-slate-300">{String(errors?.message || "")}</p>

          <button
            type="submit"
            className="h-9 mt-3  bg-red-600 rounded border-1 text-lg font-medium text-white p-1 "
          >
            Login
          </button>

          <p className="text-slate-300">Esqueceu a senha?</p>
        </form>
      </div>
    </div>
  );
}
