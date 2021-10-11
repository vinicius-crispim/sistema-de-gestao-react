import EstoqueTable from "components/EstoqueTable";
import Footer from "components/Footer";
import NavBar from "components/NavBar";

const Estoque = () =>{
    return (
        <>
        <NavBar />
        <div className="container">
          <h1 className="text-primary py-3 text-center">Verifique os produtos que temos em estoque, em ordem decrescente do quanto temos em estoque</h1>
          <div className="row px-3">
            <div className="col-xxl-6">
              <h5 className="text-center text-secondary">Estoque</h5>
              <EstoqueTable />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
}

export default Estoque;