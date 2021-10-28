import Footer from 'components/Footer';
import NavBar from 'components/NavBar';
import VisualizarProduto from '../../components/VisualizarProduto/index';
const VisualizarProdutoTela = () => {

    return (
        <>
            <NavBar />

            <div className="container">
                <VisualizarProduto />
            </div>
            <Footer />
        </>
    );
}

export default VisualizarProdutoTela;