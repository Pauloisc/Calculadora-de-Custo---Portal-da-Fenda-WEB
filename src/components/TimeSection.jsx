import { personagens, cones } from '../data/personagem';
import { BuscaPersonagem } from './BuscaPersonagem';

const timeInicial = [
  { personagem: "Nada", eidolons: 0, cone: "Nada", sobreposicao: 1 },
  { personagem: "Nada", eidolons: 0, cone: "Nada", sobreposicao: 1 },
  { personagem: "Nada", eidolons: 0, cone: "Nada", sobreposicao: 1 },
  { personagem: "Nada", eidolons: 0, cone: "Nada", sobreposicao: 1 }
];

export function TimeSection({ nTime, time, setTime, custoT }) {

  const limparTime = () => {
    setTime(timeInicial);
  };

  const exportarTime = () => {
    const slotsAtivos = time.filter(slot => slot.personagem !== "Nada");
    const textosSlots = slotsAtivos.map(slot => {
      if (slot.cone === "Nada") {
        return `${slot.personagem} E${slot.eidolons} Sem cone`;
      } else {
        return `${slot.personagem} E${slot.eidolons} ${slot.cone} S${slot.sobreposicao}`;
      }
    });
    let textoFinal = textosSlots.join("\n");
    textoFinal += `\nCusto: ${custoT}`;
    navigator.clipboard.writeText(textoFinal);
    alert("Time copiado para a área de transferência!");
  };

  // time e setTime já chegam como props, então a função só precisa do index, campo e valor
  const atualizarSlot = (index, campo, valor) => {
    if (campo === "personagem" && valor === "Nada") {
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

  return (
    <div className="time-section">
      <h2>{nTime}</h2>
      <p className="custo-time">Custo: {custoT}</p>
      <div className="time-container">
        {time.map((slot, index) => {
          const dadosPersonagem = personagens.find(p => p.nome === slot.personagem) || { imagem: "ID" };
          return (
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
                  atualizarSlot(index, "personagem", novoPersonagem);
                }}
              />

              {/* Input de Eidolons */}
              <input
                type="number"
                min={0}
                max={6}
                value={slot.eidolons}
                onChange={(event) => {
                  atualizarSlot(index, "eidolons", Number(event.target.value));
                }}
              />

              {/* Dropdown do Cone */}
              <select
                value={slot.cone}
                onChange={(event) => {
                  atualizarSlot(index, "cone", event.target.value);
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
                  atualizarSlot(index, "sobreposicao", Number(event.target.value));
                }}
              />
            </div>
          );
        })}
        <div className="time-buttons-container">
          <button onClick={limparTime}>Limpar</button>
          <button onClick={exportarTime}>Exportar</button>
        </div>
      </div>
    </div>
  );
}
