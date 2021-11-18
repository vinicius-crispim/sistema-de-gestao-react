import Footer from "components/Footer";

import CadastroCategoria from "components/CadastroCategoria";
import NavBar from "components/NavBar";

const CadastroCategoriaTela = () => {

    return (
        <>
            <NavBar />

            <div className="container">
                <CadastroCategoria />
            </div>
            <Footer />
        </>
    );
}

export default CadastroCategoriaTela;