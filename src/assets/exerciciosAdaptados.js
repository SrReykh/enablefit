// utilizado para filtrar exercícios e selecionar ao usuário.
// poucos exercícios pra cada deficiência e pouco variável. (razão demonstrativa para banca do TCC)
export const exerciciosPorDeficiencia = {
  "Amputação de Braço": {
    Costas: [
      "Remada unilateral com agachamento na polia média",
      "Agachamento com remada alta unilateral",
      "Remada sentado",
    ],
    Biceps: ["Rosca bíceps unilateral, com polia"],
    Peito: ["Supino sentado, máquina", "Crossover com faixa elástica"],
    Triceps: ["Tríceps pulley com barra reta unilateral"],
    Pernas: ["Cadeira extensora", "Leg press"],
    Ombro: ["Desenvolvimento unilateral", "Elevação unilateral"],
  },
  "Amputação de Perna": {
    Costas: [
      "Remada baixa na polia baixa",
      "Remada unilateral",
      "Remada unilateral com agachamento na polia média",
    ],
    Biceps: ["Rosca direta na polia baixa"],
    Peito: ["Supino reto com barra", "Supino inclinado"],
    Triceps: ["Triceps pulley com barra reta"],
    Pernas: ["Cadeira extensora unilateral", "Extensão de pernas"],
    Ombro: ["Elevação unilateral", "Desenvolvimento com halteres"],
  },
  "Ausência de Mãos ou Dedos": {
    Costas: ["Remada sentado", "Remada baixa na polia baixa"],
    Biceps: ["Rosca direta na polia baixa"],
    Peito: ["Supino sentado, máquina", "Supino reto com barra"],
    Triceps: ["Triceps pulley com barra reta"],
    Pernas: ["Cadeira extensora", "Leg press"],
    Ombro: ["Desenvolvimento com halteres", "Elevação unilateral"],
  },
  "Ausência de Pés ou Dedos dos Pés": {
    Costas: [
      "Remada unilateral com agachamento na polia média",
      "Agachamento com remada alta unilateral",
    ],
    Biceps: ["Rosca bíceps unilateral, com polia"],
    Peito: ["Crossover com faixa elástica", "Supino inclinado"],
    Triceps: ["Tríceps pulley com barra reta unilateral"],
    Pernas: ["Cadeira extensora unilateral", "Extensão de pernas"],
    Ombro: ["Elevação unilateral", "Desenvolvimento unilateral"],
  },
  "Paralisia Cerebral": {
    Costas: ["Remada sentado", "Remada baixa na polia baixa"],
    Biceps: ["Rosca direta na polia baixa"],
    Peito: ["Supino sentado, máquina", "Crossover com faixa elástica"],
    Triceps: ["Triceps pulley com barra reta"],
    Pernas: ["Leg press", "Cadeira extensora"],
    Ombro: ["Desenvolvimento com halteres", "Elevação unilateral"],
  },
  "Lesão Medular": {
    Costas: ["Remada sentado", "Remada baixa na polia baixa"],
    Biceps: ["Rosca direta na polia baixa"],
    Peito: ["Supino sentado, máquina", "Crossover com faixa elástica"],
    Triceps: ["Triceps pulley com barra reta"],
    Pernas: ["Cadeira extensora unilateral", "Extensão de pernas"],
    Ombro: ["Desenvolvimento com halteres", "Elevação unilateral"],
  },
  "Distrofia Muscular": {
    Costas: ["Remada sentado", "Remada baixa na polia baixa"],
    Biceps: ["Rosca direta na polia baixa"],
    Peito: ["Supino reto com barra", "Supino inclinado"],
    Triceps: ["Triceps pulley com barra reta"],
    Pernas: ["Cadeira extensora", "Leg press"],
    Ombro: ["Elevação unilateral", "Desenvolvimento com halteres"],
  },
  "Esclerose Múltipla": {
    Costas: [
      "Remada unilateral com agachamento na polia média",
      "Remada sentado",
    ],
    Biceps: ["Rosca direta na polia baixa"],
    Peito: ["Supino sentado, máquina", "Crossover com faixa elástica"],
    Triceps: ["Triceps pulley com barra reta"],
    Pernas: ["Leg press", "Cadeira extensora"],
    Ombro: ["Desenvolvimento com halteres", "Elevação unilateral"],
  },
  "Doenças Reumáticas": {
    Costas: [
      "Remada unilateral com agachamento na polia média",
      "Remada baixa na polia baixa",
    ],
    Biceps: ["Rosca bíceps unilateral, com polia"],
    Peito: ["Supino reto com barra", "Crossover com faixa elástica"],
    Triceps: ["Triceps pulley com barra reta"],
    Pernas: ["Cadeira extensora unilateral", "Extensão de pernas"],
    Ombro: ["Desenvolvimento unilateral", "Elevação unilateral"],
  },
};

