import axios from 'axios';
import { useState } from 'react';
import { CotacaoItem } from 'types/cotacao';
import { Fornecedor } from 'types/fornecedor';
import { BASE_URL } from 'utils/request';


type Resposta = {
    preco: number;
    fornecedor: Fornecedor;
    cotacaocompraitem: CotacaoItem;
}


let fornecedor = JSON.parse(localStorage.getItem('fornecedor') || '{}');
let cotacao = JSON.parse(localStorage.getItem('respostafornecedor') || '{}');

const FornecedorResposta = () => {

    const [resposta, setResposta] = useState<Resposta>({
        fornecedor: { cidade: { id: 0, nome: "" }, cnpj: "", email: "", nome: "", login: "", senha: "" }, preco: 0, cotacaocompraitem: {
            id: 0, quantidade: 0,
            produto: { categoria: { id: 0, nome: "" }, descrição: "", estoque: 0, nome: "", id: 0, quantidademin: 0 },
            cotacaocompra: { funcionario: { email: "", login: "", nome: "", senha: "", telefone: "", tipo: { id: 0, tipo: "" }, id: 0 }, id: 0 }
        }
    })
    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        console.log({ name, value });
        setResposta({preco:value,fornecedor:fornecedor,cotacaocompraitem:cotacao});
        console.log(resposta)
    }

    function onSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
       axios.post(`${BASE_URL}/respostafornecedor`,resposta).then(response =>{
           alert("RESPOSTA ENVIADA");
       })
    }
    
    return (
        <>
                <h3 className="text-center">Veja os detalhes do pedido:</h3>
                <div className="card">
                    <li className="d-flex justify-content-between lh-sm list-group-item">
                        <div className="col">
                            <h5>Funcionário: {cotacao.cotacaocompra.funcionario.nome}</h5>
                        </div>
                        <div className="col">
                            <h5>Email: {cotacao.cotacaocompra.funcionario.email}</h5>
                        </div>
                    </li>
                    <li className="d-flex justify-content-between lh-sm list-group-item">
                        <div className="col">
                            <h5>Produto: {cotacao.produto.nome}</h5>
                        </div>
                        <div className="col ">
                            <h5>Quantidade pedida: {cotacao.quantidade}</h5>
                        </div>
                    </li>
                </div>
                <div className="jumbotron d-grid col-10 mx-auto my-3">
                    <h1 className="display-4">Informe os valores do pedido</h1><br />
                </div>
                <form onSubmit={onSubmit}>
                    <div className="row py-1">
                        <div className="col">
                            <div className="promotion-form__group">
                                <label htmlFor="preco">Preço:</label>
                                <input className="form-control" type="number" step="0.01" id="preco" name="preco" onChange={onChange} />
                            </div>
                        </div>
                        <div className="col">
                            <label htmlFor="quantidadedisponivel">Quantidade disponível:</label>
                            <input className="form-control" type="number" id="quantidadedisponível" name="quantidadedisponível" onChange={onChange} />
                        </div>
                    </div>

                    <div className="d-grid gap-3 col-2 mx-auto">
                        <button type="submit" className="btn btn-success btn-lg my-4">Enviar</button>
                    </div>
                </form>

        </>
    );
}
export default FornecedorResposta;