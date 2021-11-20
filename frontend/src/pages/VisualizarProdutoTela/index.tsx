import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import VisualizarProduto from '../../components/VisualizarProduto/index';
import NavBarGerente from 'components/NavBar/indexgerente';
const VisualizarProdutoTela = () => {
    let tipo = JSON.parse(localStorage.getItem('tipo') || '{}');
    if (tipo.tipo !== "Gerente") {
        return (
            <>
                <NavBar />

                <div className="container">
                    <VisualizarProduto />
                </div>
                <Footer />
            </>
        );
    } else {
        return (
            <>
                <NavBarGerente />

                <div className="container">
                    <VisualizarProduto />
                </div>
                <Footer />
            </>)}
}

    export default VisualizarProdutoTela;