import Footer from "components/Footer";
import LoginUser from "components/Login";
import NavBar from "components/NavBar";

const Login = () => {
    return (
        <>
            <NavBar />
            <div >
               <LoginUser/>
            </div>
            <Footer />
        </>
    );
}

export default Login;