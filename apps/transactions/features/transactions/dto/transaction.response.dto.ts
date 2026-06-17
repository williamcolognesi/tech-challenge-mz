interface EnumDTO {
  codigo: number;
  descricao: string;
}

export interface IComprovanteInfo {
  id: number;
  nome: string;
  contentType: string;
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
  comprovante?: IComprovanteInfo;
}

export interface IComprovanteResponseDTO {
  id: number;
  nome: string;
  contentType: string;
}
