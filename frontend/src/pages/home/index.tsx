import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { Link } from "react-router-dom";

/*let vinistring = localStorage.getItem("user");*/
let user = JSON.parse(localStorage.getItem('user') || '{}');

const Home = () => {

    return (
        <>
            <NavBar />
            
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">Facebuy</h1>
                    <p className="lead">Sistema de Gestão de Compras</p>
                    <p>{user.nome}</p>
                    <hr />
                    <p>Este é o seu sistema para gerir da melhor maneira as suas compras e para atingir cada vez mais clientes</p>
                    <Link className="btn btn-success btn-lg" to="/cadastrofornecedor"> Cadastrar Fornecedor</Link>
                    <Link className="btn btn-success btn-lg mx-5" to="/cadastrofuncionario"> Cadastrar Funcionário</Link>
                    <Link className="btn btn-success btn-lg mx-5" to="/cadastroproduto"> Cadastrar Produto</Link>
                    <Link className="btn btn-success btn-lg mx-5" to="/estoque"> Estoque</Link>
                    <Link className="btn btn-success btn-lg mx-5 my-4" to="/nota"> Nota Fiscal</Link>
                    <Link className="btn btn-success btn-lg mx-5 my-4" to="/cotacao"> Cotacao</Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;