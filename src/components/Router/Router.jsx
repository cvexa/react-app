import {Route, Routes,} from 'react-router-dom';
import Login from "../Login/Login.jsx";
import Home from "../Home/Home.jsx";
import Dashboard from "../Admin/Dashboard/Dashboard.jsx";
import {useUserContext} from "../../contexts/User.jsx";

export default function AppRouter(props) {
    const { user, setUser } = useUserContext();

    return (<Routes>
        <Route path={`${props.match}/`} exact element={<Home/>}/>
        <Route path={`${props.match}/login`} exact element={<Login/>}/>
        <Route path={`${props.match}/dashboard`} exact element={user.id ? <Dashboard/> : 'not found'}/>
    </Routes>)
}