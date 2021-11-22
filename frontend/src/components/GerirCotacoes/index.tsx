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
    status?: String;
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
            <h3 className="text-center display-3">Gerencie as Cotações</h3>
            <h6 className="text-center my-2">Verifique as cotações da empresa e clique em ver respostas para visualizar as respostas dos fornecedores, aqui você também pode filtrar a pesquisa, visualizando apenas as cotações já finalizadas e compradas, cotações em andamento ou todas as cotações já feitas</h6>
            <div className="">
                <select className="text-center my-2" onChange={filtro}>
                    <option value="0">Selecione um filtro</option>
                    <option value="1">Todas as Cotações</option>
                    <option value="2">Cotações Finalizadas</option>
                    <option value="3">Cotações em Andamento</option>
                </select>
            </div>
            <div className="table-responsive">
                <table className="table table-striped table-md">
                    <thead>
                        <tr>
                            <th className="text-center text-primary">Número</th>
                            <th className="text-center text-primary">Status</th>
                            <th className="text-center text-primary">Autor</th>
                            <th className="text-center text-primary">Email</th>
                            <th className="text-center text-primary">Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todasfiltradas.quantidade.map(x => (
                            <tr key={todasfiltradas.cotacoes[x].id}>
                                <td className="text-center align-middle">{todasfiltradas.cotacoes[x].id}</td>
                                <td className="text-center align-middle">{todasfiltradas.cotacoes[x].status}</td>
                                <td className="text-center align-middle">{todasfiltradas.cotacoes[x].funcionario.nome}</td>
                                <td className="text-center align-middle">{todasfiltradas.cotacoes[x].funcionario.email}</td>
                                <td className="text-center align-middle">{todasfiltradas.cotacoes[x].data}</td>
                                <td className="text-center align-middle"><button type="submit" value={todasfiltradas.cotacoes[x].id} onClick={onSubmit} className="btn btn-success text-dark  text-black">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="32" fill="currentColor" className="bi bi-zoom-in" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z" />
                                        <path d="M10.344 11.742c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1 6.538 6.538 0 0 1-1.398 1.4z" />
                                        <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5z" />
                                    </svg>
                                    Ver Respostas</button></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="text-center">
                    <h3 className="text-center display-4 my-2">Faça mais uma cotação</h3>
                    <h6 className="text-center my-2">Selecione o botão a seguir para criar mais cotações e enviá-las para os fornecedores</h6>

                    <Link className="btn btn-primary text-black btn-lg mx-5 my-4" to="/cotacao">
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                        Criar Cotação</Link>

                </div>

            </div>
        </>
    );
}

export default GerirCotacoes;