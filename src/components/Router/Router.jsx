import {Route, Routes,} from 'react-router-dom';
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx"
import Home from "../Home/Home.jsx";
import Dashboard from "../Admin/Dashboard/Dashboard.jsx";
import {useUserContext} from "../../contexts/User.jsx";
import Contacts from "../Contacts/Contacts.jsx";
import ListOfProperties from "../ListOfProperties/ListOfProperties.jsx";
import PublicLayout from "../PublicLayout/PublicLayout.jsx";
import AdminLayout from "../Admin/Layout/Layout";
import Users from "../Admin/Users/Users";
import Feedback from "../Admin/Feedback/Feedback.jsx";
import GenericNotFound from "../GenericNotFound/GenericNotFound.jsx";

export default function AppRouter(props) {
    const { user, setUser } = useUserContext();

    return (<Routes>
        <Route path={`${props.match}/`} exact element={<PublicLayout><Home/></PublicLayout>}/>
        <Route path={`${props.match}/login`} exact element={<PublicLayout><Login/></PublicLayout>}/> {/*//to do redirect if user is logged in*/}
        <Route path={`${props.match}/register`} exact element={<PublicLayout><Register/></PublicLayout>}/> {/*//to do redirect if user is logged in*/}
        <Route path={`${props.match}/contacts`} exact element={<PublicLayout><Contacts /></PublicLayout>}/>
        <Route path={`${props.match}/properties`} exact element={<PublicLayout><ListOfProperties /></PublicLayout>}/>
        <Route path={`${props.match}/dashboard`} exact element={user.id ? <AdminLayout><Dashboard/></AdminLayout> : <GenericNotFound />}/>
        <Route path={`${props.match}/users`} exact element={user.id ? <AdminLayout><Users/></AdminLayout> : <GenericNotFound />}/>
        <Route path={`${props.match}/feedback`} exact element={user.id ? <AdminLayout><Feedback/></AdminLayout> : <GenericNotFound />}/>
        <Route path="*" element={<GenericNotFound />} />
    </Routes>)
}