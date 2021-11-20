import CadastroProduto from "components/CadastroProduto";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import NavBarGerente from 'components/NavBar/indexgerente';



const CadastroProdutoTela = () => {
    let tipo = JSON.parse(localStorage.getItem('tipo') || '{}');
    if (tipo.tipo !== "Gerente") {
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
    }else{
    return (
        <>
            <NavBarGerente />
            <div>
                <div className="jumbotron d-grid col-9 mx-auto px-5">
                    <h1 className="display-4">Cadastre um Produto</h1><br />
                </div>
                <CadastroProduto />
            </div>
            <Footer />
        </>
    );}
}

export default CadastroProdutoTela;