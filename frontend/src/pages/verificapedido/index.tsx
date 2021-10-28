import Footer from "components/Footer";
import FornecedorResposta from "components/FornecedorResposta";
import NavBar from "components/NavBar";
import NavBarFornecedor from "components/NavBar/indexfornecedores";
import VerificaPedido from "components/VerificaPedidos";
import RespostaTela from "pages/respostafornecedor";

const VerificaPedidoTela = () => {

    return (
        <>
            <NavBarFornecedor />

            <div className="container">
                <VerificaPedido />
            </div>
            <Footer />
        </>
    );
}

export default VerificaPedidoTela;