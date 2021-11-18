import axios from "axios";
import { useEffect, useState } from "react";
import { Produto } from "types/produto";
import { BASE_URL } from "utils/request";
import { CotacaoCompra, CotacaoItem, FornecedorCotacaoCompraSelect } from '../../types/cotacao';
import Cotacao from 'components/Cotacao';
import { Link, useHistory } from "react-router-dom";
import { Funcionario } from "types/funcionario";

type CotacaoTeste = {
    id: number;
    funcionario: Funcionario;
    item: CotacaoItem[];
    data?: String;
}

type Todas2 = {
    fornecedorCotacaoCompra: FornecedorCotacaoCompraSelect[];
    quantidade: number[];
}

type Todas = {
    cotacoes: CotacaoTeste[];
    quantidade: number[];
}

let user = JSON.parse(localStorage.getItem('user') || '{}');
let todascotacoes = JSON.parse(localStorage.getItem('cotacoesemandamento') || '{}');
let cotacoesfiltradasstorage = JSON.parse(localStorage.getItem('cotacoesfiltradas') || '{}');


type TodosItens = {
    ids: number[];
    nomepro: String[];
    quantidadepedida: number[];
    descricao: String[];
}

type Mostra = {
    idCotacao: number;
    nomes: string[][];
}

const GerirCotacoes = () => {
    const [todas2, setTodasCotacao2] = useState<Todas2>({ fornecedorCotacaoCompra: [], quantidade: [] })
    const history = useHistory();
    const [todas, setTodasCotacao] = useState<Todas>({ cotacoes: [], quantidade: [] })
    const [todasfiltradas, setTodasFiltradas] = useState<Todas>(cotacoesfiltradasstorage)
    console.log("todasfiltradas")
    console.log(todasfiltradas)
    function filtro(event: any) {
        const { name, value } = event.target
        console.log(value)
        if (value === "1") {
            console.log("RODOU 1")
            axios.get(`${BASE_URL}/cotacoes`)
                .then(response => {
                    const data = response.data as CotacaoTeste[];
                    const meusids = data.map(x => x.id);
                    const meusnomes = data.map(x => x.funcionario.nome);
                    const minhasmarcas = data.map(x => x.item);
                    todas.cotacoes = data;
                    for (let index = 0; index < todas.quantidade.length; index++) {
                        todas.quantidade.splice(index,);

                    }
                    for (let index = 0; index < data.length; index++) {
                        todas.quantidade.push(index);

                    }
                    localStorage.removeItem("cotacoesfiltradas");
                    localStorage.setItem('cotacoesfiltradas', JSON.stringify(todas));
                    window.location.reload();

                    let bemvindo = JSON.parse(localStorage.getItem('cotacoesfiltradas') || '{}');
                    console.log(bemvindo);
                    // setCotacoesTodas({ ids: meusids, descricao: minhasmarcas, nomepro: meusnomes, quantidadepedida: minhasquant });

                    console.log("MOSTRA TODAS SEM FILTRO");
                    console.log(todas);
                });
        } else if (value === "3") {
            console.log("RODOU 2")
            axios.get(`${BASE_URL}/cotacoes/pendente`)
                .then(response => {

                    const data = response.data as CotacaoTeste[];
                    todas.cotacoes = data;
                    for (let index = 0; index < todas.quantidade.length; index++) {
                        todas.quantidade.splice(index,);

                    }
                    for (let index = 0; index < data.length; index++) {
                        todas.quantidade.push(index);

                    }
                    localStorage.removeItem("cotacoesfiltradas");
                    localStorage.setItem('cotacoesfiltradas', JSON.stringify(todas));
                    window.location.reload();
                    let bemvindo = JSON.parse(localStorage.getItem('cotacoesfiltradas') || '{}');
                    console.log("MOSTRA TODAS PENDENTES");

                    console.log(bemvindo);
                    console.log(todas);
                });
        } else if (value === "2") {
            console.log("RODOU #")
            axios.get(`${BASE_URL}/cotacoes/finalizada`)
                .then(response => {

                    const data = response.data as CotacaoTeste[];
                    todas.cotacoes = data;
                    for (let index = 0; index < todas.quantidade.length; index++) {
                        todas.quantidade.splice(index,);

                    }
                    for (let index = 0; index < data.length; index++) {
                        todas.quantidade.push(index);

                    }
                    localStorage.removeItem("cotacoesfiltradas");
                    localStorage.setItem('cotacoesfiltradas', JSON.stringify(todas));
                    window.location.reload();

                    let bemvindo = JSON.parse(localStorage.getItem('cotacoesfiltradas') || '{}');
                    console.log("MOSTRA TODAS FINALIZADAS");
                    console.log(bemvindo);
                    console.log(todas);
                });
        }
    }
    function onSubmit(event: any) {
        const { name, value } = event.target
        axios.get(`${BASE_URL}/fornecedorcotacaocompras/bycotacao/${value}`)
            .then(response => {

                const data = response.data as FornecedorCotacaoCompraSelect[];
                todas2.fornecedorCotacaoCompra = data;
                for (let index = 0; index < data.length; index++) {
                    todas2.quantidade.push(index);

                }
                console.log(todas2);
                localStorage.removeItem("fornecedorcotacaocompra");
                localStorage.setItem('fornecedorcotacaocompra', JSON.stringify(todas2));

                let bemvindo = JSON.parse(localStorage.getItem('fornecedorcotacaocompra') || '{}');
                console.log(bemvindo);
                history.push("/verificarrespostas");
                window.location.reload();

                console.log(todas2);
            });


    }

    return (
        <>
            <h3 className="text-center display-4">Selecione o filtro de pesquisa</h3>
            <select className="text-center my-2" onChange={filtro}>
                <option value="0">Selecione um filtro</option>
                <option value="1">Todas as Cotações</option>
                <option value="2">Cotações Compradas</option>
                <option value="3">Cotações em Andamento</option>
            </select>
            <div className="table-responsive">
                <table className="table table-striped table-md">
                    <thead>
                        <tr>
                            <th className="text-center text-primary">Numero</th>
                            <th className="text-center text-primary">Autor</th>
                            <th className="text-center text-primary">Email</th>
                            <th className="text-center text-primary">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todasfiltradas.quantidade.map(x => (
                            <tr key={todasfiltradas.cotacoes[x].id}>
                                <td className="text-center"><button type="submit" value={todasfiltradas.cotacoes[x].id} onClick={onSubmit} className="btn btn-success btn-lg">Ver Cotacao</button></td>
                                <td className="text-center">{todasfiltradas.cotacoes[x].funcionario.nome}</td>
                                <td className="text-center">{todasfiltradas.cotacoes[x].funcionario.email}</td>
                                <td className="text-center">{todasfiltradas.cotacoes[x].data}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>


            </div>
        </>
    );
}

export default GerirCotacoes;