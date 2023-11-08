// import "./App.css";
import AppRouter from "./components/Router/Router.jsx";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer.jsx";

function App() {
    return (
        <BrowserRouter>
            <Header />
                <AppRouter match={import.meta.env.BASE_URL}/>
            <Footer/>
        </BrowserRouter>
    )
}

export default App
