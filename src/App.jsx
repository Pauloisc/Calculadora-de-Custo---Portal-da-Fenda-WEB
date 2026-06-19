import './App.css'
import { useState } from 'react';
import { personagens, TIER_RULES, cones } from './data/personagem';
import { calcularCustoPersonagem, calcularCustoCone, calcularCustoTotal } from './utils/calculos';

const timeInicial = [
  { personagem: "Nada", eidolons: 0, cone: "Nada", sobreposicao: 1 },
  { personagem: "Nada", eidolons: 0, cone: "Nada", sobreposicao: 1 },
  { personagem: "Nada", eidolons: 0, cone: "Nada", sobreposicao: 1 },
  { personagem: "Nada", eidolons: 0, cone: "Nada", sobreposicao: 1 }
];

function App() {
  const [time1, setTime1] = useState(timeInicial);
  const [time2, setTime2] = useState(timeInicial);
  const [custoAdicional, setCustoAdicional] = useState(0);

  const atualizarSlot = (time, setTime, index, campo, valor) => {
    const novoTime = [...time];
    novoTime[index] = {
      ...novoTime[index],
      [campo]: valor
    };
    setTime(novoTime);
  };

  let custoTotal = calcularCustoTotal(time1,time2,custoAdicional);
  return (
    <div className="app-container">
      <h1>Portal da Fenda - Calculadora de Custos</h1>
      <p>Em breve aqui a nossa calculadora de Honkai Star Rail!</p>
      <p>O custo total é: {custoTotal}</p>
      <h2>Time 1</h2>
      <div className="time-container">
        {time1.map((slot, index) => (
          <div key={index} className="slot-container">
            <span>Slot {index + 1}: </span>
            <select
              value={slot.personagem}
              onChange={(event) => {
                atualizarSlot(time1, setTime1, index, "personagem", event.target.value)
              }}
            >
              {personagens.map(p => (
                <option key={p.nome} value={p.nome}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
      <h2>Time 2</h2>
      <div className="time-container">
        {time2.map((slot, index) => (
          <div key={index} className="slot-container">
            <span>Slot {index + 1}: </span>
            <select
              value={slot.personagem}
              onChange={(event) => {
                atualizarSlot(time2, setTime2, index, "personagem", event.target.value)
              }}
            >
              {personagens.map(p => (
                <option key={p.nome} value={p.nome}>
                  {p.nome}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
