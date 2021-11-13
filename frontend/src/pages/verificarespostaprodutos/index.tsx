import Footer from "components/Footer";
import Navbar from "components/NavBar/index";
import VerificaRespostaProdutos from "components/VerificaRespostaProdutos";

const VerificaRespostaProdutosTela = () => {

    return (
        <>
            <Navbar />

            <div className="container">
                <VerificaRespostaProdutos />
            </div>
            <Footer />
        </>
    );
}

export default VerificaRespostaProdutosTela;