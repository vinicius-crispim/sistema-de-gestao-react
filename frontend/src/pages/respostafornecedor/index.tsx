import Footer from "components/Footer";
import FornecedorVisualizaProdutos from "components/FornecedorResposta";
import FornecedorResposta from "components/FornecedorResposta";
import NavBar from "components/NavBar";
import NavBarFornecedor from "components/NavBar/indexfornecedores";

const RespostaTela = () => {

    return (
        <>
            <NavBarFornecedor />

            <div className="container">
                <FornecedorVisualizaProdutos />
            </div>
            <Footer />
        </>
    );
}

export default RespostaTela;