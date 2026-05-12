/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConection";
import { toast } from "react-toastify";
import { RiMailLine, RiLockPasswordLine } from "react-icons/ri"; // Importar ícones se desejar

const schema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .min(1, "O email é obrigatório"),
  password: z.string().min(1, "A senha é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    signOut(auth);
  }, []);

  const onSubmit = async (data: FormData) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("@detailUser", JSON.stringify(user));
        navigate("/cliente");
        toast.success(`Bem-vindo de volta!`);
      })
      .catch(() => {
        toast.error("Email ou senha incorretos!");
      });
  };

  return (
    <div className="min-h-screen bg-[#1a1a0f] text-zinc-400 font-sans flex flex-col">
      {/* Header Estilo screen_4.jpg */}
      <header className="p-6 flex justify-between items-center">
        <h1 className="text-yellow-600 font-black text-2xl tracking-tighter uppercase">
          Golden Blade
        </h1>
        <span className="text-yellow-600 text-xs font-bold tracking-widest uppercase">
          Acesso
        </span>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        {/* Títulos centrais */}
        <div className="text-center mb-8">
          <p className="text-[10px] text-yellow-600 uppercase font-bold tracking-[0.3em] mb-2">
            Bem-vindo de volta
          </p>
          <h2 className="text-2xl font-bold text-white mb-2">
            Entre na sua conta
          </h2>
          <p className="text-zinc-500 text-sm">
            Prepare seu visual com os melhores mestres.
          </p>
        </div>

        {/* Card de Login */}
        <div className="w-full max-w-md bg-[#222214]/50 p-8 rounded-sm border-l-2 border-yellow-600">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Campo Email */}
            <div>
              <label className="text-[10px] uppercase font-bold text-yellow-600 tracking-widest mb-2 block">
                E-mail de acesso
              </label>
              <div className="relative">
                <RiMailLine
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <input
                  type="email"
                  {...register("email")}
                  placeholder="seu@email.com"
                  className="w-full bg-[#1a1a0f] border border-white/5 rounded-sm p-3 pl-10 text-white outline-none focus:border-yellow-600 transition-all placeholder:text-zinc-700"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Campo Senha */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[10px] uppercase font-bold text-yellow-600 tracking-widest block">
                  Sua Senha
                </label>
                <Link
                  to="/login/RecSenha"
                  className="text-[10px] text-zinc-500 hover:text-yellow-600"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <div className="relative">
                <RiLockPasswordLine
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                  size={18}
                />
                <input
                  type="password"
                  {...register("password")}
                  placeholder="........"
                  className="w-full bg-[#1a1a0f] border border-white/5 rounded-sm p-3 pl-10 text-white outline-none focus:border-yellow-600 transition-all placeholder:text-zinc-700"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-black font-black py-4 rounded-sm transition-all uppercase tracking-widest text-xs"
            >
              Entrar no clube
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-zinc-500">
              Não possui acesso?{" "}
              <Link
                to="/cadastro"
                className="text-yellow-600 font-bold hover:underline"
              >
                Criar conta agora
              </Link>
            </p>
          </div>
        </div>

        {/* Imagens de rodapé estilo galeria (opcional, igual à imagem) */}
        <div className="flex gap-4 mt-12 opacity-40 grayscale hover:opacity-100 hover:grayscale-0 transition-all">
          <div className="w-40 h-20 bg-zinc-800 rounded-sm overflow-hidden border border-white/5">
            <img
              src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=200"
              alt="barber"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-40 h-20 bg-zinc-800 rounded-sm overflow-hidden border border-white/5">
            <img
              src="https://images.unsplash.com/photo-1621605815971-fbc98d665033?q=80&w=200"
              alt="tools"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </main>

      {/* Footer Estilo screen_4.jpg */}
      <footer className="p-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-zinc-600 gap-4">
        <p>GOLDEN BLADE</p>
        <p>© 2024 GOLDEN BLADE BARBERSHOP. EXCELLENCE IN GROOMING.</p>
        <div className="flex gap-6">
          <Link to="#" className="hover:text-yellow-600 transition-colors">
            Termos
          </Link>
          <Link to="#" className="hover:text-yellow-600 transition-colors">
            Privacidade
          </Link>
          <Link to="#" className="hover:text-yellow-600 transition-colors">
            Contato
          </Link>
        </div>
      </footer>
    </div>
  );
}
