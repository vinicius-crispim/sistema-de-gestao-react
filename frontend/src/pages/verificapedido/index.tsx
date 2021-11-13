import Footer from "components/Footer";
import NavBarFornecedor from "components/NavBar/indexfornecedores";
import VerificaPedido from "components/VerificaPedidos";

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