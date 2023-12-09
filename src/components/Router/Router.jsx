import {Route, Routes,} from 'react-router-dom';
import Login from "../Login/Login.jsx";
import Register from "../Register/Register.jsx"
import Home from "../Home/Home.jsx";
import Dashboard from "../Admin/Dashboard/Dashboard.jsx";
import Contacts from "../Contacts/Contacts.jsx";
import ListOfProperties from "../ListOfProperties/ListOfProperties.jsx";
import PublicLayout from "../PublicLayout/PublicLayout.jsx";
import AdminLayout from "../Admin/Layout/Layout";
import Users from "../Admin/Users/Users";
import GenericNotFound from "../GenericNotFound/GenericNotFound.jsx";
import SingleProperty from "../SingleProperty/SingleProperty.jsx";
import AuthGuard from "../../guards/AuthGuard.jsx";
import Profile from "../Profile/Profile.jsx";

export default function AppRouter(props) {

    return (<Routes>
        <Route path={`${props.match}/`} exact element={<PublicLayout><Home/></PublicLayout>}/>
        <Route path={`${props.match}/login`} exact element={<PublicLayout><Login/></PublicLayout>}/>
        <Route path={`${props.match}/register`} exact element={<PublicLayout><Register/></PublicLayout>}/>
        <Route path={`${props.match}/contacts`} exact element={<PublicLayout><Contacts/></PublicLayout>}/>
        <Route path={`${props.match}/properties`} exact element={<PublicLayout><ListOfProperties/></PublicLayout>}/>
        <Route path={`${props.match}/property/:id`} exact element={<PublicLayout><SingleProperty/></PublicLayout>}/>
        <Route element={<AuthGuard />}>
                <Route path={`${props.match}/dashboard`} exact element={<AdminLayout><Dashboard/></AdminLayout>}/>
                <Route path={`${props.match}/users`} exact element={<AdminLayout><Users/></AdminLayout>}/>
                <Route path={`${props.match}/my-profile`} exact element={<AdminLayout><Profile/></AdminLayout>}/>
        </Route>
        <Route path="*" element={<GenericNotFound />} />
    </Routes>)
}