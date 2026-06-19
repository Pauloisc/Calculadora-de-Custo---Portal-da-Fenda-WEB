import { personagens, TIER_RULES, cones } from '../data/personagem';

export function calcularCustoPersonagem(nome, eidolons){
    const personagemEncontrado = personagens.find(p => p.nome === nome);
    if (!personagemEncontrado) {return 0;}
    const regras = TIER_RULES[personagemEncontrado.tier];
    const custo = (regras.base + regras.eidolon * eidolons);
    return custo;
}

export function calcularCustoCone(nomeCone, sobreposicao){
    const regrasCone = cones[nomeCone];
    if (!regrasCone) {return 0;}
    const custo = regrasCone.base + regrasCone.adicional * (sobreposicao - 1);
    return custo;
}

export function calcularCustoTotal(time1, time2, extra){
    let custoTotal = 0;
    time1.forEach(slot => {
        custoTotal += calcularCustoPersonagem(slot.personagem, slot.eidolons);
        custoTotal += calcularCustoCone(slot.cone, slot.sobreposicao);
    });
    time2.forEach(slot => {
        custoTotal += calcularCustoPersonagem(slot.personagem, slot.eidolons);
        custoTotal += calcularCustoCone(slot.cone, slot.sobreposicao);
    });
    return custoTotal += extra;;
}