// responsável pela página de exercícios
// export const DATA = [
//   {
//     title: "Costas",
//     data: [
//       {
//         nome: "Remada serrote",
//         deficiencias: ["Amputação de Braço"],
//         mainText: "A remada serrote trabalha principalmente os músculos das costas, como o latíssimo do dorso. Utilize um banco para suporte e execute o movimento com um halter.",
//         videoRef: "remada_serrote.mp4",
//       },
//       {
//         nome: "Puxada com faixa elástica",
//         deficiencias: ["Amputação de Braço", "Dificuldades na Coordenação Motora", "Doenças Reumáticas", "Lesão Medular"],
//         mainText: "A puxada com faixa elástica é uma alternativa prática para fortalecer as costas. Prenda a faixa em um suporte firme e puxe com ambas as mãos.",
//         videoRef: "puxada_com_faixa_elastica.mp4",
//       },
//       {
//         nome: "Remada curvada",
//         deficiencias: ["Amputação de Perna", "Ausência de Pés ou Dedos dos Pés", "Lesão Medular", "Esclerose Múltipla"],
//         mainText: "A remada curvada foca nos músculos das costas e no equilíbrio. Mantenha os joelhos ligeiramente flexionados e a coluna reta durante o movimento.",
//         videoRef: "remada_curvada.mp4",
//       },
//       {
//         nome: "Puxada alta",
//         deficiencias: ["Amputação de Perna", "Síndrome de Down"],
//         mainText: "A puxada alta é excelente para fortalecer o latíssimo do dorso. Use uma barra ou faixa elástica para executar o exercício.",
//         videoRef: "puxada_alta.mp4",
//       },
//       {
//         nome: "Remada com faixa elástica",
//         deficiencias: ["Amputação de Braço", "Ausência de Mãos ou Dedos", "Distrofia Muscular", "Esclerose Múltipla", "Doenças Reumáticas"],
//         mainText: "A remada com faixa elástica é adaptável e ajuda a fortalecer os músculos das costas sem a necessidade de pesos.",
//         videoRef: "remada_com_faixa_elastica.mp4",
//       },
//       {
//         nome: "Puxada assistida",
//         deficiencias: ["Paralisia Cerebral", "Doenças Reumáticas"],
//         mainText: "A puxada assistida utiliza equipamentos de suporte para facilitar o movimento de fortalecimento das costas.",
//         videoRef: "puxada_assistida.mp4",
//       },
//       {
//         nome: "Remada unilateral",
//         deficiencias: ["Paralisia Cerebral"],
//         mainText: "A remada unilateral permite isolar cada lado das costas. Use um banco ou uma faixa elástica para suporte.",
//         videoRef: "remada_unilateral.mp4",
//       },
//       {
//         nome: "Puxada na barra assistida",
//         deficiencias: ["Ausência de Pés ou Dedos dos Pés"],
//         mainText: "A puxada na barra assistida fortalece as costas e os braços, com suporte extra para facilitar o movimento.",
//         videoRef: "puxada_na_barra_assistida.mp4",
//       },
//       {
//         nome: "Remada baixa",
//         deficiencias: ["Distrofia Muscular", "Esclerose Múltipla"],
//         mainText: "A remada baixa é um excelente exercício para fortalecer os músculos das costas e melhorar a postura.",
//         videoRef: "remada_baixa.mp4",
//       },
//       {
//         nome: "Puxada baixa",
//         deficiencias: ["Esclerose Múltipla", "Doenças Reumáticas"],
//         mainText: "A puxada baixa é realizada em um equipamento ou com faixas elásticas, fortalecendo as costas e os ombros.",
//         videoRef: "puxada_baixa.mp4",
//       },
//     ],
//   },
//   {
//       title: "Peito",
//       data: [
//         {
//           nome: "Flexão de braços adaptada",
//           deficiencias: ["Amputação de Braço", "Esclerose Múltipla"],
//           mainText: "Trabalha os músculos peitorais, tríceps e deltoides. Apoie os joelhos ou use uma superfície elevada para adaptar a carga. Desça flexionando os cotovelos e empurre para retornar à posição inicial.",
//           videoRef: "flexao_de_bracos_adaptada.mp4",
//         },
//         {
//           nome: "Crossover com faixa elástica",
//           deficiencias: ["Amputação de Braço"],
//           mainText: "Este exercício ativa os músculos do peitoral e melhora a mobilidade. Prenda a faixa elástica em um suporte, segure cada extremidade, posicione-se de forma central e cruze os braços à frente, controlando a resistência.",
//           videoRef: "crossover_com_faixa_elastica.mp4",
//         },
//         {
//           nome: "Supino reto com halteres",
//           deficiencias: ["Amputação de Perna", "Ausência de Pés ou Dedos dos Pés", "Lesão Medular"],
//           mainText: "Trabalha o peitoral maior, deltoides e tríceps. Deite-se em um banco, segure os halteres com os braços estendidos e abaixe lentamente até formar um ângulo de 90° nos cotovelos. Retorne empurrando os halteres para cima.",
//           videoRef: "supino_reto_com_halteres.mp4",
//         },
//         {
//           nome: "Peck-deck",
//           deficiencias: ["Paralisia Cerebral", "Síndrome de Down"],
//           mainText: "Focado no peitoral maior e menor, o exercício é realizado em uma máquina específica. Sente-se com as costas apoiadas, posicione os braços nas alças e feche-os até que se aproximem à frente do corpo.",
//           videoRef: "peck_deck.mp4",
//         },
//       ],
//     },
//     {
//       title: "Pernas",
//       data: [
//         {
//           nome: "Agachamento adaptado",
//           deficiencias: ["Amputação de Braço", "Amputação de Perna", "Paralisia Cerebral", "Doenças Reumáticas"],
//           mainText: "Trabalha glúteos, quadríceps e posteriores de coxa. Utilize apoio como uma cadeira ou barra para equilíbrio. Flexione os joelhos, descendo o quadril como se fosse sentar, e retorne à posição inicial.",
//           videoRef: "agachamento_adaptado.mp4",
//         },
//         {
//           nome: "Leg press adaptado",
//           deficiencias: ["Amputação de Perna", "Ausência de Mãos ou Dedos", "Lesão Medular", "Síndrome de Down"],
//           mainText: "Exercita quadríceps, glúteos e panturrilhas. Sente-se na máquina, ajuste o suporte para os pés e empurre a plataforma para frente, controlando o retorno para não travar os joelhos.",
//           videoRef: "leg_press_adaptado.mp4",
//         },
//         {
//           nome: "Extensão de pernas",
//           deficiencias: ["Amputação de Perna", "Ausência de Pés ou Dedos dos Pés", "Lesão Medular", "Paralisia Cerebral", "Doenças Reumáticas"],
//           mainText: "Fortalece os quadríceps. Na máquina de extensão, ajuste o rolo à frente dos tornozelos, estenda os joelhos para elevar o peso e retorne lentamente à posição inicial.",
//           videoRef: "extensao_de_pernas.mp4",
//         },
//         {
//           nome: "Agachamento com bola",
//           deficiencias: ["Paralisia Cerebral", "Esclerose Múltipla"],
//           mainText: "Melhora o equilíbrio e fortalece as pernas. Coloque uma bola atrás das costas contra uma parede. Flexione os joelhos e deslize para baixo, mantendo os pés alinhados com os ombros. Volte devagar à posição inicial.",
//           videoRef: "agachamento_com_bola.mp4",
//         },
//       ],
//     },
//     {
//       title: "Ombros",
//       data: [
//         {
//           nome: "Desenvolvimento com halteres",
//           deficiencias: ["Amputação de Braço", "Amputação de Perna", "Ausência de Pés ou Dedos dos Pés", "Síndrome de Down"],
//           mainText: "Focado nos deltoides, este exercício é feito sentado ou em pé. Segure os halteres ao lado da cabeça e empurre para cima até esticar os braços. Retorne devagar à posição inicial.",
//           videoRef: "desenvolvimento_com_halteres.mp4",
//         },
//         {
//           nome: "Elevação lateral",
//           deficiencias: ["Amputação de Braço", "Distrofia Muscular"],
//           mainText: "Trabalha os deltoides laterais. Segure halteres ou faixas elásticas ao lado do corpo e eleve os braços lateralmente até a altura dos ombros. Controle o movimento ao retornar.",
//           videoRef: "elevacao_lateral.mp4",
//         },
//         {
//           nome: "Elevação frontal",
//           deficiencias: ["Amputação de Perna", "Paralisia Cerebral"],
//           mainText: "Exercita os deltoides anteriores. Segure halteres com as palmas voltadas para baixo, eleve os braços à frente do corpo até a altura dos ombros e desça lentamente.",
//           videoRef: "elevacao_frontal.mp4",
//         },
//         {
//           nome: "Desenvolvimento com faixa elástica",
//           deficiencias: ["Paralisia Cerebral", "Esclerose Múltipla", "Lesão Medular", "Doenças Reumáticas"],
//           mainText: "Exercício funcional para os ombros. Prenda a faixa sob os pés ou em uma cadeira. Segure as extremidades na altura dos ombros e estenda os braços para cima. Retorne devagar à posição inicial.",
//           videoRef: "desenvolvimento_com_faixa_elastica.mp4",
//         },
//       ],
//     },
// ]

