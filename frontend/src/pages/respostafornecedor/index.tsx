import Footer from "components/Footer";
import FornecedorResposta from "components/FornecedorResposta";
import NavBar from "components/NavBar";

const RespostaTela = () => {

    return (
        <>
            <NavBar />

            <div className="container">
                <FornecedorResposta />
            </div>
            <Footer />
        </>
    );
}

export default RespostaTela;