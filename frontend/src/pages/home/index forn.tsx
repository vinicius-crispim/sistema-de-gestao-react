import Footer from "components/Footer";
import NavBarFornecedor from "components/NavBar/indexfornecedores";
import { Link } from "react-router-dom";

/*let vinistring = localStorage.getItem("user");*/
let fornecedor = JSON.parse(localStorage.getItem('fornecedor') || '{}');

const HomeFornecedor = () => {
    return (
        <>
            <NavBarFornecedor />
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">Facebuy</h1>
                    <p className="lead">Sistema de Gestão de Compras</p>
                    <p>{fornecedor.nome}</p>
                    <hr />
                    <p>Este é o seu sistema para gerir da melhor maneira as suas compras e para atingir cada vez mais clientes</p>
                    <Link className="btn btn-success btn-lg" to="/verificarpedidos">Visualizar Pedidos</Link>
                    <Link className="btn btn-success btn-lg mx-5" to="/cadastroproduto"> Cadastrar Produto</Link>                </div>
            </div>
            <Footer />
        </>
    );
}

export default HomeFornecedor;