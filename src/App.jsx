import "./App.css";
import AppRouter from "./components/Router/Router.jsx";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <AppRouter match={import.meta.env.BASE_URL}/>
        </BrowserRouter>
    )
}

export default App
