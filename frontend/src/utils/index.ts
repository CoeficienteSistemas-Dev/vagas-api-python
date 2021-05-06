export interface Client {
  id: number;
  name: string;
  udoc: string;
}

export const clients: Client[] = [
  {
    id: 1,
    name: 'Renan Joaquim Isaac Pereira',
    udoc: '294.759.407-07',
  },
  {
    id: 2,
    name: 'Pietro Roberto Oliveira',
    udoc: '49.740.160/0001-66',
  },
  {
    id: 3,
    name: 'Noah Leonardo Tiago dos Santos',
    udoc: '49.740.160/0001-66',
  },
  {
    id: 4,
    name: 'Cauê Enzo Fábio Alves',
    udoc: '260.527.629-50',
  },
  {
    id: 5,
    name: 'Leandro Theo Benjamin da Rosa',
    udoc: '711.504.098-27',
  },
  {
    id: 6,
    name: 'Raquel Fabiana da Silva',
    udoc: '262.686.927-99',
  },
  {
    id: 7,
    name: 'Rosa Alana Sabrina Alves',
    udoc: '608.993.347-33',
  },
  {
    id: 8,
    name: 'Malu Gabriela da Luz',
    udoc: '995.928.700-98',
  },
  {
    id: 9,
    name: 'Renan Alexandre Sales',
    udoc: '944.895.313-54',
  },
  {
    id: 10,
    name: 'Henry Raimundo Bernardes',
    udoc: '908.828.718-03',
  },
  {
    id: 11,
    name: 'Nicole Ana da Silva',
    udoc: '49.740.160/0001-66',
  },
  {
    id: 12,
    name: 'Theo Murilo Lopes',
    udoc: '229.898.842-03',
  },
  {
    id: 13,
    name: 'Vitor Gael da Rosa',
    udoc: '033.210.509-19',
  },
  {
    id: 14,
    name: 'Mariane Ana Sophia Rodrigues',
    udoc: '905.946.285-80',
  },
  {
    id: 15,
    name: 'Julio Enzo Lima',
    udoc: '980.991.632-90',
  },
  {
    id: 16,
    name: 'Emilly Aparecida Vieira',
    udoc: '804.799.787-43',
  },
  {
    id: 17,
    name: 'Heloisa Alícia Natália das Neves',
    udoc: '49.740.160/0001-66',
  },
  {
    id: 18,
    name: 'Rafael Ryan Aparício',
    udoc: '681.266.562-20',
  },
  {
    id: 19,
    name: 'Mateus Manuel Calebe Pereira',
    udoc: '249.141.000-10',
  },
  {
    id: 20,
    name: 'Beatriz Regina Melissa dos Santos',
    udoc: '260.085.599-83',
  },
  {
    id: 21,
    name: 'Bruno Nicolas Arthur Barros',
    udoc: '030.586.268-51',
  },
  {
    id: 22,
    name: 'Débora Emily da Mota',
    udoc: '49.740.160/0001-66',
  },
  {
    id: 23,
    name: 'Raul Erick Diogo Gomes',
    udoc: '383.831.841-23',
  },
  {
    id: 24,
    name: 'Marcos Vinicius Vicente Ramos',
    udoc: '056.393.518-96',
  },
  {
    id: 25,
    name: 'Yasmin Alícia Luana Figueiredo',
    udoc: '439.042.703-20',
  },
  {
    id: 26,
    name: 'Fabiana Rayssa da Cunha',
    udoc: '402.899.230-34',
  },
  {
    id: 27,
    name: 'Rodrigo Isaac Porto',
    udoc: '70.213.731/0001-09',
  },
  {
    id: 28,
    name: 'Bryan Luan Mendes',
    udoc: '879.212.202-74',
  },
  {
    id: 29,
    name: 'Vitor Yuri Lorenzo Nogueira',
    udoc: '401.490.781-37',
  },
  {
    id: 30,
    name: 'Sophia Rafaela Pereira',
    udoc: '66.158.419/0001-84',
  },
];

export const listaHierárquica = [
  {
    id: 1,
    nome: '01',
    filhos: [
      { id: 2, nome: '01.001', filhos: [{ id: 3, nome: '01.001.0001' }] },
      { id: 4, nome: '01.002', filhos: [{ id: 5, nome: '01.002.0002' }] },
    ],
  },
  {
    id: 6,
    nome: '02',
    filhos: [
      { id: 7, nome: '02.001', filhos: [{ id: 8, nome: '02.001.0001' }] },
      { id: 9, nome: '02.002', filhos: [{ id: 10, nome: '02.002.0002' }] },
    ],
  },
];
