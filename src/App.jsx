import './styles/base.css';
import './styles/layout.css';
import './styles/form.css';
import './styles/components/slots.css';
import './styles/components/modals.css';

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
  const [mostrarTierList, setMostrarTierList] = useState(false);
  const [mostrarParceirosEquipe, setMostrarParceirosEquipe] = useState(false);
  const [mostrarEidolonImpacto, setMostrarEidolonImpacto] = useState(false);

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
    let textoFinal = textosSlots.join("\n");
    textoFinal += `\nCusto: ${custoTime}`;
    navigator.clipboard.writeText(textoFinal);
    alert("Time copiado para a área de transferência!");
  };

  const atualizarSlot = (time, setTime, index, campo, valor) => {
    if(campo == "personagem" && valor == "Nada"){
      const novoTime = [...time];
      novoTime[index] = {
        personagem: "Nada",
        eidolons: 0,
        cone: "Nada",
        sobreposicao: 1
      }; 
      setTime(novoTime);
      return;
    }
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
      <img 
        src='https://lh3.googleusercontent.com/d/11IJMUUMnKEuXPd2b7f9H0KRqKxHmPjRk'
        alt='Logo do evento Portal da Fenda'
        className= 'slot-logo'
      />
      <div className="times-wrapper">
        
        {/* Bloco do Time 1 */}
        <div className="time-section">
          <h2>Time 1</h2>
          <p className="custo-time">Custo: {custoT1}</p>
          <div className="time-container">
            {time1.map((slot, index) => {
              const dadosPersonagem = personagens.find(p => p.nome === slot.personagem) || { imagem: "ID" };
              return(
                <div key={index} className="slot-container">
                  <img 
                    src={dadosPersonagem && dadosPersonagem.imagem !== "ID" 
                      ? `https://lh3.googleusercontent.com/d/${dadosPersonagem.imagem}` 
                      : "https://placehold.co/150x150/transparent/ffffff.png?text=?"
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
            <p className="custo-time">Custo: {custoT2}</p>
            <div className="time-container">
            {time2.map((slot, index) => {
                const dadosPersonagem = personagens.find(p => p.nome === slot.personagem) || { imagem: "ID" };
                return(
                  <div key={index} className="slot-container">
                    <img 
                      src={dadosPersonagem && dadosPersonagem.imagem !== "ID" 
                        ? `https://lh3.googleusercontent.com/d/${dadosPersonagem.imagem}` 
                        : "https://placehold.co/150x150/transparent/ffffff.png?text=?"
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
            <p className="custo-time">Custo: {custoT3}</p>
            <div className="time-container">
            {time3.map((slot, index) => {
                const dadosPersonagem = personagens.find(p => p.nome === slot.personagem) || { imagem: "ID" };
                return(
                  <div key={index} className="slot-container">
                    <img 
                      src={dadosPersonagem && dadosPersonagem.imagem !== "ID" 
                        ? `https://lh3.googleusercontent.com/d/${dadosPersonagem.imagem}` 
                        : "https://placehold.co/150x150/transparent/ffffff.png?text=?"
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
        <label className="label-config">Quantidade de times: </label>
        <select className="select-config" value={qtdTimes} onChange={(event) => { setQtdTimes(Number(event.target.value)) }}>
          <option value={1}>1 Time</option>
          <option value={2}>2 Times</option>
          <option value={3}>3 Times</option>
        </select>
      </div>

      {/* Input de custo adicional */}
      <div>
        <label className="label-config">Custo adicional: </label>
        <input
          className="input-config"
          type="number"
          value={custoAdicional}
          onChange={(event) => setCustoAdicional(Number(event.target.value))}
        />
      </div>
      
      <p className="custo-total">O custo total é: {custoTotal}</p>

      <div className="bottom-buttons-container">
        <button className="btn-eidolonimpacto" onClick={() => setMostrarEidolonImpacto(true)}>Eidolons de Impacto</button>
        <button className="btn-tierlist" onClick={() => setMostrarTierList(true)}>Tier List</button>
        <button className="btn-parceirosequipe" onClick={() => setMostrarParceirosEquipe(true)}>Parceiros de Equipe</button>
      </div>

      {mostrarEidolonImpacto && (
        <div className="overlay-botoes">
          <div className="modal-conteudo">
            <button className="btn-fechar-modal" onClick={() => setMostrarEidolonImpacto(false)}>✕</button>
            <img 
              src="https://lh3.googleusercontent.com/d/1oia2JE25RIKyxV2nncDaasr8vMWhZ8dw"
              alt='Eidolons de Impacto'
              className= 'modal-img'
            />
          </div>
        </div>
      )}

      {mostrarTierList &&(
        <div className="overlay-botoes">
          <div className="modal-conteudo">
            <button className="btn-fechar-modal" onClick={() => setMostrarTierList(false)}>✕</button>
            <img 
              src="https://lh3.googleusercontent.com/d/1GeEnm96H__AKm8YydyZwgOnh5xJkVXa0"
              alt='Tier list do Portal da Fenda'
              className= 'modal-img'
            />
          </div>
        </div>
      )}

      {mostrarParceirosEquipe && (
        <div className="overlay-botoes">
          <div className="modal-conteudo">
            <button className="btn-fechar-modal" onClick={() => setMostrarParceirosEquipe(false)}>✕</button>
            <img 
              src="https://lh3.googleusercontent.com/d/1uzQoxG731cDEhDNrnde-rMlNk8UtXfuV"
              alt='Parceiros de equipe'
              className= 'modal-img'
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App
