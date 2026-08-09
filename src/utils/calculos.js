import { personagens, TIER_RULES, cones, EIDOLON_SPIKE, EIDOLON_EXCEPTIONS } from '../data/personagem';

export function calcularCustoPersonagem(nome, eidolons) {
  const personagemEncontrado = personagens.find(p => p.nome === nome);
  if (!personagemEncontrado) return 0;

  const regrasPersonagem = TIER_RULES[personagemEncontrado.tier];
  
  // Se o custo base do tier for 0 ele já começa zerado aqui sem precisar citar nome nenhum.
  let custoBase = regrasPersonagem ? regrasPersonagem.base : 0;
  let eidolonSpike = 0;
  let custoEidolons = 0;

  for (let nivel = 1; nivel <= eidolons; nivel++) {
    const chave = `E${nivel}`;

    // Soma o Spike se houver
    const spikeEncontrado = EIDOLON_SPIKE[chave]?.find(item => item.nome === personagemEncontrado.nome);
    if (spikeEncontrado) {
      eidolonSpike += spikeEncontrado.custo;
    }

    // Checa se o personagem ignora o custo deste nível de Eidolon
    const ehExcecao = EIDOLON_EXCEPTIONS[chave]?.includes(personagemEncontrado.nome);

    if (!ehExcecao) {
      const eTierAlto = ["A", "S", "Z"].includes(personagemEncontrado.tier);

      if ((nivel === 3 || nivel === 5) && eTierAlto) {
        custoEidolons += 0.5;
      } else {
        custoEidolons += regrasPersonagem.eidolon;
      }
    }
  }

  return custoBase + custoEidolons + eidolonSpike;
}

export function calcularCustoCone(nomeCone, sobreposicao, nomePersonagem){
    if (nomePersonagem === "Nada" || !nomePersonagem) { return 0; }
    const regrasCone = cones[nomeCone];
    if (!regrasCone) {return 0;}
    const personagemEncontrado = personagens.find(p => p.nome === nomePersonagem);
    if (personagemEncontrado && (personagemEncontrado.tier === "B" || personagemEncontrado.tier === "C" || personagemEncontrado.tier === "D" || personagemEncontrado.tier === "E" || personagemEncontrado.tier === "F")) {
        if (nomeCone === "Cone T5"){return 0.5 + regrasCone.adicional * (sobreposicao - 1);}}
    return (regrasCone.base + regrasCone.adicional * (sobreposicao - 1));
}

export function calcularCustoTime(time){
    let custoTime = 0;
    let temParceriaAtiva = false;
    for (const slot of time) {
        if (slot.personagem === "Nada" || !slot.personagem) {
            custoTime += TIER_RULES["Nada"].base;
            continue;
        }
        custoTime += calcularCustoPersonagem(slot.personagem, slot.eidolons);
        custoTime += calcularCustoCone(slot.cone, slot.sobreposicao, slot.personagem);
        const dadosPersonagem = personagens.find(p => p.nome === slot.personagem);
        if (dadosPersonagem && dadosPersonagem.partner && dadosPersonagem.partner !== "Nada") {
            const parceiroPresente = time.some(s => s.personagem === dadosPersonagem.partner);
            if (parceiroPresente) {temParceriaAtiva = true;}
        }
    }
    if (temParceriaAtiva) {custoTime += 1;}
    return custoTime;
}

export function calcularEficiencia(valorDeAcao, custoTime){
    return (valorDeAcao - (50 * custoTime))
}