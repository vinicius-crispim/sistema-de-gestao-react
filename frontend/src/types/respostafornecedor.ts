import { CotacaoItem } from "./cotacao";
import { Fornecedor } from "./fornecedor";

export type RespostaFornecedor = {
    cotacaoitem:CotacaoItem;
    fornecedor:Fornecedor;
    preco:number;
}