// export const videoMap = {
//   // "remada_serrote.mp4": require("../../assets/videos/remada_serrote.mp4"),
// };

// menos exercícios para facilitar a demonstração para BANCA de TCC. Objeto escalável.

export const DATA = [
  {
    title: "Costas",
    data: [
      {
        nome: "Remada unilateral com agachamento na polia média",
        deficiencias: [
          "Amputação de braço",
          "Amputação de Perna",
          "Ausência de Pés ou Dedos dos Pés",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Certifique-se de que a polia está na altura do cotovelo com um puxador simples. Fique de frente para o aparelho, com as pernas afastadas na largura dos quadris e segure o puxador com uma mão. Controle a tensão do peso com o braço na horizontal em sua frente.Faça um agachamento para iniciar o movimento. Puxe o peso em sua direção, trazendo o cotovelo junto ao corpo a 90 graus enquanto estende os joelhos e volta do agachamento. Volte o peso com o braço estendido, e faça novamente agachamento. Retorne com o peso lentamente controlando o movimento.",
        videoRef: "remada_unilateral_com_agachamento_na_polia_media.mp4",
      },
      {
        nome: "Agachamento com remada alta unilateral",
        deficiencias: [
          "Amputação de braço",
          "Amputação de Perna",
          "Ausência de Pés ou Dedos dos Pés",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Fique em pé com as pernas afastadas na largura dos ombros segurando um Kettlebell na frente da coxa, com o braço esticado. Dobre os joelhos e faça um agachamento. Depois, use a força das pernas e do braço para levantar o Kettlebell até à altura do peito, levando a mão na frente dos olhos. Puxe o cotovelo para cima, até o final da remada, estenda os joelhos completamente e eleve-se nas pontas dos pés. Mantenha o seu olhar em frente e volte à posição inicial. Baixe o peso de forma controlada com o braço esticado, voltando até o chão. Repita.",
        videoRef: "agachamento_com_remada_alta_unilateral.mp4",
      },
      {
        nome: "Remada sentado",
        deficiencias: [
          "Amputação de Perna",
          "Ausência de Mãos ou Dedos",
          "Lesão Medular",
          "Paralisia Cerebral",
          "Distrofia Muscular",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Ajuste a altura do assento para que as empunhaduras fiquem niveladas com os ombros. Ajuste o apoio torácico para permitir que você alcance as empunhaduras confortavelmente. Escolha uma pegada adequada. Puxe até os cotovelos passarem pelos lados do corpo. Volte para a posição inicial.",
        videoRef: "remada_sentado.mp4",
      },
      {
        nome: "Remada baixa na polia baixa",
        deficiencias: [
          "Amputação de Perna",
          "Ausência de Mãos ou Dedos",
          "Lesão Medular",
          "Paralisia Cerebral",
          "Distrofia Muscular",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Coloque a polia na posição mais baixa e segure os puxadores com as duas mãos. Sente-se e estique as pernas, deixando os joelhos levemente flexionados. Controle a tensão do peso. Mantenha uma postura ereta e traga os pegadores em direção ao abdômen, puxando os cotovelos para trás, mantendo-os juntos ao corpo. Termine com os braços paralelos ao corpo e então volte à posição inicial.",
        videoRef: "remada_baixa_na_polia_baixa.mp4",
      },
      {
        nome: "Remada unilateral",
        deficiencias: [
          "Amputação de Perna",
          "Ausência de Mãos ou Dedos",
          "Lesão Medular",
          "Paralisia Cerebral",
          "Distrofia Muscular",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Incline-se com o tronco para a frente e segure um halter com uma mão. Mantendo as costas alinhadas, encaixe as escápulas para trás e para baixo em direção às costas. Puxe o halter para cima passando ao lado da caixa torácica. Baixe o peso novamente para a posição inicial. Complete a sequência em um lado antes de repetir com o outro braço. Se necessário, use um objeto na altura da cintura para dar apoio para a outra mão.",
        videoRef: "remada_unilateral.mp4",
      },
    ],
  },
  {
    title: "Bíceps",
    data: [
      {
        nome: "Rosca bíceps unilateral, com polia",
        deficiencias: [
          "Amputação de braço",
          "Amputação de Perna",
          "Ausência de Pés ou Dedos dos Pés",
          "Lesão Medular",
          "Paralisia Cerebral",
          "Distrofia Muscular",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Certifique-se de que a polia está no seu ponto mais baixo com um puxador simples. Fique de frente para o aparelho, incline-se e pegue o puxador com uma mão. Mantenha as costas retas e levante-se, puxando o peso com o braço reto. Mantenha uma postura adequada, deixando o braço junto ao corpo. Dobre o cotovelo, puxando o peso para cima. Pause por um momento antes retornar à posição inicial de forma lenta e controlada.",
        videoRef: "rosca_biceps_unilateral_com_polia.mp4",
      },
      {
        nome: "Rosca direta na polia baixa",
        deficiencias: [
          "Amputação de Perna",
          "Ausência de Mãos ou Dedos",
          "Lesão Medular",
          "Paralisia Cerebral",
          "Distrofia Muscular",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Certifique-se de que a polia está no seu ponto mais baixo. Fique de frente para o aparelho, incline-se e pegue a barra com as duas mãos. Levante-se, puxando a barra com os braços estendidos e as palmas das mãos viradas para cima. Mantendo uma boa postura e os cotovelos juntos do corpo, puxe a barra para cima, dobrando os cotovelos. Pause por um momento antes retornar à posição inicial de forma lenta e controlada.",
        videoRef: "rosca_direta_na_polia_baixa.mp4",
      },
    ],
  },
  {
    title: "Peito",
    data: [
      {
        nome: "Supino sentado, máquina",
        deficiencias: [
          "Amputação de Perna",
          "Ausência de Mãos ou Dedos",
          "Lesão Medular",
          "Paralisia Cerebral",
          "Distrofia Muscular",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Ajuste a altura do assento para que a empunhadura fique na altura do meio do peito. Escolha uma pegada que permita que suas mãos terminem o movimento na frente dos ombros. Empurre para a frente até que os braços fiquem completamente estendidos. Volte lentamente para a posição inicial.",
        videoRef: "supino_sentado_maquina.mp4",
      },
      {
        nome: "Crossover com faixa elástica",
        deficiencias: [
          "Amputação de braço",
          "Amputação de Perna",
          "Ausência de Pés ou Dedos dos Pés",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Certifique-se de que a polia está no ponto mais alto. Segure um pegador em cada mão e posicione-se no meio do aparelho. Mantenha os cotovelos ligeiramente flexionados e as palmas das mãos viradas para a frente. Caminhe para a frente e controle a tensão do peso, deixando uma perna à frente da outra. Com a postura ereta (ou levemente inclinada para a frente), leve as mãos para dentro até ficarem juntas em frente à região inferior do abdômen. Mantenha os cotovelos ligeiramente flexionados enquanto contrai os músculos do peito. Volte lentamente para a posição inicial e continue pelo número de repetições indicado.",
        videoRef: "crossover_com_faixa_elastica.mp4",
      },
      {
        nome: "Supino reto com barra",
        deficiencias: [
          "Amputação de Perna",
          "Ausência de Mãos ou Dedos",
          "Lesão Medular",
          "Paralisia Cerebral",
          "Distrofia Muscular",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Usando cintas para as pernas se necessário, deite-se de barriga para cima no banco, mantendo contato com a lombar e a parte inferior do corpo. Arqueie a região torácica e puxe as escápulas para trás e para baixo em direção ao banco. Estenda os cotovelos e agarre a barra com uma pegada aberta. Retire a barra do rack do supino. Mantendo o peito elevado, abaixe a barra de forma lenta e controlada. Mantenha os cotovelos alinhados com os punhos até a barra tocar o seu tórax. Faça uma breve pausa nesta fase do movimento. Estenda os cotovelos elevando a barra e mantendo-a alinhada com os ombros. Volte a barra para o rack.",
        videoRef: "supino_reto_com_barra.mp4",
      },
      {
        nome: "Supino inclinado",
        deficiencias: [
          "Amputação de Perna",
          "Ausência de Mãos ou Dedos",
          "Lesão Medular",
          "Paralisia Cerebral",
          "Distrofia Muscular",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Deite-se de barriga para cima em um banco inclinado, segurando os halteres firmemente com as mãos perto dos ombros. Mantenha os pés no chão, os quadris e os ombros sobre o banco e arqueie a coluna torácica. Empurre os halteres para cima na linha dos ombros até esticar os braços. Baixe os halteres, mantendo os cotovelos perto do corpo, até que os braços fiquem paralelos ao chão.",
        videoRef: "supino_inclinado.mp4",
      },
    ],
  },
  {
    title: "Tríceps",
    data: [
      {
        nome: "Tríceps pulley com barra reta unilateral",
        deficiencias: [
          "Amputação de braço",
          "Amputação de Perna",
          "Ausência de Pés ou Dedos dos Pés",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Certifique-se de que a polia está no seu ponto mais alto. Fique de frente para o aparelho, com as pernas afastadas na largura dos ombros. Segure a barra reta com as mãos na linha dos ombros e mantenha os cotovelos flexionados juntos ao corpo. Controle a tensão do peso e posicione os antebraços paralelos ao chão. Mantendo uma postura ereta, empurre a barra para baixo, estendendo os cotovelos. Pause por um instante antes de voltar lentamente, controlando o peso até a posição inicial.",
        videoRef: "triceps_pulley_com_barra_reta_unilateral.mp4",
      },
      {
        nome: "Triceps pulley com barra reta",
        deficiencias: [
          "Amputação de Perna",
          "Ausência de Mãos ou Dedos",
          "Lesão Medular",
          "Paralisia Cerebral",
          "Distrofia Muscular",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Certifique-se de que a polia está no seu ponto mais alto. Fique de frente para o aparelho, com as pernas afastadas na largura dos ombros. Segure a barra reta com as mãos na linha dos ombros e mantenha os cotovelos flexionados juntos ao corpo. Controle a tensão do peso e posicione os antebraços paralelos ao chão. Mantendo uma postura ereta, empurre a barra para baixo, estendendo os cotovelos. Pause por um instante antes de voltar lentamente, controlando o peso até a posição inicial.",
        videoRef: "triceps_pulley_com_barra_reta.mp4",
      },
    ],
  },
  {
    title: "Pernas",
    data: [
      {
        nome: "Cadeira extensora",
        deficiencias: [
          "Amputação de Perna",
          "Lesão Medular",
          "Distrofia Muscular",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Configure o comprimento do assento, a altura e o apoio das pernas. A posição inicial é com as pernas estendidas, com o suporte fixo da máquina sobre as coxas e a almofada debaixo das panturrilhas. Flexione as pernas suavemente em direção aos glúteos. Faça uma breve pausa na parte de cima do movimento e depois solte o peso de forma lenta e controlada.",
        videoRef: "cadeira_extensora.mp4",
      },
      {
        nome: "Leg press",
        deficiencias: [
          "Amputação de Perna",
          "Lesão Medular",
          "Distrofia Muscular",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Ajuste o assento a uma posição inicial confortável para seus joelhos e quadris. Posicione os pés confortavelmente sobre os apoios, com os dedos dos pés ligeiramente para fora. Empurre até as pernas ficarem completamente esticadas. Volte para a posição inicial.",
        videoRef: "leg_press.mp4",
      },
      {
        nome: "Cadeira extensora unilateral",
        deficiencias: [
          "Amputação de Perna",
          "Lesão Medular",
          "Distrofia Muscular",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Configure o comprimento do assento, a altura e o apoio das pernas. A posição inicial é com as pernas estendidas, com o suporte fixo da máquina sobre as coxas e a almofada debaixo das panturrilhas. Flexione as pernas suavemente em direção aos glúteos. Faça uma breve pausa na parte de cima do movimento e depois solte o peso de forma lenta e controlada.",
        videoRef: "cadeira_extensora_unilateral.mp4",
      },
      {
        nome: "Extensão de pernas",
        deficiencias: [
          "Amputação de Perna",
          "Lesão Medular",
          "Distrofia Muscular",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Sente-se alinhado em uma cadeira, mantendo os ombros para trás e para baixo. Leve a perna afetada à sua frente, tentando esticar totalmente o joelho. Controle o movimento de volta para a posição inicial e repita. Você pode adicionar pesos a este exercício à medida que sua amplitude de movimento e força melhorarem.",
        videoRef: "extensao_de_pernas.mp4",
      },
    ],
  },
  {
    title: "Ombro",
    data: [
      {
        nome: "Desenvolvimento unilateral",
        deficiencias: [
          "Amputação de braço",
          "Amputação de Perna",
          "Ausência de Pés ou Dedos dos Pés",
          "Lesão Medular",
          "Paralisia Cerebral",
          "Distrofia Muscular",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Sente-se em um banco segurando um halter acima do ombro. Contraia os glúteos e o abdômen. Empurre o peso para cima, mantendo o braço totalmente travado. Retorne o halter para o ombro.",
        videoRef: "desenvolvimento_unilateral.mp4",
      },
      {
        nome: "Elevação unilateral",
        deficiencias: [
          "Amputação de braço",
          "Amputação de Perna",
          "Ausência de Pés ou Dedos dos Pés",
          "Lesão Medular",
          "Paralisia Cerebral",
          "Distrofia Muscular",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "Coloque a polia na posição mais baixa com um puxador simples. Fique de costas para o aparelho com as pernas afastadas na largura dos quadris e segure o cabo com uma mão. Mantenha uma postura reta e levante o braço estendido para a frente até ficar paralelo ao chão e em linha com o ombro. Baixe lentamente o peso de volta à posição inicial.",
        videoRef: "elevacao_unilateral.mp4",
      },
      {
        nome: "Desenvolvimento com halteres",
        deficiencias: [
          "Amputação de Perna",
          "Lesão Medular",
          "Distrofia Muscular",
          "Esclerose Múltipla",
          "Doenças Reumáticas",
        ],
        mainText:
          "O exercício de desenvolvimento de ombros fortalece os músculos do ombro e das costas, essenciais para várias atividades diárias. Sente-se em uma cadeira com a coluna alinhada, peito aberto e ombros para trás. Baixe os braços ao seu lado, segurando um peso em cada mão. Dobre os cotovelos, elevando os pesos aos ombros e depois empurre-os para cima da cabeça. Se necessário, você pode fazer isso com um braço de cada vez. Cuide para não arquear a coluna. Baixe os pesos de volta ao lado dos ombros. Depois, repita o exercício como indicado.",
        videoRef: "desenvolvimento_com_halteres.mp4",
      },
    ],
  },
];

export const videoMap = {
  "remada_unilateral_com_agachamento_na_polia_media.mp4": require("../../assets/videos/remada_unilateral_com_agachamento_na_polia_media.mp4"),
  "agachamento_com_remada_alta_unilateral.mp4": require("../../assets/videos/agachamento_com_remada_alta_unilateral.mp4"),
  "remada_sentado.mp4": require("../../assets/videos/remada_sentado.mp4"),
  "remada_baixa_na_polia_baixa.mp4": require("../../assets/videos/remada_baixa_na_polia_baixa.mp4"),
  "remada_unilateral.mp4": require("../../assets/videos/remada_unilateral.mp4"),
  "rosca_biceps_unilateral_com_polia.mp4": require("../../assets/videos/rosca_biceps_unilateral_com_polia.mp4"),
  "rosca_direta_na_polia_baixa.mp4": require("../../assets/videos/rosca_direta_na_polia_baixa.mp4"),
  "supino_sentado_maquina.mp4": require("../../assets/videos/supino_sentado_maquina.mp4"),
  "crossover_com_faixa_elastica.mp4": require("../../assets/videos/crossover_com_faixa_elastica.mp4"),
  "supino_reto_com_barra.mp4": require("../../assets/videos/supino_reto_com_barra.mp4"),
  "supino_inclinado.mp4": require("../../assets/videos/supino_inclinado.mp4"),
  "triceps_pulley_com_barra_reta_unilateral.mp4": require("../../assets/videos/triceps_pulley_com_barra_reta_unilateral.mp4"),
  "triceps_pulley_com_barra_reta.mp4": require("../../assets/videos/triceps_pulley_com_barra_reta.mp4"),
  "cadeira_extensora.mp4": require("../../assets/videos/cadeira_extensora.mp4"),
  "leg_press.mp4": require("../../assets/videos/leg_press.mp4"),
  "cadeira_extensora_unilateral.mp4": require("../../assets/videos/cadeira_extensora_unilateral.mp4"),
  "extensao_de_pernas.mp4": require("../../assets/videos/extensao_de_pernas.mp4"),
  "desenvolvimento_unilateral.mp4": require("../../assets/videos/desenvolvimento_unilateral.mp4"),
  "elevacao_unilateral.mp4": require("../../assets/videos/elevacao_unilateral.mp4"),
  "desenvolvimento_com_halteres.mp4": require("../../assets/videos/desenvolvimento_com_halteres.mp4"),
};
