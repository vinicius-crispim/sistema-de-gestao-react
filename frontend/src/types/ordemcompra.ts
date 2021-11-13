import { Fornecedor } from './fornecedor';
import { Funcionario } from './funcionario';
import { Produto } from './produto';

export type OrdemCompra = {
    id?:number;
    preco:number;
    data?:string;
    fornecedor:Fornecedor;
    funcionario:Funcionario;
    ordemcompraitem:OrdemCompraItem[];
}

export type OrdemCompraItem = {
    quantidade:number;
    precoitem:number;
    preco:number;
    ordemcompra?:OrdemCompra;
    produto:Produto;
}