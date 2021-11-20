import CadastroFuncionario from "components/CadastroFuncionario";
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import NavBarGerente from 'components/NavBar/indexgerente';

const CadastrarFuncionario = () =>{
    return (
        <>
        <NavBarGerente />
        <div className="container">
              <CadastroFuncionario />    
        </div>
        <Footer />
      </>
    );
}

export default CadastrarFuncionario;