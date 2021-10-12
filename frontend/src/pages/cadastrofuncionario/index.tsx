import CadastroFuncionario from "components/CadastroFuncionario";
import Footer from "components/Footer";
import NavBar from "components/NavBar";

const CadastrarFuncionario = () =>{
    return (
        <>
        <NavBar />
        <div className="container">
              <CadastroFuncionario />    
        </div>
        <Footer />
      </>
    );
}

export default CadastrarFuncionario;