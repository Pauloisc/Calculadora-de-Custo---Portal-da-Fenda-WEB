# 🌀 Portal da Fenda — Calculadora de Custos

Calculadora de custos de times para o evento **Portal da Fenda**, um evento de PvP para o jogo **Honkai: Star Rail** feito para o servidor do Discord do criador de ceonteúdo [Mimzy](https://www.youtube.com/@mimzy_official)

Permite montar dois times com até 4 personagens cada, configurando eidolons, cones de luz e sobreposição, e calcula automaticamente o custo total do setup com base nas regras de tier.

🔗 **Acesse online:** [portal-da-fenda.vercel.app](https://calculadora-de-custo-portal-da-fend.vercel.app/)

---

## ✨ Funcionalidades

- Seleção de personagens com foto
- Configuração de **eidolons** (E0–E6) por personagem
- Seleção de **cone de luz** com cálculo de custo por tier (T3–T5)
- Configuração de **sobreposição** do cone (S1–S5)
- Cálculo automático de custo por time e custo total
- Bônus automático para personagens parceiros (ex: Ashveil + Mortenax Blade)
- Campo de **custo adicional** manual
- Layout responsivo: grade 2×2 por time no PC, empilhado no celular

---

## Regras de Custo

### Personagens (por tier)

| Tier | Base | Por Eidolon |
|------|------|-------------|
| Error | 2 | +1.5 |
| Pilares do Meta | 1 | +1.5 |
| Brilhantes | 0.5 | +1 |
| Coringas | 0 | +0.5 |
| Neutros | 0 | 0 |
| Quebra Galho | -0.5 | 0 |
| Fundo do Poço | -1 | 0 |
| Slot vazio | -1.5 | — |

### Cones de Luz

| Cone | Base | Por Sobreposição extra |
|------|------|------------------------|
| Cone T5 | +1.0 | +0.25 |
| Cone T5 da Loja da Herta | 0 | 0 |
| Cone T4 | 0 | 0 |
| Cone T3 | -0.5 | 0 |
| Sem cone (Nada) | -1.0 | 0 |

> Personagens em slots vazios não têm custo de cone aplicado.

---

## 🛠️ Tecnologias

- [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- CSS puro com layout responsivo (Flexbox + Grid)
- Deploy via [Vercel](https://vercel.com/)

---

## 🚀 Rodando localmente

```bash
# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse em `http://localhost:5173`

---

## 📁 Estrutura do Projeto

```
src/
├── App.jsx              # Componente principal com os dois times
├── App.css              # Estilos dos componentes
├── data/
│   └── personagem.js   # Lista de personagens, cones e regras de tier
└── utils/
    └── calculos.js     # Lógica de cálculo de custo
```

---

## 👤 Autor

Desenvolvido por **Paulo Ítalo** como ferramenta de apoio para a comunidade brasileira de Honkai: Star Rail.
