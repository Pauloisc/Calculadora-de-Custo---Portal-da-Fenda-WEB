import { personagens, TIER_RULES, cones } from '../data/personagem';

export function calcularCustoPersonagem(nome, eidolons){
    const personagemEncontrado = personagens.find(p => p.nome === nome);
    if (!personagemEncontrado) {return 0;}
    const regras = TIER_RULES[personagemEncontrado.tier];
    return (regras.base + regras.eidolon * eidolons)
}

export function calcularCustoCone(nomeCone, sobreposicao, nomePersonagem){
    if (nomePersonagem === "Nada" || !nomePersonagem) { return 0; }
    const regrasCone = cones[nomeCone];
    if (!regrasCone) {return 0;}
    const personagemEncontrado = personagens.find(p => p.nome === nomePersonagem);
    if (personagemEncontrado && (personagemEncontrado.tier === "D" || personagemEncontrado.tier === "E" || personagemEncontrado.tier === "F")) {
        if (nomeCone === "Cone T5"){
            return 0.5 + regrasCone.adicional * (sobreposicao - 1);}}
    return (regrasCone.base + regrasCone.adicional * (sobreposicao - 1));
}

export function calcularCustoTime(time){
    let custoTime = 0;
    for (const slot of time) {
        if (slot.personagem === "Nada" || !slot.personagem) {
            custoTime -= 1.5; 
            continue;
        }
        custoTime += calcularCustoPersonagem(slot.personagem, slot.eidolons);
        custoTime += calcularCustoCone(slot.cone, slot.sobreposicao, slot.personagem);
        const dadosPersonagem = personagens.find(p => p.nome === slot.personagem);
        if (dadosPersonagem && dadosPersonagem.partner && dadosPersonagem.partner !== "Nada") {
            const parceiroPresente = time.some(s => s.personagem === dadosPersonagem.partner);
            if (parceiroPresente) {custoTime += 1;}}
    }
    return custoTime;
}

export function calcularCustoTotal(time1, time2, extra){
    return calcularCustoTime(time1) + calcularCustoTime(time2) + extra;
}