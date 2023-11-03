// import "./App.css";
import AppRouter from "./components/Router/Router.jsx";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header/Header";

function App() {
    return (
        <BrowserRouter>
            <Header />
            <AppRouter match={import.meta.env.BASE_URL}/>
        </BrowserRouter>
    )
}

export default App
