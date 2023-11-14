import {Route, Routes,} from 'react-router-dom';
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx"
import Home from "../Home/Home.jsx";
import Dashboard from "../Admin/Dashboard/Dashboard.jsx";
import {useUserContext} from "../../contexts/User.jsx";
import Contacts from "../Contacts/Contacts.jsx";
import ListOfProperties from "../ListOfProperties/ListOfProperties.jsx";

export default function AppRouter(props) {
    const { user, setUser } = useUserContext();

    return (<Routes>
        <Route path={`${props.match}/`} exact element={<Home/>}/>
        <Route path={`${props.match}/login`} exact element={<Login/>}/>
        <Route path={`${props.match}/register`} exact element={<Register/>}/>
        <Route path={`${props.match}/dashboard`} exact element={<Dashboard/>}/>
        <Route path={`${props.match}/contacts`} exact element={<Contacts />}/>
        <Route path={`${props.match}/properties`} exact element={<ListOfProperties />}/>
    </Routes>)
}