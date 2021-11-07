
import { Fornecedor } from './fornecedor';
import { Funcionario } from './funcionario';
import { Produto } from './produto';

export type CotacaoItem = {
    id: 0;
    quantidade: number;
    produto: Produto;
    cotacaocompra: CotacaoCompra;
}

export type CotacaoCompra = {
    id: number;
    funcionario: Funcionario;
    data?: Date;
}

export type MostraItens = {
    quantidade: number;
    nomeproduto: string;
    marca: string;
}

export type FornecedorCotacaoCompra = {
    id: number;
    status: String;
    fornecedor: Fornecedor
    cotacaocompra: CotacaoCompra;
}

export type FornecedorCotacaoCompraItem = {
    id: number;
    preco: number;
    precoitem: number;
    fornecedor: Fornecedor;
    cotacaocompraitem: CotacaoItem;
}

export type FornecedorCotacaoCompraSelect = {
    id: number;
    data: String;
    fornecedor:Fornecedor;
    fornecedorcotacaocompraitem: FornecedorCotacaoCompraItem[];
}