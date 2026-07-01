import './App.css'
import { useState } from 'react';
import { personagens, cones } from './data/personagem';
import { calcularCustoTime } from './utils/calculos';
import { BuscaPersonagem } from './components/BuscaPersonagem';

const timeInicial = [
  { personagem: "Nada", eidolons: 0, cone: "Nada", sobreposicao: 1 },
  { personagem: "Nada", eidolons: 0, cone: "Nada", sobreposicao: 1 },
  { personagem: "Nada", eidolons: 0, cone: "Nada", sobreposicao: 1 },
  { personagem: "Nada", eidolons: 0, cone: "Nada", sobreposicao: 1 }
];

function App() {
  const [time1, setTime1] = useState(timeInicial);
  const [time2, setTime2] = useState(timeInicial);
  const [time3, setTime3] = useState(timeInicial);
  const [custoAdicional, setCustoAdicional] = useState(0);
  const [qtdTimes, setQtdTimes] = useState(1);

  const limparTime1 = () => {setTime1(timeInicial);};
  const limparTime2 = () => {setTime2(timeInicial);};
  const limparTime3 = () => {setTime3(timeInicial);};

  const exportarTime = (time, custoTime) => {
    const slotsAtivos = time.filter(slot => slot.personagem !== "Nada");
    const textosSlots = slotsAtivos.map(slot => {
      if (slot.cone === "Nada") {
        return `${slot.personagem} E${slot.eidolons} Sem cone`;
      } else {
        return `${slot.personagem} E${slot.eidolons} ${slot.cone} S${slot.sobreposicao}`;
      }
    });
    let textoFinal = "";
    if (textosSlots.length > 0) {
      if (textosSlots.length > 1) {
        const ultimo = textosSlots.pop();
        textoFinal = textosSlots.join(", ") + " e " + ultimo;
      } else {
        textoFinal = textosSlots[0];
      }
    }
    textoFinal += ` = Custo ${custoTime}`;
    navigator.clipboard.writeText(textoFinal);
    alert("Time copiado para a área de transferência!");
  };

  const atualizarSlot = (time, setTime, index, campo, valor) => {
    const novoTime = [...time];
    novoTime[index] = {
      ...novoTime[index],
      [campo]: valor
    };
    setTime(novoTime);
  };

  let custoTotal = 0;
  let custoT1 = calcularCustoTime(time1)
  let custoT2 = calcularCustoTime(time2)
  let custoT3 = calcularCustoTime(time3)

  if (qtdTimes === 1) {
    custoTotal = custoT1 + custoAdicional;
  } else if (qtdTimes === 2) {
    custoTotal = custoT1 + custoT2 + custoAdicional;
  } else {
    custoTotal = custoT1 + custoT2 + custoT3 + custoAdicional;
  }

  return (
    <div className="app-container">
      <h1>Portal da Fenda - Calculadora de Custos</h1>
      <div className="times-wrapper">
        
        {/* Bloco do Time 1 */}
        <div className="time-section">
          <h2>Time 1</h2>
          <p>Custo: {custoT1}</p>
          <div className="time-container">
            {time1.map((slot, index) => {
              const dadosPersonagem = personagens.find(p => p.nome === slot.personagem) || { imagem: "ID" };
              return(
                <div key={index} className="slot-container">
                  <img 
                    src={dadosPersonagem && dadosPersonagem.imagem !== "ID" 
                      ? `https://lh3.googleusercontent.com/d/${dadosPersonagem.imagem}` 
                      : "https://placehold.co/150x150/2e303a/ffffff?text=?"
                    } 
                    alt={slot.personagem} 
                    className="slot-avatar"
                  />
                  <label>Slot {index + 1}</label>

                  <BuscaPersonagem
                    valorSelecionado={slot.personagem}
                    onSelecionar={(novoPersonagem) => {
                      atualizarSlot(time1, setTime1, index, "personagem", novoPersonagem)
                    }}
                  />

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
              );
            })}
            <div className="time-buttons-container">
              <button onClick={limparTime1}>Limpar</button>
              <button onClick={() => exportarTime(time1, custoT1)}>Exportar</button>
            </div>
          </div>
        </div>
        
        {/* Bloco do Time 2 */}
        {qtdTimes >= 2 && (
          <div className="time-section">
            <h2>Time 2</h2>
            <p>Custo: {custoT2}</p>
            <div className="time-container">
            {time2.map((slot, index) => {
                const dadosPersonagem = personagens.find(p => p.nome === slot.personagem) || { imagem: "ID" };
                return(
                  <div key={index} className="slot-container">
                    <img 
                      src={dadosPersonagem && dadosPersonagem.imagem !== "ID" 
                        ? `https://lh3.googleusercontent.com/d/${dadosPersonagem.imagem}` 
                        : "https://placehold.co/150x150/2e303a/ffffff?text=?"
                      } 
                      alt={slot.personagem} 
                      className="slot-avatar"
                    />
                    <label>Slot {index + 1}</label>

                    <BuscaPersonagem
                      valorSelecionado={slot.personagem}
                      onSelecionar={(novoPersonagem) => {
                        atualizarSlot(time2, setTime2, index, "personagem", novoPersonagem)
                      }}
                    />

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
                );
              })}
              <div className="time-buttons-container">
                <button onClick={limparTime2}>Limpar</button>
                <button onClick={() => exportarTime(time2, custoT2)}>Exportar</button>
              </div>   
            </div>  
          </div>
        )}

        {/* Bloco do Time 3 */}
        {qtdTimes === 3 && (
          <div className="time-section">
            <h2>Time 3</h2>
            <p>Custo: {custoT3}</p>
            <div className="time-container">
            {time3.map((slot, index) => {
                const dadosPersonagem = personagens.find(p => p.nome === slot.personagem) || { imagem: "ID" };
                return(
                  <div key={index} className="slot-container">
                    <img 
                      src={dadosPersonagem && dadosPersonagem.imagem !== "ID" 
                        ? `https://lh3.googleusercontent.com/d/${dadosPersonagem.imagem}` 
                        : "https://placehold.co/150x150/2e303a/ffffff?text=?"
                      } 
                      alt={slot.personagem} 
                      className="slot-avatar"
                    />
                    <label>Slot {index + 1}</label>

                    <BuscaPersonagem
                      valorSelecionado={slot.personagem}
                      onSelecionar={(novoPersonagem) => {
                        atualizarSlot(time3, setTime3, index, "personagem", novoPersonagem)
                      }}
                    />

                    {/* Input de Eidolons */}
                    <input
                      type="number"
                      min={0}
                      max={6}
                      value={slot.eidolons}
                      onChange={(event) => {
                        atualizarSlot(time3, setTime3, index, "eidolons", Number(event.target.value))
                      }}
                    />

                    {/* Dropdown do Cone */}
                    <select
                      value={slot.cone}
                      onChange={(event) => {
                        atualizarSlot(time3, setTime3, index, "cone", event.target.value)
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
                        atualizarSlot(time3, setTime3, index, "sobreposicao", Number(event.target.value))
                      }}
                    />
                  </div>
                );
              })}
              <div className="time-buttons-container">
                <button onClick={limparTime3}>Limpar</button>
                <button onClick={() => exportarTime(time3, custoT3)}>Exportar</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input da quantidade de times */}
      <div>
        <label>Quantidade de times: </label>
        <select value={qtdTimes} onChange={(event) => { setQtdTimes(Number(event.target.value)) }}>
          <option value={1}>1 Time</option>
          <option value={2}>2 Times</option>
          <option value={3}>3 Times</option>
        </select>
      </div>

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
  );
}

export default App
