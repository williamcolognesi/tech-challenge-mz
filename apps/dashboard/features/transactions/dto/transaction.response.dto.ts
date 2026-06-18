interface EnumDTO {
  codigo: number;
  descricao: string;
}

export interface ITransactionResponseDTO {
  id: number;
  valor: number;
  tipo: EnumDTO;
  direcao: EnumDTO;
  categoria?: EnumDTO;
  descricao?: string;
  dataTransacao: string;
  dataCadastro: string;
  dataAtualizacao?: string;
}
