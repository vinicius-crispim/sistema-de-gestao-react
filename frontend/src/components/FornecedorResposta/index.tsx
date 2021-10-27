import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
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





let fornecedor = JSON.parse(localStorage.getItem('fornecedor') || '{}');
let cotacao = JSON.parse(localStorage.getItem('respostafornecedor') || '{}');

const FornecedorVisualizaProdutos = () => {

    const [todositens, setTodosItens] = useState<TodosItens>({ todos: [] });
    const [mostrar, setMostrar] = useState<Mostrar>({ produtosnome: [], produtosquantidade: [],quantia:[],produtosids:[] });

    let aux:any = [ ];
    let p = 0;
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
    const [cotacaocompraitem,setCotacaoCompraItem]=useState<CotacaoItem>({id:0,cotacaocompra:cotacao,produto:{categoria:{id:0,nome:""},descrição:"",estoque:0,id:0,nome:"",quantidademin:0},quantidade:0 })
    const history = useHistory();

    function onSubmit(event:any) {
        event.preventDefault();
        const { name, value } = event.target
        axios.get(`${BASE_URL}/cotacaoitens/${value}`).then(response =>{
              const data = response.data as CotacaoItem;
              setCotacaoCompraItem(data);
              console.log("FOI");
              console.log(data);
              console.log(cotacaocompraitem);
            localStorage.removeItem("cotacaocompraitem");
            localStorage.setItem('cotacaocompraitem', JSON.stringify(data));
            history.push("/respostaitemcotacao");
          })
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
        </>
    );
}
export default FornecedorVisualizaProdutos;