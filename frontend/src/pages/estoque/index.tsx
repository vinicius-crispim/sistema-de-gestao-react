import EstoqueTable from "components/EstoqueTable";
import Footer from "components/Footer";
import NavBar from "components/NavBar";

const Estoque = () =>{
    return (
        <>
        <NavBar />
        <div className="container">
          <h2 className=" text-center col-12">Verifique o que temos em estoque, em ordem decrescente do quanto temos</h2>
          <div className="row py-1 px-3">
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