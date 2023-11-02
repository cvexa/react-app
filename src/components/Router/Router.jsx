import {Route, Routes,} from 'react-router-dom';
import Login from "../Login/Login.jsx";


export default function AppRouter(props) {
    return (<Routes>
        <Route path={`${props.match}/`} exact element={<Login/>}/>
        <Route path={`${props.match}/home`} exact element={<Login/>}/>
    </Routes>)
}