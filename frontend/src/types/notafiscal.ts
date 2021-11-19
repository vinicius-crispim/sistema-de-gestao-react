import { Fornecedor } from './fornecedor';
import { Funcionario } from './funcionario';
import { Produto } from './produto';
export type NotaFiscal = {
    id:number;
    num_pedido?:number;
    notaFiscalItem:NotaFiscalItem[];
    num_nota:number;
    data:string;
    hora?:string;
    precoTotal:number;
    fornecedor:Fornecedor;
    funcionario:Funcionario;
}

export type NotaFiscalItem ={
    id:number;
    notaFiscal:NotaFiscal;
    produto:Produto;
    quantidade:number;
    preco:number;
    precoitem:number;
}