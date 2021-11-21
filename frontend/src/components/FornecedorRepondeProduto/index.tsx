import axios from "axios";
import { useState, useEffect } from "react";
import { Fornecedor } from "types/fornecedor";
import { BASE_URL } from "utils/request";
import { CotacaoItem, FornecedorCotacaoCompra } from '../../types/cotacao';

let fornecedorstorage = JSON.parse(localStorage.getItem('fornecedor') || '{}');
let cotacao = JSON.parse(localStorage.getItem('respostafornecedor') || '{}');
let cotacaoitem = JSON.parse(localStorage.getItem('cotacaocompraitem') || '{}');

type Resposta = {
    preco: number;
    fornecedor: Fornecedor;
    cotacaocompraitem: CotacaoItem;
}

const FornecedorRespondeProdutos = () => {

    const [fornecedorcotacacaocompra, setFornecedorCotacaoCompra] = useState<FornecedorCotacaoCompra>({
        fornecedor: fornecedorstorage,cotacaocompra:cotacao,id:0,status:"Pendente",frete:0,precototal:0,dataEntrega:""
    })

    const [resposta, setResposta] = useState<Resposta>({ fornecedor:fornecedorstorage,cotacaocompraitem:cotacaoitem,preco:0 });

    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        
        console.log({ name, value });
        setResposta({ preco: value, fornecedor: fornecedorstorage, cotacaocompraitem: cotacaoitem });
        console.log(resposta)
    }
    
    function onSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        /*  axios.post(`${BASE_URL}/respostafornecedor`,resposta).then(response =>{
              alert("RESPOSTA ENVIADA");
          })*/
        console.log(cotacao);
        console.log(cotacaoitem);
        console.log(resposta);
    }

    return (
        <>
            <h3 className="text-center">Veja os detalhes do pedido:</h3>
            <div className="card">
                <li className="d-flex justify-content-between list-group-item">
                    <div className="col">
                        <h5>Pedido feito por: {cotacao.funcionario.nome}</h5>
                    </div>
                    <div className="col">
                        <h5>Email: {cotacao.funcionario.email}</h5>
                    </div>
                </li>
                <li className="d-flex justify-content-between list-group-item">
                    <div className="col">
                        <h5>Produto: {resposta.cotacaocompraitem.produto.nome}</h5>
                    </div>
                    <div className="col">
                        <h5>Quantidade pedida: {resposta.cotacaocompraitem.quantidade}</h5>
                    </div>
                </li>
            </div>
            <div className="jumbotron d-grid col-10 mx-auto my-3">
                <h1 className="display-4">Informe os valores do pedido</h1><br />
            </div>
            <form >
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
                    <button type="submit" className="btn btn-success btn-lg my-4  text-dark text-black " onClick={onSubmit}><svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-check" viewBox="0 0 16 16">
                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z" />
                        </svg>Enviar</button>
                </div>
            </form>

        </>
    );
}
export default FornecedorRespondeProdutos;