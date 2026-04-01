import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../services/firebaseConection";
import { toast } from "react-toastify";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import {
  RiUserVoiceLine,
  RiCalendarEventLine,
  RiCheckDoubleLine,
  RiTimeLine,
  RiStarFill,
  RiServiceLine,
  RiArrowRightLine,
} from "react-icons/ri";

// Interfaces para tipagem
interface Servico {
  id: string;
  nome: string;
  preco: number;
  duracao: number;
  categoria: string;
  descricao: string;
}

const ClientPage = () => {
  // Estados de Dados
  const [servicosBanco, setServicosBanco] = useState<Servico[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de Seleção do Usuário
  const [step, setStep] = useState(1);
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null);
  const [selectedBarbeiro, setSelectedBarbeiro] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // 1. Carregar Serviços Reais do seu Banco
  useEffect(() => {
    async function getServicos() {
      try {
        const q = query(collection(db, "servicos"), orderBy("nome", "asc"));
        const snapshot = await getDocs(q);
        const lista = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Servico[];
        setServicosBanco(lista);
      } catch (err) {
        toast.error("Erro ao carregar catálogo.");
      } finally {
        setLoading(false);
      }
    }
    getServicos();
  }, []);

  // 2. Função Final de Agendamento
  const handleFinalizarAgendamento = async () => {
    const userDetail = localStorage.getItem("@detailUser");
    const user = userDetail ? JSON.parse(userDetail) : null;

    if (!user) {
      toast.warn("Você precisa estar logado para agendar!");
      return;
    }

    if (
      !selectedServico ||
      !selectedBarbeiro ||
      !selectedDate ||
      !selectedTime
    ) {
      toast.error("Por favor, selecione todos os campos!");
      return;
    }

    try {
      // Salva na coleção agUser (que você já usa no Mconta)
      await addDoc(collection(db, "agUser"), {
        nome: user.nome || "Cliente",
        userUid: user.uid,
        date: selectedDate,
        time: selectedTime,
        tel: user.telefone || "Não informado",
        cortes: selectedServico.nome,
        opcaoSelecionada: selectedBarbeiro, // Barbeiro
        created: new Timestamp(Math.floor(Date.now() / 1000), 0),
        status: "Pendente",
      });

      toast.success("🔥 Agendamento realizado com sucesso!");
      setStep(4); // Vai para tela de sucesso
    } catch (error) {
      toast.error("Erro ao processar agendamento.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a05] text-zinc-300 font-sans">
      <Navbar />

      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
        {/* STEPPER PROGRESS BAR (Esquerda) */}
        <aside className="w-full lg:w-72 border-r border-white/5 p-8 bg-[#0f0f0a] space-y-8">
          <div className="mb-10">
            <h1 className="text-xl font-black text-yellow-500 tracking-tighter italic">
              STECHNOLOGIC <span className="text-white">VIP</span>
            </h1>
          </div>

          <nav className="flex lg:flex-col justify-between gap-4">
            <StepIndicator
              n={1}
              current={step}
              title="Serviço"
              icon={<RiServiceLine />}
            />
            <StepIndicator
              n={2}
              current={step}
              title="Barbeiro"
              icon={<RiUserVoiceLine />}
            />
            <StepIndicator
              n={3}
              current={step}
              title="Horário"
              icon={<RiCalendarEventLine />}
            />
            <StepIndicator
              n={4}
              current={step}
              title="Confirmar"
              icon={<RiCheckDoubleLine />}
            />
          </nav>
        </aside>

        {/* ÁREA DE SELEÇÃO DINÂMICA */}
        <main className="flex-1 p-6 lg:p-12 overflow-y-auto custom-scrollbar">
          {/* STEP 1: SERVIÇOS (Vindo do Firebase) */}
          {step === 1 && (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-4xl font-bold text-white mb-8">
                O que vamos fazer hoje?
              </h2>
              <div className="grid gap-4">
                {loading ? (
                  <p>Carregando catálogo...</p>
                ) : (
                  servicosBanco.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        setSelectedServico(s);
                        setStep(2);
                      }}
                      className={`group p-6 rounded-2xl border-2 transition-all cursor-pointer flex justify-between items-center ${selectedServico?.id === s.id ? "border-yellow-500 bg-yellow-500/5" : "border-white/5 bg-[#14140f] hover:border-white/20"}`}
                    >
                      <div>
                        <h3 className="text-xl font-bold text-white uppercase">
                          {s.nome}
                        </h3>
                        <p className="text-zinc-500 text-sm">
                          {s.duracao} min • {s.categoria}
                        </p>
                      </div>
                      <span className="text-2xl font-black text-yellow-500">
                        R$ {s.preco.toFixed(2)}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* STEP 2: BARBEIROS */}
          {step === 2 && (
            <div className="animate-in slide-in-from-right duration-500">
              <button
                onClick={() => setStep(1)}
                className="text-zinc-500 mb-4 hover:text-white transition-all text-sm"
              >
                ← Voltar para serviços
              </button>
              <h2 className="text-4xl font-bold text-white mb-8">
                Escolha seu Profissional
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["Marcus Sterling", "Leo Rossi", "Vitor Hugo"].map(
                  (barbeiro) => (
                    <div
                      key={barbeiro}
                      onClick={() => {
                        setSelectedBarbeiro(barbeiro);
                        setStep(3);
                      }}
                      className={`p-6 rounded-3xl border-2 text-center transition-all cursor-pointer ${selectedBarbeiro === barbeiro ? "border-yellow-500 bg-yellow-500/5" : "border-white/5 bg-[#14140f] hover:border-white/10"}`}
                    >
                      <div className="w-24 h-24 bg-zinc-800 rounded-full mx-auto mb-4 border-4 border-white/5 overflow-hidden">
                        <div className="w-full h-full bg-gradient-to-tr from-yellow-600 to-yellow-300 opacity-50"></div>
                      </div>
                      <h4 className="text-xl font-bold text-white">
                        {barbeiro}
                      </h4>
                      <div className="flex justify-center text-yellow-500 mt-2">
                        <RiStarFill />
                        <RiStarFill />
                        <RiStarFill />
                        <RiStarFill />
                        <RiStarFill />
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          {/* STEP 3: DATA E HORA */}
          {step === 3 && (
            <div className="animate-in slide-in-from-right duration-500">
              <h2 className="text-4xl font-bold text-white mb-8">Quando?</h2>
              <input
                type="date"
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-[#14140f] border border-white/10 p-4 rounded-xl text-white mb-8 outline-none focus:border-yellow-500"
              />
              <div className="grid grid-cols-4 gap-3">
                {["09:00", "10:00", "14:00", "16:00", "19:00"].map((hora) => (
                  <button
                    key={hora}
                    onClick={() => setSelectedTime(hora)}
                    className={`p-3 rounded-lg border-2 font-bold ${selectedTime === hora ? "bg-yellow-500 text-black border-yellow-500" : "border-white/5 text-zinc-500 hover:border-white/20"}`}
                  >
                    {hora}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setStep(4)}
                disabled={!selectedDate || !selectedTime}
                className="w-full mt-10 bg-yellow-500 text-black font-black py-4 rounded-xl flex items-center justify-center gap-2 disabled:opacity-30"
              >
                Revisar Agendamento <RiArrowRightLine />
              </button>
            </div>
          )}

          {/* STEP 4: RESUMO E CONFIRMAÇÃO */}
          {step === 4 && (
            <div className="text-center max-w-md mx-auto py-10 animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-yellow-500/10 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-yellow-500/20">
                <RiCheckDoubleLine size={40} />
              </div>
              <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter">
                Confirmar Pedido
              </h2>
              <div className="bg-[#14140f] p-6 rounded-3xl border border-white/5 text-left space-y-4 mb-8">
                <p className="flex justify-between text-sm">
                  <span className="text-zinc-500">Serviço:</span>{" "}
                  <b className="text-white">{selectedServico?.nome}</b>
                </p>
                <p className="flex justify-between text-sm">
                  <span className="text-zinc-500">Barbeiro:</span>{" "}
                  <b className="text-white">{selectedBarbeiro}</b>
                </p>
                <p className="flex justify-between text-sm">
                  <span className="text-zinc-500">Horário:</span>{" "}
                  <b className="text-white">
                    {selectedDate} às {selectedTime}
                  </b>
                </p>
                <div className="h-[1px] bg-white/5"></div>
                <p className="flex justify-between text-xl">
                  <span className="text-zinc-500">Total:</span>{" "}
                  <b className="text-yellow-500">
                    R$ {selectedServico?.preco.toFixed(2)}
                  </b>
                </p>
              </div>
              <button
                onClick={handleFinalizarAgendamento}
                className="w-full bg-yellow-500 text-black font-black py-4 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-yellow-500/10"
              >
                FINALIZAR AGENDAMENTO
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

// Componente de Suporte para o Stepper
const StepIndicator = ({
  n,
  current,
  title,
  icon,
}: {
  n: number;
  current: number;
  title: string;
  icon: any;
}) => (
  <div
    className={`flex items-center gap-4 ${current >= n ? "text-yellow-500" : "text-zinc-700"}`}
  >
    <div
      className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all ${current >= n ? "bg-yellow-500/10 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.1)]" : "border-white/5"}`}
    >
      {icon}
    </div>
    <div className="hidden lg:block text-left">
      <p className="text-[10px] uppercase font-bold opacity-50">Passo {n}</p>
      <p className="text-sm font-bold text-white">{title}</p>
    </div>
  </div>
);

export default ClientPage;
