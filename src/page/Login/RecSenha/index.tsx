import React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import logoBarb from "./../../../../public/images/logo.jpg";
export default function recSenha() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const navigate = useNavigate();

  return (
    <div>
      <div>
        <div className="grid justify-items-center mt-24">
          <img
            src={logoBarb}
            className="rounded-full"
            alt="barbearia"
            style={{ width: 200 }}
          />

          <form className="w-full max-w-xl flex flex-col px-20 p-2 ">
            <label className="p-1  text-slate-300">Email:</label>

            <input
              type="email"
              id="email"
              className="rounded pl-1"
              name="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-slate-300">{Error.email?.message}</p>

            <label className="p-1 text-slate-300">Senha:</label>

            <input
              type="password"
              id="password"
              className="rounded pl-1"
              name="password"
              placeholder="*****"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-slate-300">{Error.password?.message}</p>

            <button
              type="submit"
              className="h-9 mt-3  bg-blue-600 rounded border-1 text-lg font-medium text-white p-1 "
            >
              Login
            </button>
            <Link to="/cadastro">
              <p className="font-medium px-3 py-2 text-slate-100  hover:text-slate-500">
                Não tem conta?Cadastre-se
              </p>
            </Link>

            <Link to="/login/RecSenha">
              {" "}
              <p className="text-slate-300">Esqueceu a senha?</p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
