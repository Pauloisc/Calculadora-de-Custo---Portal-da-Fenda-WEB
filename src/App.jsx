import './styles/base.css';
import './styles/layout.css';
import './styles/form.css';
import './styles/components/slots.css';
import './styles/components/modals.css';

import { useState } from 'react';
import { calcularCustoTime, calcularEficiencia } from './utils/calculos';
import { TimeSection } from './components/TimeSection';
import ReactMarkdown from 'react-markdown';
import duvidasContent from './duvidas.md?raw';
import remarkGfm from 'remark-gfm';

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
  const [custoAdicional, setCustoAdicional] = useState("0");
  const [qtdTimes, setQtdTimes] = useState(1);
  const [mostrarTierList, setMostrarTierList] = useState(false);
  const [mostrarParceirosEquipe, setMostrarParceirosEquipe] = useState(false);
  const [mostrarEidolonImpacto, setMostrarEidolonImpacto] = useState(false);
  const [mostrarDuvidas, setMostrarDuvidas] = useState(false);

  const [custoValorDeAcao, setValorDeAcao] = useState(0);
  const [mostrarValorDeAcao, setVA] = useState(false);
  const [timeSelecionado, setTimeSelecionado] = useState(1);

  let custoTotal = 0;
  let custoT1 = calcularCustoTime(time1)
  let custoT2 = calcularCustoTime(time2)
  let custoT3 = calcularCustoTime(time3)

  let eficienciaValor = 0
  let custoDoTimeEscolhido = 0

  if (timeSelecionado == 1){
    custoDoTimeEscolhido = custoT1
  }
  else if (timeSelecionado == 2){
    custoDoTimeEscolhido = custoT2
  }
  else if (timeSelecionado == 3){
    custoDoTimeEscolhido = custoT3
  }

  const custoAdicionalNumerico = custoAdicional === "" || custoAdicional === "-" ? 0 : Number(custoAdicional.replace(",", ".")) || 0;
  if (qtdTimes === 1) {
    custoTotal = custoT1 + custoAdicionalNumerico;
  } else if (qtdTimes === 2) {
    custoTotal = custoT1 + custoT2 + custoAdicionalNumerico;
  } else {
    custoTotal = custoT1 + custoT2 + custoT3 + custoAdicionalNumerico;
  }

  return (
    <div className="app-container">
      <img 
        src='https://lh3.googleusercontent.com/d/11IJMUUMnKEuXPd2b7f9H0KRqKxHmPjRk'
        alt='Logo do evento Portal da Fenda'
        className= 'slot-logo'
      />
      <div className="times-wrapper">

      <button className="btn-mostrarduvidas" onClick={() => setMostrarDuvidas(true)}>?</button>

      {mostrarDuvidas &&(
        <div className="overlay-escura">
          <div className="modal-conteudo">
            <button className="btn-fechar-modal" onClick={() => setMostrarDuvidas(false)}>✕</button>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{duvidasContent}</ReactMarkdown>
          </div>
        </div>
      )}
        
        <TimeSection nTime="Time 1" time={time1} setTime={setTime1} custoT={custoT1} />

        {qtdTimes >= 2 && (
          <TimeSection nTime="Time 2" time={time2} setTime={setTime2} custoT={custoT2} />
        )}

        {qtdTimes === 3 && (
          <TimeSection nTime="Time 3" time={time3} setTime={setTime3} custoT={custoT3} />
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
            type="text"
            inputMode="decimal"
            value={custoAdicional}
            onChange={(event) => setCustoAdicional(event.target.value)}
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

      <button className="btn-eficiencia" onClick={() => setVA(true)}>Eficiência</button>

      {mostrarValorDeAcao && (
        <div className="overlay-escura">
          <div className="modal-conteudo">
            <button className="btn-fechar-modal" onClick={() => setVA(false)}>✕</button>
              <div>
                <label className="label-config"> Pontuação no nódulo: </label>
                  <input
                    className="input-config"
                    type="text"
                    inputMode="number"
                    value={custoValorDeAcao}
                    onChange={(event) => setValorDeAcao(event.target.value)}
                  />
                
                <select className="select-config" value={timeSelecionado} onChange={(event) => { setTimeSelecionado(Number(event.target.value)) }}>
                  <option value={1}>Time 1</option>
                  { qtdTimes >= 2 && <option value={2}>Time 2</option> }
                  { qtdTimes >= 3 && <option value={3}>Time 3</option> }
                </select>

                <p className="eficiencia-valor">Eficiência: {calcularEficiencia(custoValorDeAcao, custoDoTimeEscolhido)}</p>
                
              </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App
