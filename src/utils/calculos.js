import { personagens, TIER_RULES, cones, EIDOLON_SPIKE } from '../data/personagem';

export function calcularCustoPersonagem(nome, eidolons){
    const personagemEncontrado = personagens.find(p => p.nome === nome);
    if (!personagemEncontrado) {return 0;}
    const regrasPersonagem = TIER_RULES[personagemEncontrado.tier];
    let temSpike = false;
    for (let nivel = 1; nivel <= eidolons; nivel++) {
        const chave = `E${nivel}`;
        if (EIDOLON_SPIKE[chave] && EIDOLON_SPIKE[chave].includes(personagemEncontrado.nome)) {
            temSpike = true;
        }
    }
    if (temSpike){
        return regrasPersonagem.base + regrasPersonagem.eidolon * eidolons + 1;
    }
    else{
        if (personagemEncontrado.nome == "Trailblazer") {return 0}
        else {return regrasPersonagem.base + regrasPersonagem.eidolon * eidolons}
    }
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