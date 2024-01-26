
export default function Home() {
    return (

        <div className='grid justify-items-center mt-24'>
            <img src="image/logo.jpg" alt="barbearia" style={{ width: 200 }} />
            <p className="">Sejam bem vindo</p>
            <div>
                <nav className="flex justify-center space-x-4">
                   
                    <a href="/login" className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Login</a>
                    <a href="/Cadastro" className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Cadastro</a>

                </nav>
            </div>

        </div>

    )
}