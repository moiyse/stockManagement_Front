import Header from "../front/Header";
import Footer from "../front/Footer";
import Login from "../commun/modals/login/Login";
const Layout = ({children}) => {
    return (<>
    <Header/>
    <Login/>
        {children}

    
    <Footer/>
    </>)
}

export default Layout;