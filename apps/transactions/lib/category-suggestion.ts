import { TRANSACTION_CATEGORY } from '@/features/transactions/model/constants'

interface CategoryRule {
  keywords: string[]
  codigo: number
}

const RULES: CategoryRule[] = [
  {
    keywords: [
      'supermercado', 'mercado', 'ifood', 'rappi', 'uber eats', 'restaurante',
      'lanchonete', 'padaria', 'acougue', 'feira', 'hortifruti', 'delivery',
      'pizza', 'hamburguer', 'sushi', 'almoco', 'jantar', 'cafe', 'refeicao',
      'comida', 'bar ', 'boteco',
    ],
    codigo: TRANSACTION_CATEGORY.ALIMENTACAO.codigo,
  },
  {
    keywords: [
      'cinema', 'teatro', 'show', 'ingresso', 'jogo', 'game', 'parque', 'lazer', 'diversao', 'clube',
      'piscina', 'academia', 'passeio',
    ],
    codigo: TRANSACTION_CATEGORY.LAZER.codigo,
  },
  {
    keywords: [
      'spotify', 'apple music', 'youtube premium', 'assinatura', 'mensalidade plano',
      'anuidade', 'plano mensal', 'netflix', 'disney', 'hbo',
      'prime video',
    ],
    codigo: TRANSACTION_CATEGORY.ASSINATURA.codigo,
  },
  {
    keywords: [
      'aluguel', 'condominio', 'iptu', ' agua', 'energia', 'luz ', ' gas',
      'internet', 'reforma', 'movel', 'casa ', 'apartamento', 'manutencao',
    ],
    codigo: TRANSACTION_CATEGORY.CASA.codigo,
  },
  {
    keywords: [
      'curso', 'faculdade', 'escola', 'universidade', 'livro', 'material escolar',
      'matricula', 'aula', 'treinamento', 'certificado', 'graduacao', 'pos',
    ],
    codigo: TRANSACTION_CATEGORY.EDUCACAO.codigo,
  },
  {
    keywords: [
      'salario', 'holerite', 'pagamento mensal', 'renda fixa', 'contracheque',
    ],
    codigo: TRANSACTION_CATEGORY.RECEITAS_FIXAS.codigo,
  },
  {
    keywords: [
      'farmacia', 'drogaria', 'remedio', 'medico', 'consulta', 'hospital',
      'clinica', 'dentista', 'exame', 'plano de saude', 'vacina', 'saude',
    ],
    codigo: TRANSACTION_CATEGORY.SAUDE.codigo,
  },
  {
    keywords: [
      'uber', '99pop', 'cabify', 'taxi', 'onibus', 'metro ', 'gasolina',
      'combustivel', 'posto', 'estacionamento', 'pedagio', 'transporte',
      'passagem metro', 'bilhete',
    ],
    codigo: TRANSACTION_CATEGORY.TRANSPORTE.codigo,
  },
  {
    keywords: [
      'freelance', 'freela', 'projeto extra', 'bonus', 'comissao', 'reembolso',
      'venda ', 'decimo', '13 salario', 'lucro', 'dividendo',
    ],
    codigo: TRANSACTION_CATEGORY.RECEITAS_VARIAVEIS.codigo,
  },
  {
    keywords: [
      'viagem', 'passagem', 'hotel', 'hostel', 'airbnb', 'ferias', 'voo',
      'aeroporto', 'mala', 'resort', 'cruzeiro',
    ],
    codigo: TRANSACTION_CATEGORY.VIAGEM.codigo,
  },
]

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

export function suggestCategory(descricao: string): number | null {
  if (!descricao || descricao.trim().length < 3) return null

  const normalized = normalize(descricao)

  for (const rule of RULES) {
    for (const keyword of rule.keywords) {
      if (normalized.includes(normalize(keyword))) {
        return rule.codigo
      }
    }
  }

  return null
}
