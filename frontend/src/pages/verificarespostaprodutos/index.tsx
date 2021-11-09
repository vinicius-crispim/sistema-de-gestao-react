import Footer from "components/Footer";
import NavBarFornecedor from "components/NavBar/indexfornecedores";
import VerificaRespostaProdutos from "components/VerificaRespostaProdutos";
import VerificaRespostasTela from "pages/verificarespostas";

const VerificaRespostaProdutosTela = () => {

    return (
        <>
            <NavBarFornecedor />

            <div className="container">
                <VerificaRespostaProdutos />
            </div>
            <Footer />
        </>
    );
}

export default VerificaRespostaProdutosTela;