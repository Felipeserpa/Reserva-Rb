import { useState, useEffect } from "react";
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
import { db } from "../../../services/firebaseConection"; // Verifique se o caminho está correto
import {
  RiScissorsCutLine,
  RiAddLine,
  RiTimeLine,
  RiDeleteBin6Line,
  RiSave3Line,
  RiMagicLine,
  RiStarLine,
} from "react-icons/ri";

// Interface para os serviços
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

  // 1. Carregar serviços do Firebase
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

  // 2. Função para atualizar o estado conforme digita (Corrigida)
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setSelectedService((prev) => ({
      ...prev,
      // Converte para número apenas se for preço ou duração
      [name]: name === "preco" || name === "duracao" ? Number(value) : value,
    }));
  };

  // 3. Função para Salvar ou Editar no Firebase
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedService.nome || selectedService.preco <= 0) {
      toast.warn("Preencha o nome e um preço válido!");
      return;
    }

    try {
      if (selectedService.id) {
        // Editar serviço existente
        const docRef = doc(db, "servicos", selectedService.id);
        await setDoc(docRef, {
          nome: selectedService.nome,
          descricao: selectedService.descricao,
          preco: selectedService.preco,
          duracao: selectedService.duracao,
          categoria: selectedService.categoria,
        });
        toast.success("Serviço atualizado!");
      } else {
        // Adicionar novo serviço
        await addDoc(collection(db, "servicos"), {
          nome: selectedService.nome,
          descricao: selectedService.descricao,
          preco: selectedService.preco,
          duracao: selectedService.duracao,
          categoria: selectedService.categoria,
          createdAt: new Date(),
        });
        toast.success("Serviço cadastrado com sucesso!");
      }

      // Limpar formulário e recarregar lista
      setSelectedService({
        nome: "",
        descricao: "",
        preco: 0,
        duracao: 0,
        categoria: "",
      });
      loadServicos();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao salvar no banco de dados.");
    }
  };

  // 4. Função para Deletar
  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    if (!window.confirm("Deseja realmente excluir este serviço?")) return;

    try {
      await deleteDoc(doc(db, "servicos", id));
      toast.success("Serviço removido!");
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
    <div className="flex min-h-screen bg-[#13130a] text-zinc-300">
      <main className="flex-1 p-10 overflow-y-auto">
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">
              Gestão de Serviços
            </h2>
            <p className="text-zinc-500 text-sm">
              Configure o catálogo da sua barbearia.
            </p>
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
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-all shadow-lg"
          >
            <RiAddLine size={20} /> Novo Serviço
          </button>
        </div>

        <div className="grid grid-cols-[400px_1fr] gap-10">
          {/* FORMULÁRIO */}
          <section className="bg-[#1c1c12] p-8 rounded-2xl border border-white/5 h-fit sticky top-10">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <RiScissorsCutLine className="text-yellow-500" />{" "}
              {selectedService.id ? "Editar" : "Cadastrar"}
            </h3>

            <form onSubmit={handleSave} className="space-y-6">
              <div>
                <label className="text-[10px] uppercase font-bold text-yellow-500/70 mb-2 block tracking-widest">
                  Nome do Serviço
                </label>
                <input
                  type="text"
                  name="nome"
                  value={selectedService.nome}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-yellow-500 text-white"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-yellow-500/70 mb-2 block tracking-widest">
                  Descrição
                </label>
                <textarea
                  name="descricao"
                  rows={3}
                  value={selectedService.descricao}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-yellow-500 text-sm text-white resize-none"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-[10px] uppercase font-bold text-yellow-500/70 mb-2 block tracking-widest">
                    Preço (R$)
                  </label>
                  <input
                    type="number"
                    name="preco"
                    value={selectedService.preco || ""}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-yellow-500 text-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] uppercase font-bold text-yellow-500/70 mb-2 block tracking-widest">
                    Duração (Min)
                  </label>
                  <input
                    type="number"
                    name="duracao"
                    value={selectedService.duracao || ""}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-yellow-500 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-yellow-500/70 mb-2 block tracking-widest">
                  Categoria
                </label>
                <select
                  name="categoria"
                  value={selectedService.categoria}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-yellow-500 text-white"
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
                  className="flex-1 bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-600 transition-all flex items-center justify-center gap-2"
                >
                  <RiSave3Line size={20} /> Salvar
                </button>
                {selectedService.id && (
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedService.id)}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 text-red-500 transition-all"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                )}
              </div>
            </form>
          </section>

          {/* LISTAGEM DIREITA */}
          <section className="space-y-4">
            {servicos.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedService(item)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer bg-[#1c1c12] ${selectedService.id === item.id ? "border-yellow-500/50 bg-yellow-500/5" : "border-white/5 hover:border-white/10"}`}
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center">
                    <RiScissorsCutLine size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h5 className="font-bold text-lg text-white">
                        {item.nome}
                      </h5>
                      <span className="text-xl font-bold text-yellow-500">
                        R$ {item.preco.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="bg-white/5 text-zinc-400 text-[10px] px-2 py-1 rounded uppercase font-bold">
                        {item.categoria}
                      </span>
                      <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-bold uppercase">
                        <RiTimeLine size={14} /> {item.duracao} min
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
