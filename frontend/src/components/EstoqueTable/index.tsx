import axios from "axios";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProdutoPage } from "types/produto";
import { BASE_URL } from "utils/request";
import { Produto } from '../../types/produto';
import { useHistory } from 'react-router';


const EstoqueTable = () => {

    const [activePage, setActivePage] = useState(0);

    const [page, setPage] = useState<ProdutoPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0,
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/produtos?page=${activePage}&size=3&sort=estoque,desc`)
            .then(response => {

                setPage(response.data);
            })
    }, [activePage]);

    const changePage = (index: number) => {
        setActivePage(index);
    }

    const history = useHistory();
    const [produtotemp, setProdutoTemp] = useState<Produto>({ descrição: "", estoque: 0, nome: "", categoria: { id: 0, nome: "" }, id: 0, quantidademin: 0 })

    function onSubmit(event: any) {
        event.preventDefault();
        const { name, value } = event.target
        axios.get(`${BASE_URL}/produtos/${value}`).then(response => {
            const data = response.data as Produto;
            console.log("FOI");
            console.log(data);
            setProdutoTemp(data);
            localStorage.removeItem("produtotemp");
            localStorage.setItem('produtotemp', JSON.stringify(data));
            history.push("/visualizarproduto");
            window.location.reload();
        })
    }

    return (
        <>

            <div className="table-responsive">
                <table className="table table-striped table-md">
                    <thead>
                        <tr>
                            <th className="text-center text-primary">Nome</th>
                            <th className="text-center text-primary">Categoria</th>
                            <th className="text-center text-primary">Quantidade em Estoque</th>
                            <th className="text-center text-primary">Quantidade Mínimia</th>
                            <th className="text-center text-primary">Descrição</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {page.content?.map(x => (
                            <tr key={x.id}>
                                <td className="text-center">{x.nome}</td>
                                <td className="text-center">{x.categoria.nome}</td>
                                <td className="text-center">{x.estoque}</td>
                                <td className="text-center">{x.quantidademin}</td>
                                <td className="text-center">{x.descrição}</td>
                                <td className="text-center"><button type="submit" value={x.id} onClick={onSubmit} className="btn btn-success btn-lg">Visualizar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination page={page} onPageChange={changePage} />
            </div>
        </>
    );
}

export default EstoqueTable;