import React, { useState } from "react";
import { db } from "../../services/firebaseConection";

const calendario = () => {
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");

  const buscarAgendamentos = async () => {
    try {
      const querySnapshot = await db
        .collection("agUser")
        .where("data", ">=", `${ano}-${mes}-01`)
        .where("data", "<=", `${ano}-${mes}-31`)
        .get();

      const agendamentos = querySnapshot.docs.map((doc) => doc.data());
      console.log("Agendamentos encontrados:", agendamentos);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  };

  return (
    <div>
      <select onChange={(e) => setDia(e.target.value)}>
        {/* Opções para selecionar o dia (1 a 31) */}
        <option value="01">01</option>
        <option value="09">02</option>
        {/* ... outras opções de meses */}
      </select>

      <select onChange={(e) => setMes(e.target.value)}>
        {/* Opções para selecionar o mês (1 a 12) */}
        <option value="01">Janeiro</option>
        <option value="09">Fevereiro</option>
        {/* ... outras opções de meses */}
      </select>
      <select onChange={(e) => setAno(e.target.value)}>
        {/* Opções para selecionar o ano (por exemplo, 2022, 2023, etc.) */}
        <option value="2022">2022</option>
        <option value="2024">2024</option>
        {/* ... outras opções de anos */}
      </select>
      <button onClick={buscarAgendamentos}>Buscar Agendamentos</button>
    </div>
  );
};

export default calendario;
