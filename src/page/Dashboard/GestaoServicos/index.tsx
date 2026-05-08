import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../../services/firebaseConection";
import {
  RiScissorsCutLine,
  RiAddLine,
  RiTimeLine,
  RiDeleteBin6Line,
  RiSave3Line,
  RiArrowLeftLine,
} from "react-icons/ri";

interface Servico {
  id?: string;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number;
  categoria: string;
}

export default function GestaoServicos() {
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [selectedService, setSelectedService] = useState<Servico>({
    nome: "",
    descricao: "",
    preco: 0,
    duracao: 0,
    categoria: "",
  });

  const loadServicos = async () => {
    try {
      const q = query(collection(db, "servicos"), orderBy("nome", "asc"));
      const querySnapshot = await getDocs(q);
      const lista = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Servico[];
      setServicos(lista);
    } catch (error) {
      console.error("Erro ao carregar serviços:", error);
    }
  };

  useEffect(() => {
    loadServicos();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setSelectedService((prev) => ({
      ...prev,
      [name]: name === "preco" || name === "duracao" ? Number(value) : value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService.nome || selectedService.preco <= 0) {
      toast.warn("Preencha o nome e um preço válido!");
      return;
    }

    try {
      if (selectedService.id) {
        const docRef = doc(db, "servicos", selectedService.id);
        await setDoc(docRef, { ...selectedService });
        toast.success("Serviço atualizado!");
      } else {
        await addDoc(collection(db, "servicos"), {
          ...selectedService,
          createdAt: new Date(),
        });
        toast.success("Serviço cadastrado!");
      }
      setSelectedService({
        nome: "",
        descricao: "",
        preco: 0,
        duracao: 0,
        categoria: "",
      });
      loadServicos();
    } catch (error) {
      toast.error("Erro ao salvar.");
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id || !window.confirm("Excluir este serviço?")) return;
    try {
      await deleteDoc(doc(db, "servicos", id));
      toast.success("Removido!");
      setSelectedService({
        nome: "",
        descricao: "",
        preco: 0,
        duracao: 0,
        categoria: "",
      });
      loadServicos();
    } catch (error) {
      toast.error("Erro ao excluir.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a05] text-zinc-300">
      <main className="flex-1 p-4 md:p-10">
        {/* HEADER RESPONSIVO */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
              GESTÃO DE SERVIÇOS
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              Configure o catálogo da Stecnologic.
            </p>

            <Link
              to="/Dashboard"
              className="inline-flex items-center gap-2 mt-4 text-yellow-500 font-bold hover:underline"
            >
              <RiArrowLeftLine /> Voltar ao Painel
            </Link>
          </div>

          <button
            onClick={() =>
              setSelectedService({
                nome: "",
                descricao: "",
                preco: 0,
                duracao: 0,
                categoria: "",
              })
            }
            className="w-full md:w-auto bg-yellow-500 hover:bg-yellow-600 text-black font-black py-4 px-8 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-yellow-500/10"
          >
            <RiAddLine size={24} /> NOVO SERVIÇO
          </button>
        </div>

        {/* GRID PRINCIPAL RESPONSIVO */}
        <div className="flex flex-col lg:grid lg:grid-cols-[400px_1fr] gap-8">
          {/* FORMULÁRIO (Fica em cima no mobile) */}
          <section className="bg-[#14140f] p-6 md:p-8 rounded-3xl border border-white/5 h-fit lg:sticky lg:top-10">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2 uppercase tracking-widest text-sm">
              <RiScissorsCutLine className="text-yellow-500" />
              {selectedService.id ? "Editar Serviço" : "Novo Cadastro"}
            </h3>

            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="text-[10px] uppercase font-black text-zinc-500 mb-2 block tracking-[2px]">
                  Nome
                </label>
                <input
                  type="text"
                  name="nome"
                  value={selectedService.nome}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-yellow-500 text-white transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-black text-zinc-500 mb-2 block tracking-[2px]">
                  Descrição
                </label>
                <textarea
                  name="descricao"
                  rows={2}
                  value={selectedService.descricao}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-yellow-500 text-white resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase font-black text-zinc-500 mb-2 block tracking-[2px]">
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    name="preco"
                    value={selectedService.preco || ""}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-yellow-500 text-white"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase font-black text-zinc-500 mb-2 block tracking-[2px]">
                    Minutos
                  </label>
                  <input
                    type="number"
                    name="duracao"
                    value={selectedService.duracao || ""}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-yellow-500 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-black text-zinc-500 mb-2 block tracking-[2px]">
                  Categoria
                </label>
                <select
                  name="categoria"
                  value={selectedService.categoria}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-4 outline-none focus:border-yellow-500 text-white appearance-none"
                >
                  <option value="">Selecione...</option>
                  <option value="Corte">Corte de Cabelo</option>
                  <option value="Barba">Barba</option>
                  <option value="Combo">Combos</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 text-black font-black py-4 rounded-2xl hover:bg-yellow-600 transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest"
                >
                  <RiSave3Line size={20} /> Salvar
                </button>
                {selectedService.id && (
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedService.id)}
                    className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* LISTAGEM (Cards robustos para touch) */}
          <section className="space-y-4">
            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[3px] mb-4">
              Serviços Ativos ({servicos.length})
            </p>
            {servicos.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedService(item)}
                className={`p-5 md:p-6 rounded-3xl border transition-all cursor-pointer bg-[#14140f] ${
                  selectedService.id === item.id
                    ? "border-yellow-500 bg-yellow-500/5 shadow-lg shadow-yellow-500/5"
                    : "border-white/5 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div
                    className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-colors ${
                      selectedService.id === item.id
                        ? "bg-yellow-500 text-black"
                        : "bg-white/5 text-yellow-500"
                    }`}
                  >
                    <RiScissorsCutLine size={24} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-1">
                      <h5 className="font-bold text-lg text-white truncate uppercase tracking-tight">
                        {item.nome}
                      </h5>
                      <span className="text-xl font-black text-yellow-500">
                        R$ {item.preco.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-2">
                      <span className="bg-white/5 text-zinc-400 text-[10px] px-2 py-1 rounded-lg uppercase font-black tracking-widest border border-white/5">
                        {item.categoria}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-black uppercase tracking-widest">
                        <RiTimeLine size={14} className="text-yellow-500" />{" "}
                        {item.duracao} MIN
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
