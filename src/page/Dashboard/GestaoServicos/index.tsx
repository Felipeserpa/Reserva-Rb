import { useState } from "react";
import {
  RiScissorsCutLine,
  RiAddLine,
  RiSearchLine,
  RiTimeLine,
  RiPriceTag3Line,
  RiDeleteBin6Line,
  RiSave3Line,
  RiMagicLine,
  RiStarLine,
} from "react-icons/ri";

// Interface para os serviços
interface Servico {
  id: string;
  nome: string;
  descricao: string;
  preco: number;
  duracao: number; // em minutos
  categoria: string;
}

export default function GestaoServicos() {
  // Estado para o serviço sendo editado
  const [selectedService, setSelectedService] = useState<Servico>({
    id: "1",
    nome: "Corte Degradê",
    descricao: "Corte moderno com acabamento lateral em degradê suave.",
    preco: 65.0,
    duracao: 45,
    categoria: "Corte de Cabelo",
  });

  return (
    <div className="flex min-h-screen bg-[#13130a] text-zinc-300">
      {/* SIDEBAR (Mesma da Dashboard) */}
      <aside className="w-64 border-r border-white/5 p-6 flex flex-col gap-8">
        <div className="flex items-center gap-2 px-2 text-yellow-500">
          <RiScissorsCutLine size={28} />
          <h1 className="text-xl font-bold tracking-tighter text-white">
            BARBEARIA PREMIUM
          </h1>
        </div>
        <nav className="flex flex-col gap-2">
          {/* ... itens de navegação ... */}
          <div className="flex items-center gap-3 px-3 py-2 bg-yellow-500/10 text-yellow-500 rounded-lg cursor-pointer">
            <RiScissorsCutLine /> Serviços
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        {/* HEADER */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">
              Gestão de Serviços
            </h2>
            <p className="text-zinc-500 text-sm">
              Configure o catálogo, durações e preços para seus clientes.
            </p>
          </div>
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-all shadow-lg shadow-yellow-500/10">
            <RiAddLine size={20} /> Novo Serviço
          </button>
        </div>

        {/* LAYOUT EM DUAS COLUNAS */}
        <div className="grid grid-cols-[400px_1fr] gap-10">
          {/* COLUNA ESQUERDA: FORMULÁRIO DE EDIÇÃO */}
          <section className="bg-[#1c1c12] p-8 rounded-2xl border border-white/5 h-fit sticky top-10">
            <div className="flex items-center gap-3 mb-8 text-yellow-500">
              <RiScissorsCutLine size={24} />
              <h3 className="text-xl font-bold text-white">Editar Serviço</h3>
            </div>

            <form className="space-y-6">
              <div>
                <label className="text-[10px] uppercase font-bold text-yellow-500/70 mb-2 block">
                  Nome do Serviço
                </label>
                <input
                  type="text"
                  value={selectedService.nome}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-yellow-500 transition-all"
                />
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-yellow-500/70 mb-2 block">
                  Descrição
                </label>
                <textarea
                  rows={4}
                  value={selectedService.descricao}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-yellow-500 transition-all resize-none text-sm"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-[10px] uppercase font-bold text-yellow-500/70 mb-2 block">
                    Preço (R$)
                  </label>
                  <input
                    type="text"
                    value={selectedService.preco.toFixed(2)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-yellow-500"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] uppercase font-bold text-yellow-500/70 mb-2 block">
                    Duração (Min)
                  </label>
                  <input
                    type="number"
                    value={selectedService.duracao}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-yellow-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold text-yellow-500/70 mb-2 block">
                  Categoria
                </label>
                <select className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-yellow-500">
                  <option>Corte de Cabelo</option>
                  <option>Barba</option>
                  <option>Combos</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button className="flex-1 bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-600 transition-all flex items-center justify-center gap-2">
                  <RiSave3Line /> Salvar Alterações
                </button>
                <button className="p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-red-500/20 hover:text-red-500 transition-all text-zinc-500">
                  <RiDeleteBin6Line size={20} />
                </button>
              </div>
            </form>
          </section>

          {/* COLUNA DIREITA: LISTAGEM */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xs uppercase font-bold text-yellow-500/50 tracking-widest">
                Serviços Cadastrados (4)
              </h4>
              <span className="text-[10px] text-zinc-600 italic font-mono uppercase">
                Atualizado hoje às 14:30
              </span>
            </div>

            <div className="space-y-4">
              <ServiceItem
                icon={<RiScissorsCutLine size={24} />}
                title="Corte Degradê"
                desc="Corte moderno com acabamento lateral em degradê suave."
                price={65.0}
                time={45}
                category="CABELO"
                active
              />
              <ServiceItem
                icon={<RiMagicLine size={24} />}
                title="Barba Terapia"
                desc="Barba completa com toalha quente e massagem facial."
                price={45.0}
                time={30}
                category="BARBA"
              />
              <ServiceItem
                icon={<RiStarLine size={24} />}
                title="Combo VIP"
                desc="Cabelo + Barba + Sobrancelha + Bebida Inclusa."
                price={120.0}
                time={90}
                category="COMBOS"
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// Subcomponente de Item da Lista
interface ServiceItemProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  price: number;
  time: number;
  category: string;
  active?: boolean;
}

function ServiceItem({
  icon,
  title,
  desc,
  price,
  time,
  category,
  active = false,
}: ServiceItemProps) {
  return (
    <div
      className={`p-6 rounded-2xl border transition-all cursor-pointer ${active ? "bg-yellow-500/5 border-yellow-500/40" : "bg-[#1c1c12] border-white/5 hover:border-white/10"}`}
    >
      <div className="flex items-center gap-6">
        <div
          className={`w-14 h-14 rounded-xl flex items-center justify-center ${active ? "bg-yellow-500 text-black" : "bg-white/5 text-yellow-500/60"}`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <h5 className="font-bold text-lg text-white">{title}</h5>
            <span className="text-xl font-bold text-yellow-500">
              R$ {price.toFixed(2)}
            </span>
          </div>
          <p className="text-zinc-500 text-sm mb-3 line-clamp-1">{desc}</p>
          <div className="flex items-center gap-4">
            <span className="bg-yellow-500/10 text-yellow-500 text-[10px] font-black px-2 py-1 rounded tracking-tighter uppercase">
              {category}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-bold uppercase">
              <RiTimeLine size={14} /> {time} min
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
