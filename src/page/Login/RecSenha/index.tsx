import React from "react";

import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import logoBarb from "./../../../../public/images/logo.jpg";
import { useNavigate } from "react-router-dom";
import RecSenhas from "./../../../components/modal/RecSenha";

export default function recSenha() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        
        navigate("/login");
      })
      .catch((error) => {
        console.log(" errorCode = error.code");
        const errorMessage = error.message;
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

          <form
            className="w-full max-w-xl flex flex-col px-20 p-2 "
            onSubmit={handleSubmit}
          >
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

            <button
              onClick={handleOpen}
              type="submit"
              className="h-9 mt-3  bg-red-600 rounded border-1 text-lg font-medium text-white p-1 "
            >
              Redefinir
            </button>
            <RecSenhas open={open} onClose={handleClose} />
          </form>
        </div>
      </div>
    </div>
  );
}
