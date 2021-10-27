import { Produto } from "types/produto";
import { Funcionario } from "./funcionario";
import { Fornecedor } from './fornecedor';

export type CotacaoItem = {
    id:0;
    quantidade:number;
    produto:Produto;
    cotacaocompra:CotacaoCompra;
}

export type CotacaoCompra = {
    id:number;
    funcionario: Funcionario;
}

export type MostraItens = {
    quantidade:number;
    nomeproduto:string;
    marca:string;
}

export type FornecedorCotacaoCompra ={
    id:number;
    status:String;
    fornecedor:Fornecedor
    cotacacompra:CotacaoCompra;
}