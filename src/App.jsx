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
  let custoTotal = calcularCustoTotal(time1,time2,custoAdicional);
  return (
    <div className="app-container">
      <h1>Portal da Fenda - Calculadora de Custos</h1>
      <p>Em breve aqui a nossa calculadora de Honkai Star Rail!</p>
      <p>O custo total é: {custoTotal}</p>
      <h2>Time 1</h2>
      <select>
        {personagens.map(p => (
          <option key={p.nome} value={p.nome}>
          {p.nome}
          </option>
        ))}
      </select>
      <h2>Time 2</h2>
      <select>
        {personagens.map(p => (
          <option key={p.nome} value={p.nome}>
          {p.nome}
          </option>
        ))}
      </select>
    </div>
  )
}

export default App
