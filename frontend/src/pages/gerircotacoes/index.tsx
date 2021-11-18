import Footer from "components/Footer";
import NavBar from "components/NavBar";
import GerirCotacoes from '../../components/GerirCotacoes/index';

const GerirCotacoesTela = () => {

    return (
        <>
            <NavBar />

            <div className="container">
                <GerirCotacoes />
            </div>
            <Footer />
        </>
    );
}

export default GerirCotacoesTela;