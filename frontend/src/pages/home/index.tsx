import axios from "axios";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { CotacaoItem, FornecedorCotacaoCompraSelect } from "types/cotacao";
import { Funcionario } from "types/funcionario";
import { BASE_URL } from "utils/request";
import NavBarGerente from '../../components/NavBar/indexgerente';

/*let vinistring = localStorage.getItem("user");*/
let user = JSON.parse(localStorage.getItem('user') || '{}');
let tipo = JSON.parse(localStorage.getItem('tipo') || '{}');

type Todas = {
    cotacoes: CotacaoTeste[];
    quantidade: number[];
}


type CotacaoTeste = {
    id: number;
    funcionario: Funcionario;
    item: CotacaoItem[];
    data?: String;

}
const Home = () => {

    const [todas, setTodasCotacao] = useState<Todas>({ cotacoes: [], quantidade: [] })
    const [todas2, setTodasCotacao2] = useState<Todas>({ cotacoes: [], quantidade: [] })

    const history = useHistory();
    function gerenciarcotações() {
        axios.get(`${BASE_URL}/cotacoes`)
            .then(response => {
                const data = response.data as CotacaoTeste[];
                todas.cotacoes = data;
                for (let index = 0; index < data.length; index++) {
                    todas.quantidade.push(index);

                }
                localStorage.removeItem("cotacoesfiltradas");
                localStorage.setItem('cotacoesfiltradas', JSON.stringify(todas));

                let bemvindo = JSON.parse(localStorage.getItem('cotacoesfiltradas') || '{}');
                console.log(bemvindo);
                console.log("TODAS");
                console.log(todas);
                history.push("/gerircotacoes")
                window.location.reload();

            });

    }

    function onSubmit(event: any) {
        axios.get(`${BASE_URL}/cotacoes/pendente`)
            .then(response => {

                const data = response.data as CotacaoTeste[];
                todas.cotacoes = data;
                for (let index = 0; index < data.length; index++) {
                    todas.quantidade.push(index);

                }
                localStorage.removeItem("cotacoesemandamento");
                localStorage.setItem('cotacoesemandamento', JSON.stringify(todas));

                let bemvindo = JSON.parse(localStorage.getItem('cotacoesemandamento') || '{}');
                console.log(bemvindo);
                console.log(todas);
            });
        axios.get(`${BASE_URL}/cotacoes`)
            .then(response => {
                const data = response.data as CotacaoTeste[];
                const meusids = data.map(x => x.id);
                const meusnomes = data.map(x => x.funcionario.nome);
                const minhasmarcas = data.map(x => x.item);
                todas2.cotacoes = data;
                for (let index = 0; index < data.length; index++) {
                    todas2.quantidade.push(index);

                }
                localStorage.removeItem("cotacoes");
                localStorage.setItem('cotacoes', JSON.stringify(todas2));

                let bemvindo = JSON.parse(localStorage.getItem('cotacoes') || '{}');
                console.log(bemvindo);
                history.push("/cotacoesemandamento");
                window.location.reload();
                // setCotacoesTodas({ ids: meusids, descricao: minhasmarcas, nomepro: meusnomes, quantidadepedida: minhasquant });

                console.log(todas2);
            });
    }

    function achaFinalizada() {
        axios.get(`${BASE_URL}/cotacoes/finalizada`)
            .then(response => {

                const data = response.data as CotacaoTeste[];
                todas.cotacoes = data;
                for (let index = 0; index < data.length; index++) {
                    todas.quantidade.push(index);

                }
                localStorage.removeItem("cotacoesfinalizada");
                localStorage.setItem('cotacoesfinalizada', JSON.stringify(todas));

                let bemvindo = JSON.parse(localStorage.getItem('cotacoesfinalizada') || '{}');
                console.log(bemvindo);
                console.log(todas);
            });
        axios.get(`${BASE_URL}/cotacoes`)
            .then(response => {
                const data = response.data as CotacaoTeste[];
                const meusids = data.map(x => x.id);
                const meusnomes = data.map(x => x.funcionario.nome);
                const minhasmarcas = data.map(x => x.item);
                todas2.cotacoes = data;
                for (let index = 0; index < data.length; index++) {
                    todas2.quantidade.push(index);

                }
                localStorage.removeItem("cotacoes");
                localStorage.setItem('cotacoes', JSON.stringify(todas2));

                let bemvindo = JSON.parse(localStorage.getItem('cotacoes') || '{}');
                console.log(bemvindo);
                history.push("/cotacoesfinalizadas");
                window.location.reload();
                // setCotacoesTodas({ ids: meusids, descricao: minhasmarcas, nomepro: meusnomes, quantidadepedida: minhasquant });

                console.log(todas2);
            });
    }

const [usuario] = useState<Funcionario>(user)
    if (tipo.tipo !== "Gerente") {
        return (
            <>
                <NavBar />
                <div className="container">
                    <div className="jumbotron masthead text-dark text-center">
                        <h1 className="display-2 text-center text-primary text-uppercase">Facebuy</h1>
                        <h3 className="lead text-center">Sistema de Gestão de Compras</h3>

                        <h4 className="text-center">Bem-vindo</h4>
                        <br />
                        <p className="text-center ">Este software foi desenvolvido para fazer a gestão de compras da empresa InovaTech2021, portanto com ele é possível que a empresa faça cotações e compre produtos de seus fornecedores diretamente do software, aqui você, funcionário, pode fazer toda a parte de gestão de compra e de estoque da empresa em um só lugar, esperamos que a nossa ferramenta cumpra o seu objetivo e que você faça o melhor uso das nossas funcionalidades, faça e envie uma cotação, efetue uma compra, cadastre um produto ou veja notas fiscais, aqui você pode tudo isso e mais, agora que já conhece essa ferramenta, aproveite das funcionalidades que ela pode oferecer!</p>
                        <br />

                    </div>
                </div>
                <div className="masthead bg-success text-white text-center">
                    <br />
                    <div className="container d-flex align-items-center flex-column">
                        <h1 className="masthead-heading text-uppercase mb-0">Gerencie as cotações da InovaTech2021</h1>
                        <div className="divider-custom divider-light">
                            <br />
                            <div className="divider-custom-line"></div>
                            <div className=" divider-custom-icon text-center"><h4>Clicando no botão, você poderá fazer toda a parte de gestão das cotações</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>da InovaTech2021,será possível ver as cotações em andamento, as respostas</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>que foram dadas pelos fornecedores e caso alguma agradade o gerente poderá</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>enviar a ordem de compra, també será possível ver as cotações ja finalizadas</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>e suas notas fiscais</h4></div>
                            <div className="divider-custom-line"></div>
                        </div>
                        <div className="py-3">
                            <button type="submit" onClick={gerenciarcotações} className="btn btn-light btn-lg">Gerenciar Cotações</button>
                        </div>
                        <br />
                    </div>

                </div>
                <div className="masthead text-dark text-center">
                    <br />
                    <div className="container d-flex align-items-center flex-column">
                        <h1 className="masthead-heading text-uppercase mb-0">Veja o estoque da empresa</h1>
                        <div className="divider-custom divider-light">
                            <br />
                            <div className="divider-custom-line"></div>
                            <div className=" divider-custom-icon text-center"><h4>Aqui você pode converir o estoque de produtos da nossa empresa, podendo</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>analisar quais estão precisando ser comprados, também é possível editar esses</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>produtos ou invalidá-los caso não seja mais utilizado pela InovaTech2021</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>Para fazer tudo isso, selecione no botão e visualize como anda o estoque</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>da InovaTech2021</h4></div>
                            <div className="divider-custom-line"></div>
                        </div>
                        <div className="py-3">
                            <Link className="btn btn-success btn-lg" to="/estoque"> Estoque</Link>
                        </div>
                        <br />
                    </div>

                </div>
                <div className="masthead bg-success text-white text-center">
                    <br />
                    <div className="container d-flex align-items-center flex-column">
                        <h1 className="masthead-heading text-uppercase mb-0">Cadastrar Mais Dados</h1>
                        <div className="divider-custom divider-light">
                            <br />
                            <div className="divider-custom-line"></div>
                            <div className=" divider-custom-icon text-center"><h4>Nosso software permite que você <Link to="/cadastroproduto" className="text-decoration-none">cadastre mais produtos</Link> para por no estoque e</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>outros dados úteis como cadastro de <Link className="text-decoration-none" to="/cadastrocidade">novas cidades</Link> ou <Link className="text-decoration-none" to="/cadastro estado">cadastrar estados</Link>, cada</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>cada produto deve ter uma categoria por isso, é possível <Link className="text-decoration-none" to="/cadastrocategoria">cadastrar categoria</Link></h4></div>
                            <div className=" divider-custom-icon text-center"><h4>desta maneira as informações de utilidade para empresa sempre podem se manter atualizadas</h4></div>
                            <br />
                            <div className="divider-custom-line"></div>
                        </div>
                    </div>

                </div>
                <div className="masthead text-dark text-center">
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
                <div className="container">
                    <div className="jumbotron">

                        <h1 className="display-4 text-center text-primary">Facebuy</h1>
                        <p className="lead text-center">Sistema de Gestão de Compras</p>
                        <p>{user.nome}</p>
                        <hr />
                        <p>Este é o seu sistema para gerir da melhor maneira as suas compras e para atingir cada vez mais clientes</p>
                        <button type="submit" onClick={onSubmit} className="btn btn-success btn-lg">Visualizar Respostas</button>
                        <button type="submit" onClick={achaFinalizada} className="btn btn-success btn-lg mx-2">Visualizar Cotacoes Finalizadas</button>
                        <Link className="btn btn-success btn-lg mx-3" to="/cadastrofuncionario"> Cadastrar Funcionário</Link>
                        <Link className="btn btn-success btn-lg mx-5" to="/cadastroproduto"> Cadastrar Produto</Link>
                        <Link className="btn btn-success btn-lg mx-5 my-4" to="/nota"> Nota Fiscal</Link>
                        <Link className="btn btn-success btn-lg mx-5 my-4" to="/cotacao"> Cotacao</Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
    else {
        return (
            <>
                <NavBarGerente />
                <div className="container">
                    <div className="jumbotron masthead text-dark text-center">
                        <h1 className="display-2 text-center text-primary text-uppercase">Facebuy</h1>
                        <h3 className="lead text-center">Sistema de Gestão de Compras</h3>

                        <h4 className="text-center">Bem-vindo</h4>
                        <br />
                        <p className="text-center ">Este software foi desenvolvido para fazer a gestão de compras da empresa InovaTech2021, portanto com ele é possível que a empresa faça cotações e compre produtos de seus fornecedores diretamente do software, aqui você, funcionário, pode fazer toda a parte de gestão de compra e de estoque da empresa em um só lugar, esperamos que a nossa ferramenta cumpra o seu objetivo e que você faça o melhor uso das nossas funcionalidades, faça e envie uma cotação, efetue uma compra, cadastre um produto ou veja notas fiscais, aqui você pode tudo isso e mais, agora que já conhece essa ferramenta, aproveite das funcionalidades que ela pode oferecer!</p>
                        <br />

                    </div>
                </div>
                <div className="masthead bg-success text-white text-center">
                    <br />
                    <div className="container d-flex align-items-center flex-column">
                        <h1 className="masthead-heading text-uppercase mb-0">Gerencie as cotações da InovaTech2021</h1>
                        <div className="divider-custom divider-light">
                            <br />
                            <div className="divider-custom-line"></div>
                            <div className=" divider-custom-icon text-center"><h4>Clicando no botão, você poderá fazer toda a parte de gestão das cotações</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>da InovaTech2021,será possível ver as cotações em andamento, as respostas</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>que foram dadas pelos fornecedores e caso alguma agradade o gerente poderá</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>enviar a ordem de compra, també será possível ver as cotações ja finalizadas</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>e suas notas fiscais</h4></div>
                            <div className="divider-custom-line"></div>
                        </div>
                        <div className="py-3">
                            <button type="submit" onClick={gerenciarcotações} className="btn btn-light btn-lg">Gerenciar Cotações</button>
                        </div>
                        <br />
                    </div>

                </div>
                <div className="masthead text-dark text-center">
                    <br />
                    <div className="container d-flex align-items-center flex-column">
                        <h1 className="masthead-heading text-uppercase mb-0">Veja o estoque da empresa</h1>
                        <div className="divider-custom divider-light">
                            <br />
                            <div className="divider-custom-line"></div>
                            <div className=" divider-custom-icon text-center"><h4>Aqui você pode converir o estoque de produtos da nossa empresa, podendo</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>analisar quais estão precisando ser comprados, também é possível editar esses</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>produtos ou invalidá-los caso não seja mais utilizado pela InovaTech2021</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>Para fazer tudo isso, selecione no botão e visualize como anda o estoque</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>da InovaTech2021</h4></div>
                            <div className="divider-custom-line"></div>
                        </div>
                        <div className="py-3">
                            <Link className="btn btn-success btn-lg" to="/estoque"> Estoque</Link>
                        </div>
                        <br />
                    </div>

                </div>
                <div className="masthead bg-success text-white text-center">
                    <br />
                    <div className="container d-flex align-items-center flex-column">
                        <h1 className="masthead-heading text-uppercase mb-0">Cadastrar Mais Dados</h1>
                        <div className="divider-custom divider-light">
                            <br />
                            <div className="divider-custom-line"></div>
                            <div className=" divider-custom-icon text-center"><h4>Nosso software permite que você <Link to="/cadastroproduto" className="text-decoration-none">cadastre mais produtos</Link> para por no estoque e</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>outros dados úteis como cadastro de <Link className="text-decoration-none" to="/cadastrocidade">novas cidades</Link> ou <Link className="text-decoration-none" to="/cadastroestado">cadastrar estados</Link>, cada</h4></div>
                            <div className=" divider-custom-icon text-center"><h4>cada produto deve ter uma categoria por isso, é possível <Link className="text-decoration-none" to="/cadastrocategoria">cadastrar categoria</Link></h4></div>
                            <div className=" divider-custom-icon text-center"><h4>desta maneira as informações de utilidade para empresa sempre podem se manter atualizadas</h4></div>
                            <br />
                            <div className="divider-custom-line"></div>
                        </div>
                    </div>

                </div>
                <div className="masthead text-dark text-center">
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
                <div className="container">
                    <div className="jumbotron">

                        <h1 className="display-4 text-center text-primary">Facebuy</h1>
                        <p className="lead text-center">Sistema de Gestão de Compras</p>
                        <p>{user.nome}</p>
                        <hr />
                        <p>Este é o seu sistema para gerir da melhor maneira as suas compras e para atingir cada vez mais clientes</p>
                        <button type="submit" onClick={onSubmit} className="btn btn-success btn-lg">Visualizar Respostas</button>
                        <button type="submit" onClick={achaFinalizada} className="btn btn-success btn-lg mx-2">Visualizar Cotacoes Finalizadas</button>
                        <Link className="btn btn-success btn-lg mx-3" to="/cadastrofuncionario"> Cadastrar Funcionário</Link>
                        <Link className="btn btn-success btn-lg mx-5" to="/cadastroproduto"> Cadastrar Produto</Link>
                        <Link className="btn btn-success btn-lg mx-5 my-4" to="/nota"> Nota Fiscal</Link>
                        <Link className="btn btn-success btn-lg mx-5 my-4" to="/cotacao"> Cotacao</Link>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

export default Home;