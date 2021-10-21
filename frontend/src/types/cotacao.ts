import { Produto } from "types/produto";
import { Funcionario } from "./funcionario";

export type CotacaoItem = {
    quantidade:number;
    produto:Produto;
    cotacaocompra:CotacaoCompra;
}

export type CotacaoCompra = {
    id:number;
    funcionario: Funcionario;
}