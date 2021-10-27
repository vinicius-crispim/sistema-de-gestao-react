import Footer from "components/Footer";
import FornecedorVisualizaProdutos from "components/FornecedorResposta";
import FornecedorResposta from "components/FornecedorResposta";
import NavBar from "components/NavBar";

const RespostaTela = () => {

    return (
        <>
            <NavBar />

            <div className="container">
                <FornecedorVisualizaProdutos />
            </div>
            <Footer />
        </>
    );
}

export default RespostaTela;