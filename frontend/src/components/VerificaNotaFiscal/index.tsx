/* eslint-disable react/style-prop-object */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { CotacaoItem } from 'types/cotacao';
import { Fornecedor } from 'types/fornecedor';
import { Funcionario } from 'types/funcionario';
import { BASE_URL } from 'utils/request';
import { FornecedorCotacaoCompra, CotacaoCompra } from '../../types/cotacao';
import VerificaOrdem from '../VerificaOrdem/index';
import { OrdemCompra, OrdemCompraItem } from 'types/ordemcompra';
import { NotaFiscal, NotaFiscalItem } from 'types/notafiscal';

type Mostrar = {
    quantia: number[];
    produtosnome: string[];
    produtosquantidade: number[];
    produtosprecoitem: number[];
    produtospreco: number[]
}

let notafiscalstorage = JSON.parse(localStorage.getItem('notafiscal') || '{}');

const VerificaNotaFiscal = () => {
    const [notafiscal, setNotaFiscal] = useState<NotaFiscal>(notafiscalstorage);
    const [mostrar, setMostrar] = useState<Mostrar>({ produtospreco: [], produtosprecoitem: [], produtosnome: [], produtosquantidade: [], quantia: [] })
    let p = 0;
    let aux: any = []
    useEffect(() => {
        axios.get(`${BASE_URL}/notaFiscais/${notafiscal.id}`)
            .then(response => {

                const data = response.data as NotaFiscal;
                const nomes = data.notaFiscalItem.map(x => x.produto.nome)
                const precos = data.notaFiscalItem.map(x => x.preco);
                const produtosprecoitem2 = data.notaFiscalItem.map(x => x.precoitem);
                const produtosquantidade2 = data.notaFiscalItem.map(x => x.quantidade);
                for (let index = 0; index < data.notaFiscalItem.length; index++) {
                    p += 1
                    aux.push(p);
                }
                setMostrar({ produtosnome: nomes, produtospreco: precos, produtosprecoitem: produtosprecoitem2, produtosquantidade: produtosquantidade2, quantia: aux })

                console.log("A")
                console.log(mostrar);
                console.log(notafiscal);
            });


    }, []);
    const history = useHistory()

    return (
        <>
            <h3 className="text-center">Veja os detalhes do pedido:</h3>
            <li className="d-flex justify-content-between lh-sm list-group-item">
                <div className="col mx-1">
                    <h5>Aprovador: {notafiscal.funcionario.nome}</h5>
                </div>
                <div className="mx-1 col text-center">
                    <h5>Email: {notafiscal.funcionario.email}</h5>
                </div>
                <div className="col text-center ">
                    <h5>Número da Compra: {notafiscal.num_pedido}</h5>

                </div>
            </li>
            <li className="d-flex justify-content-between lh-sm list-group-item">
                <div className="col">
                    <h5>Fornecedor: {notafiscal.fornecedor.nome}</h5>
                </div>
                <div className="col">
                    <h5>Cidade: {notafiscal.fornecedor.cidade.nome}</h5>
                </div>
                <div className="col">
                    <h5>CNPJ: {notafiscal.fornecedor.cnpj}</h5>
                </div>
                
                <div className="col">
                    <h5>Email:{notafiscal.fornecedor.email}</h5>
                </div>
            </li>
            <li className="d-flex justify-content-between lh-sm list-group-item">
                <div className="col">
                    <h5>Número da Nota: {notafiscal.num_nota}</h5>
                </div>
                <div className="col">
                    <h5>Data de Emissão: {notafiscal.data}</h5>
                </div>
                <div className="col">
                    <h5>Horário de Emissao: {notafiscal.hora}</h5>
                </div>
  
            </li>
            <li className="d-flex justify-content-between lh-sm list-group-item">
                <div className="col">
                    <h5>Destinatário: InovaTech2021</h5>
                </div>
                <div className="col">
                    <h5>CEP: 87209-190</h5>
                </div>
                <div className="col">
                    <h5>Rua: Rua Xuí, 425</h5>
                </div>
                <div className="col">
                    <h5>UF: PR</h5>
                </div>
            </li>

            <div className="table-responsive my-2">
                <table className="table table-striped table-light table-md table-hover align-middle caption-top">
                    <caption className="text-primary text-center">Detalhes da Nota</caption>
                    <thead>
                        <tr>
                            <th className="text-center align-middle">Produto</th>
                            <th className="text-center align-middle">Quantidade Pedida</th>
                            <th className="text-center align-middle">Preço por item</th>
                            <th className="text-center align-middle">Preço</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mostrar.quantia.map(x => (
                            <tr key={notafiscal.notaFiscalItem[x - 1].id}>
                                <th className="text-center ">{mostrar.produtosnome[x - 1]}</th>
                                <th className="text-center">{mostrar.produtosquantidade[x - 1]}</th>
                                <th className="text-center">{mostrar.produtosprecoitem[x - 1]}</th>
                                <th className="text-center">{mostrar.produtospreco[x - 1]}</th>
                            </tr>
                        ))}
                    </tbody>
                    <thead>
                        <tr>
                            <th className="text-center align-middle">Valor Total (com frete):</th>
                            <th ></th>
                            <th></th>
                            <th className="text-center align-middle">{notafiscal.precoTotal}</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </>
    );
}
export default VerificaNotaFiscal;