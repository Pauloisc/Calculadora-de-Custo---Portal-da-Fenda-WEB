import './App.css'
import { useState } from 'react';
import { personagens, TIER_RULES, cones } from './data/personagem';
import { calcularCustoPersonagem, calcularCustoCone, calcularCustoTotal, calcularCustoTime } from './utils/calculos';

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

  let custoTotal = calcularCustoTotal(time1, time2, custoAdicional)
  let custoT1 = calcularCustoTime(time1)
  let custoT2 = calcularCustoTime(time2)

  return (
    <div className="app-container">
      <h1>Portal da Fenda - Calculadora de Custos</h1>

      <h2>Time 1</h2>
      <div className="time-container">
        {time1.map((slot, index) => (
          <div key={index} className="slot-container">
            <label>Slot {index + 1}</label>

            {/* Dropdown do Personagem */}
            <select
              value={slot.personagem}
              onChange={(event) => {
                atualizarSlot(time1, setTime1, index, "personagem", event.target.value)
              }}
            >
              {personagens.map(p => (
                <option key={p.nome} value={p.nome}>{p.nome}</option>
              ))}
            </select>

            {/* Input de Eidolons */}
            <input
              type="number"
              min={0}
              max={6}
              value={slot.eidolons}
              onChange={(event) => {
                atualizarSlot(time1, setTime1, index, "eidolons", Number(event.target.value))
              }}
            />

            {/* Dropdown do Cone */}
            <select
              value={slot.cone}
              onChange={(event) => {
                atualizarSlot(time1, setTime1, index, "cone", event.target.value)
              }}
            >
              {Object.keys(cones).map(nomeCone => (
                <option key={nomeCone} value={nomeCone}>{nomeCone}</option>
              ))}
            </select>

            {/* Input de Sobreposição */}
            <input
              type="number"
              min={1}
              max={5}
              value={slot.sobreposicao}
              onChange={(event) => {
                atualizarSlot(time1, setTime1, index, "sobreposicao", Number(event.target.value))
              }}
            />
          </div>
        ))}
      </div>
      <p>Custo: {custoT1}</p>

      <h2>Time 2</h2>
      <div className="time-container">
        {time2.map((slot, index) => (
          <div key={index} className="slot-container">
            <label>Slot {index + 1}</label>

            {/* Dropdown do Personagem */}
            <select
              value={slot.personagem}
              onChange={(event) => {
                atualizarSlot(time2, setTime2, index, "personagem", event.target.value)
              }}
            >
              {personagens.map(p => (
                <option key={p.nome} value={p.nome}>{p.nome}</option>
              ))}
            </select>

            {/* Input de Eidolons */}
            <input
              type="number"
              min={0}
              max={6}
              value={slot.eidolons}
              onChange={(event) => {
                atualizarSlot(time2, setTime2, index, "eidolons", Number(event.target.value))
              }}
            />

            {/* Dropdown do Cone */}
            <select
              value={slot.cone}
              onChange={(event) => {
                atualizarSlot(time2, setTime2, index, "cone", event.target.value)
              }}
            >
              {Object.keys(cones).map(nomeCone => (
                <option key={nomeCone} value={nomeCone}>{nomeCone}</option>
              ))}
            </select>

            {/* Input de Sobreposição */}
            <input
              type="number"
              min={1}
              max={5}
              value={slot.sobreposicao}
              onChange={(event) => {
                atualizarSlot(time2, setTime2, index, "sobreposicao", Number(event.target.value))
              }}
            />
          </div>
        ))}
      </div>
      <p>Custo: {custoT2}</p>

      {/* Input de custo adicional */}
      <div>
        <label>Custo Adicional: </label>
        <input
          type="number"
          value={custoAdicional}
          onChange={(event) => setCustoAdicional(Number(event.target.value))}
        />
      </div>
      <p>O custo total é: {custoTotal}</p>
    </div>
  )
}

export default App
