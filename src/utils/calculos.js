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

export function calcularCustoTime(time){
    let custoTime = 0;
    time.forEach(slot => {
        custoTime += calcularCustoPersonagem(slot.personagem, slot.eidolons);
        const dadosPersonagem = personagens.find(p => p.nome === slot.personagem);
        if (dadosPersonagem && dadosPersonagem.partner && dadosPersonagem.partner !== "Nada") {
            time.forEach(s => {
                if(s.personagem == dadosPersonagem.partner){
                    custoTime += 1;
                }
            });
        }
        if(slot.personagem != "Nada"){
            custoTime += calcularCustoCone(slot.cone, slot.sobreposicao);
        }
    });
    return custoTime;
}

export function calcularCustoTotal(time1, time2, extra){
    return calcularCustoTime(time1) + calcularCustoTime(time2) + extra;
}