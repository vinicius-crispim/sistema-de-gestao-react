import axios from "axios";
import Pagination from "components/Pagination";
import { useEffect, useState } from "react";
import { ProdutoPage } from "types/produto";
import { BASE_URL } from "utils/request";
import { Produto } from '../../types/produto';
import { useHistory } from 'react-router-dom';


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
        axios.get(`${BASE_URL}/produtos?page=${activePage}&size=5&sort=estoque,desc`)
            .then(response => {
                setPage(response.data);
            })
            
    }, [activePage]);
    function filtro(event:any) {
        const {name,value} = event.target;
        if(value === '2'){
            axios.get(`${BASE_URL}/produtos/inativos?page=${activePage}&size=5&sort=estoque,desc`)
            .then(response => {
                setPage(response.data);
            console.log(page)
            })      
        }
        if(value === '1'){
            axios.get(`${BASE_URL}/produtos?page=${activePage}&size=5&sort=estoque,desc`)
            .then(response => {
                setPage(response.data);
            console.log(page)
            })      
        }
        if(value === '3'){
            axios.get(`${BASE_URL}/produtos/emfalta?page=${activePage}&size=5&sort=estoque,desc`)
            .then(response => {
                setPage(response.data);
            console.log(page)
            })      
        }
        if(value === '4'){
            axios.get(`${BASE_URL}/produtos/todos?page=${activePage}&size=5&sort=estoque,desc`)
            .then(response => {
                setPage(response.data);
            console.log(page)
            })      
        }
    }
    const changePage = (index: number) => {
        setActivePage(index);
    }

    const history = useHistory();
    const [produtotemp, setProdutoTemp] = useState<Produto>({ status:"",descrição: "", estoque: 0, nome: "", categoria: { id: 0, nome: "" }, id: 0, quantidademin: 0 })

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
    function onSubmitAdd(event: any) {
        event.preventDefault();
        history.push("/cadastroproduto")
    }

    return (
        <>

            <div className="table-responsive">
            <select className="text-center my-2" onChange={filtro}>
                    <option value="0">Selecione um filtro</option>
                    <option value="1">Produtos Válidos</option>
                    <option value="2">Produtos Inválidos</option>
                    <option value="3">Produtos em Falta</option>
                    <option value="4">Todos os Produtos</option>
                </select>
                <table className="table table table-light table-md table-hover align-middle caption-top">
                
                    <caption className="text-primary">Lista de Produtos</caption>
                    <thead>
                        <tr>
                            <th className="text-center font-weight-bold">Nome</th>
                            <th className="text-center font-weight-bold">Categoria</th>
                            <th className="text-center font-weight-bold">Quantidade em Estoque</th>
                            <th className="text-center font-weight-bold">Quantidade Mínimia</th>
                            <th className="text-center font-weight-bold">Descrição</th>
                            <th className="text-center font-weight-bold">Status</th>
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
                                <td className="text-center">{x.status}</td>
                                <td className="text-center"><button type="submit" value={x.id} onClick={onSubmit} className="btn text-dark text-black  btn-success btn-lg">Editar</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Pagination page={page} onPageChange={changePage} />
            </div>
            <div className="text-center my-3" >
                <p className="lead">Adicione um novo produto</p>
                <button type="submit" onClick={onSubmitAdd} className="btn btn-success  text-dark text-black  btn-lg mx-5 px-5"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="35" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>Adicionar</button>
            </div>
        </>
    );
}

export default EstoqueTable;