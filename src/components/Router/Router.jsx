import {Route, Routes,} from 'react-router-dom';
import Login from "../Login/Login.jsx";
import Home from "../Home/Home.jsx";

export default function AppRouter(props) {
    return (<Routes>
        <Route path={`${props.match}/`} exact element={<Home/>}/>
        <Route path={`${props.match}/login`} exact element={<Login/>}/>
    </Routes>)
}