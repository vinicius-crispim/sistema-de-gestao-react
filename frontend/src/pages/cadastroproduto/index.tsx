import CadastroProduto from "components/CadastroProduto";
import Footer from "components/Footer";
import NavBar from "components/NavBar";



const CadastroProdutoTela = () => {
    return (
        <>
            <NavBar />
            <div>
                <div className="jumbotron d-grid col-9 mx-auto px-5">
                    <h1 className="display-4">Cadastre um Produto</h1><br />
                </div>
                <CadastroProduto />
            </div>
            <Footer />
        </>
    );
}

export default CadastroProdutoTela;