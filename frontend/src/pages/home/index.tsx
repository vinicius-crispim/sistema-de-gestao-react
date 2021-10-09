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
                    <p>Esta aplicação consiste em exibir um dashboard a partir de dados fornecidos por um back end construído com Spring Boot.</p>
                    <Link className="btn btn-success btn-lg" to ="/cadastrofornecedor"> Cadastrar Fornecedor</Link>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Home;