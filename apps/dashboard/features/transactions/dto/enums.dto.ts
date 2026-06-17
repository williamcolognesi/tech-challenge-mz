export interface IEnumOption {
  codigo: number;
  descricao: string;
}

export interface IEnums {
  tipos: IEnumOption[];
  direcoes: IEnumOption[];
  categorias: IEnumOption[];
}
