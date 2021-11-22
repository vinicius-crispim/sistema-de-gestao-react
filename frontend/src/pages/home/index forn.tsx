import axios from "axios";
import Footer from "components/Footer";
import NavBarFornecedor from "components/NavBar/indexfornecedores";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CotacaoItem } from "types/cotacao";
import { Funcionario } from "types/funcionario";
import { BASE_URL } from "utils/request";
import { useHistory } from 'react-router';
import { OrdemCompra } from "types/ordemcompra";


/*let vinistring = localStorage.getItem("user");*/
let fornecedor = JSON.parse(localStorage.getItem('fornecedor') || '{}');

type CotacaoTeste = {
    id: number;
    funcionario: Funcionario;
    item: CotacaoItem[];
    data?: String;

}

type Todas = {
    cotacoes: CotacaoTeste[];
    quantidade: number[];
}
type Todas2 = {
    ordens: OrdemCompra[];
    quantidade: number[];
}


const HomeFornecedor = () => {

    const [todas, setTodasCotacao] = useState<Todas>({ cotacoes: [], quantidade: [] })
    const [cotacao, setCotacao] = useState<CotacaoTeste>({
        item: [], id: 0, funcionario: {
            id: 0,
            nome: "",
            login: "",
            senha: "",
            email: "",
            telefone: "",
            tipo: {
                id: 0,
                tipo: "",
            },
        },
    });
    const [todasordens, setOrdens] = useState<Todas2>({ ordens: [], quantidade: [] })
    const history = useHistory();

    function onSubmit(event: any) {
        axios.get(`${BASE_URL}/cotacoes/autentica/${fornecedor.id}`)
            .then(response => {

                const data = response.data as CotacaoTeste[];
                const meusids = data.map(x => x.id);
                const meusnomes = data.map(x => x.funcionario.nome);
                const minhasmarcas = data.map(x => x.item);
                todas.cotacoes = data;
                for (let index = 0; index < data.length; index++) {
                    todas.quantidade.push(index);

                }
                localStorage.removeItem("cotacoes");
                localStorage.setItem('cotacoes', JSON.stringify(todas));

                let bemvindo = JSON.parse(localStorage.getItem('cotacoes') || '{}');
                console.log(bemvindo);
                history.push("/verificarpedidos");
                window.location.reload();
                // setCotacoesTodas({ ids: meusids, descricao: minhasmarcas, nomepro: meusnomes, quantidadepedida: minhasquant });

                console.log(todas);
            });
    }

    function onSubmit2(event: any) {
        axios.get(`${BASE_URL}/ordemcompras/autentica/${fornecedor.id}`)
            .then(response => {

                const data = response.data as OrdemCompra[];
                todasordens.ordens = data;
                for (let index = 0; index < data.length; index++) {
                    todasordens.quantidade.push(index);

                }
                localStorage.removeItem("ordens");
                localStorage.setItem('ordens', JSON.stringify(todasordens));

                let bemvindo = JSON.parse(localStorage.getItem('ordens') || '{}');
                console.log(bemvindo);
                history.push("/verificaordens");
                window.location.reload();

                console.log(todasordens);
            });
    }

    return (
        <>
            <NavBarFornecedor />
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-2 text-center text-primary">Facebuy</h1>
                    <h3 className="lead text-center">Sistema de Gestão de Compras</h3>
                    <br />
                    <h5 className="text-center">Bem-vindo</h5>
                    <br />
                    <p className="text-center ">Este software foi desenvolvido para fazer a gestão de compras da empresa InovaTech2021, portanto com ele é possível que a empresa faça cotações e compre produtos de seus fornecedores, já para você, fornecedor, a Facebuy tem como objetivo capacitar a venda para a InovaTech2021 de maneira rápida e prática, adinal com o Facebuy é possível toda a parte de venda em um só lugar, agora que já nos conhece, aproveite das funcionalidades que o nosso site oferece!</p>
                <br />
                
                </div>
            </div>
            <div className="masthead bg-success text-white text-center">
                <br />
                <div className="container d-flex align-items-center flex-column">
                    <h1 className="masthead-heading text-uppercase mb-0">Visualize e responda as Cotações</h1>
                    <div className="divider-custom divider-light">
                        <br />
                        <div className="divider-custom-line"></div>
                        <div className=" divider-custom-icon text-center"><h4>Clicando no botão, você poderá visualizar as cotações que foram enviadas</h4></div>
                        <div className=" divider-custom-icon text-center"><h4>pela InovaTech2021, com isso você verá os produtos que foram pedidos e</h4></div>
                        <div className=" divider-custom-icon text-center"><h4>a quantidade desejada, após verificação, responda a cotação caso tenha</h4></div>
                        <div className=" divider-custom-icon text-center"><h4>os produtos pedidos</h4></div>
                        <div className="divider-custom-line"></div>
                    </div>
                    <br />
                    <div className="py-3">
                    <button type="submit" onClick={onSubmit} className="btn btn-light btn-lg">Visualizar Pedidos</button>
                </div>
                <br />
                </div>
                
            </div>
            <div className="my-2 masthead text-center">
                <br />
                <div className="container d-flex align-items-center flex-column">
                    <h1 className="masthead-heading text-uppercase mb-0">Visualize e responda as Cotações</h1>
                    <div className="divider-custom divider-light">
                        <br />
                        <div className="divider-custom-line"></div>
                        <div className=" divider-custom-icon text-center"><h4>O ultimo passo para finalizar o processo de venda é confirmar a ordem de </h4></div>
                        <div className=" divider-custom-icon text-center"><h4>compra com isso a nota fiscal sera gerada e os produtos ja podem ser enviados </h4></div>
                        <div className=" divider-custom-icon text-center"><h4>para a InovaTech2021, para ver as ordens de compras, selecione o botão a seguir</h4></div>
                        <div className="divider-custom-line"></div>
                    </div>
                    <br />
                    <div className="py-3">
                    <button type="submit" onClick={onSubmit2} className="mx-3 btn-success btn-lg">Visualizar Ordens</button>
                </div>
                <br />
                </div>
                
            </div>
            <div className="masthead bg-success text-white text-center">
                    <br />
                    <div className="container d-flex align-items-center flex-column">
                        <h1 className="masthead-heading text-uppercase mb-0">Alguma Duvida ou Problema?</h1>
                        <h3 className="masthead-heading text-uppercase mb-0">Entre em contato!</h3>
                        <div className="divider-custom divider-light">
                            <br />
                            <div className="divider-custom-line"></div>
                            <div className=" divider-custom-icon text-center"><h4>E-mail: facebuy@inovatech2021.com</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>Telefone: (41) 3641-5863</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>Celular: (41) 99754-8613</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>WhatsApp: (41) 97865-2314</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>Comunique o seu problema e nos ajude a fazer uma ferramenta cada vez melhor</h4></div>
                            <div className="divider-custom-line"></div>
                        </div>
                        <br />
                    </div>

                </div>
            <Footer />
        </>
    );
}

export default HomeFornecedor;