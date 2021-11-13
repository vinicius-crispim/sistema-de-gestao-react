import Footer from "components/Footer";
import NavBarFornecedor from "components/NavBar/indexfornecedores";
import VerificaOrdemCompra from "components/VerificaOrdemCompra";

const VerificaOrdemProdutosTela = () => {

    return (
        <>
            <NavBarFornecedor />

            <div className="container">
                <VerificaOrdemCompra />
            </div>
            <Footer />
        </>
    );
}

export default VerificaOrdemProdutosTela;