// Antiga lista útil para depois

// utilizado para filtrar exercícios e selecionar ao usuário.
// export const exerciciosPorDeficiencia = {
//   "Amputação de Braço": {
//     Costas: ["Remada unilateral com agachamento na polia média", "Agachamento com remada alta unilateral"],
//     Biceps: ["Rosca bíceps unilateral, com polia"],
//     Peito: ["Supino sentado, máquina", "Crossover com faixa elástica"],
//     Triceps: ["Tríceps pulley com barra reta unilateral"],
//     Pernas: ["Cadeira extensora", "Leg press"],
//     Ombro: ["Desenvolvimento unilateral", "Elevação unilateral"]
//   },
//   "Amputação de Perna": {
//     Costas: ["Remada baixa na polia baixa", "Remada unilateral"],
//     Biceps: ["Rosca direta na polia baixa"],
//     Peito: ["Supino reto com barra", "Supino inclinado"],
//     Triceps: ["Triceps pulley com barra reta"],
//     Pernas: ["Cadeira extensora unilateral", "Extensão de pernas"],
//     Ombro: ["Elevação unilateral", "Desenvolvimento com halteres"]
//   },
//   "Ausência de Mãos ou Dedos": {
//     Costas: ["Remada unilateral com agachamento na polia média", "Remada sentado"],
//     Biceps: ["Rosca scott com faixa elástica"],
//     Peito: ["Supino na máquina com apoio"],
//     Triceps: ["Triceps francês com suporte"],
//     Pernas: ["Leg press adaptado", "Extensão de pernas"],
//     Ombro: ["Desenvolvimento com apoio", "Elevação lateral assistida"]
//   },
//   "Ausência de Pés ou Dedos dos Pés": {
//     Costas: ["Remada curvada", "Puxada na barra assistida"],
//     Biceps: ["Rosca alternada"],
//     Peito: ["Supino reto com halteres"],
//     Triceps: ["Triceps francês"],
//     Pernas: ["Leg press adaptado", "Extensão de pernas"],
//     Ombro: ["Desenvolvimento com halteres", "Elevação lateral"]
//   },
//   "Paralisia Cerebral": {
//     Costas: ["Remada unilateral", "Puxada assistida"],
//     Biceps: ["Rosca direta com apoio"],
//     Peito: ["Peck-deck", "Flexão adaptada"],
//     Triceps: ["Triceps pulley com apoio"],
//     Pernas: ["Agachamento com bola", "Extensão de pernas"],
//     Ombro: ["Desenvolvimento com faixa elástica", "Elevação frontal"]
//   },
//   "Lesão Medular": {
//     Costas: ["Remada curvada", "Puxada com faixa elástica"],
//     Biceps: ["Rosca alternada"],
//     Peito: ["Supino reto com halteres"],
//     Triceps: ["Triceps pulley"],
//     Pernas: ["Leg press adaptado"],
//     Ombro: ["Desenvolvimento com faixa elástica"]
//   },
//   "Distrofia Muscular": {
//     Costas: ["Remada com faixa elástica", "Remada baixa"],
//     Biceps: ["Rosca direta com halteres"],
//     Peito: ["Peck-deck"],
//     Triceps: ["Triceps francês"],
//     Pernas: ["Extensão de pernas assistida"],
//     Ombro: ["Elevação lateral", "Desenvolvimento com faixa elástica"]
//   },
//   "Esclerose Múltipla": {
//     Costas: ["Remada com faixa elástica", "Puxada baixa"],
//     Biceps: ["Rosca direta"],
//     Peito: ["Flexão de braços adaptada"],
//     Triceps: ["Triceps pulley com faixa elástica"],
//     Pernas: ["Agachamento com bola", "Extensão de pernas"],
//     Ombro: ["Desenvolvimento com faixa elástica"]
//   },
//   "Doenças Reumáticas": {
//     Costas: ["Remada com faixa elástica", "Puxada assistida"],
//     Biceps: ["Rosca direta com faixa"],
//     Peito: ["Peck-deck assistido"],
//     Triceps: ["Triceps pulley com faixa elástica"],
//     Pernas: ["Extensão de pernas assistida"],
//     Ombro: ["Desenvolvimento com faixa elástica"]
//   }
// };
