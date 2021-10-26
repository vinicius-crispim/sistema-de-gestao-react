import axios from 'axios';
import { useEffect, useState } from 'react';
import { CotacaoItem } from 'types/cotacao';
import { Fornecedor } from 'types/fornecedor';
import { Funcionario } from 'types/funcionario';
import { BASE_URL } from 'utils/request';

type CotacaoTeste = {
    id: number;
    funcionario: Funcionario;
    list: CotacaoItem[];
}

type TodosItens = {
    todos: CotacaoItem[];
}
type Quantiaaux = {
    quantia: number[];
}

type Mostrar = {
    quantia:number[];
    produtosnome: string[];
    produtosquantidade: number[];
    produtosids:number[];
}

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

    const [todositens, setTodosItens] = useState<TodosItens>({ todos: [] });
    const [mostrar, setMostrar] = useState<Mostrar>({ produtosnome: [], produtosquantidade: [],quantia:[],produtosids:[] });

    function onChange(event: { target: { name: any; value: any; }; }) {
        const { name, value } = event.target;

        console.log({ name, value });
        setResposta({ preco: value, fornecedor: fornecedor, cotacaocompraitem: cotacao });
        console.log(resposta)
    }
    let aux:any = [ ];
    let p = 0;
    const [quantia,setQuantia]=useState<Quantiaaux>({quantia:[]})
    useEffect(() => {
        axios.get(`${BASE_URL}/cotacoes/${cotacao.id}`)
            .then(response => {

                const data = response.data as CotacaoTeste;
                setTodosItens({ ...todositens, todos: data.list });
                console.log("COTACAO:");
                console.log(data);
                const ids = data.list.map(x=>x.id);
                const a = data.list.map(x=>x.produto.nome);
                const b = data.list.map(x => x.quantidade);
                console.log(a);
                console.log(b);
                console.log(ids);
                for (let index = 1; index <= data.list.length; index++) {
                    p += 1;
                    console.log(p);
                    aux.push(p);
                }
                setMostrar({produtosids:ids,quantia:aux,produtosnome:a,produtosquantidade:b})
                console.log("MOSTRA");
                console.log(mostrar);

            });
            
        
    }, []);
    
    function onSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        /*  axios.post(`${BASE_URL}/respostafornecedor`,resposta).then(response =>{
              alert("RESPOSTA ENVIADA");
          })*/
        console.log(mostrar);
    }

    return (
        <>
            <h3 className="text-center">Veja os detalhes do pedido:</h3>
            <div className="card">
                <li className="d-flex justify-content-between lh-sm list-group-item">
                    <div className="col">
                        <h5>Pedido feito por: {cotacao.funcionario.nome}</h5>
                    </div>
                    <div className="col">
                        <h5>Email: {cotacao.funcionario.email}</h5>
                    </div>
                </li>
                {mostrar.quantia.map(x=> (
                <li className="d-flex justify-content-between lh-sm list-group-item" key={x}>
                    <div className="col">
                        <h5 className="my-2">Nome: {mostrar.produtosnome[x-1]}</h5>
                    </div>
                    <div className="col">
                        <h5 className="my-2">Quantidade: {mostrar.produtosquantidade[x-1]}</h5>
                    </div>
                    <div className="col">
                    <button type="submit" value={mostrar.produtosids[x-1]} onClick={onSubmit} className="btn btn-success btn-lg">Responder</button>
                    </div>
                </li>
                ))}
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
                    <button type="submit" className="btn btn-success btn-lg my-4">Enviar</button>
                </div>
            </form>

        </>
    );
}
export default FornecedorResposta;