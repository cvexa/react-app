// import "./App.css";
import AppRouter from "./components/Router/Router.jsx";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer.jsx";
import {UserProvider} from "./contexts/User.jsx";

function App() {
    return (
        <BrowserRouter>
            {/*TO DO add header and footer only for the public part*/}
            <UserProvider>
                <Header />
                    <AppRouter match={import.meta.env.BASE_URL}/>
                <Footer/>
            </UserProvider>
        </BrowserRouter>
    )
}

export default App
