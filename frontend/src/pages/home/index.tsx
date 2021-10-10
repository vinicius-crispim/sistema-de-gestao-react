import Footer from "components/Footer";
import NavBar from "components/NavBar";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <>
            <NavBar />
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">Facebuy</h1>
                    <p className="lead">Sistema de Gestão de Compras</p>
                    <hr />
                    <p>Este é o seu sistema para gerir da melhor maneira as suas compras e para atingir cada vez mais clientes</p>
                    <Link className="btn btn-success btn-lg" to ="/cadastrofornecedor"> Cadastrar Fornecedor</Link>
                    <Link className="btn btn-success btn-lg mx-5" to ="/cadastroproduto"> Cadastrar Produto</Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;