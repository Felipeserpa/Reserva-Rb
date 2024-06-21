import logoBarb from "./../../../public/images/logo.jpg";
export default function Home() {
  return (
    <div className="grid justify-items-center mt-28">
      <img
        src={logoBarb}
        className="rounded-full"
        alt="barbearia"
        style={{ width: 200 }}
      />
      <p className="text-slate-100 h-9 mt-4">Sejam bem-vindos</p>
      <div>
        <nav className="flex justify-center space-x-4">
          <a
            href="/login"
            className="font-medium px-3 py-2 text-slate-100 rounded-lg hover:bg-slate-100 hover:text-slate-900"
          >
            Login
          </a>
          <a
            href="/Cadastro"
            className="font-medium px-3 py-2 text-slate-100 rounded-lg hover:bg-slate-100 hover:text-slate-900"
          >
            Cadastro
          </a>
        </nav>
      </div>
    </div>
  );
}
