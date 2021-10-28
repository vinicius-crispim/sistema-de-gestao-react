export type Produto = {
    id: number;
    nome: string,
    descrição: string,
    quantidademin: number,
    estoque: number,
    categoria: Categoria,

}

export type Categoria = {
    id: number,
    nome: string,
}

export type ProdutoPage ={
    content?:Produto[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    numberOfElements?: number;
    size?: number;
    number: number;
    empty?: boolean;
    status?:String;
}