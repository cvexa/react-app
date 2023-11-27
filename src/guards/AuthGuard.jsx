import {Outlet} from "react-router-dom";
import {useUserContext} from "../contexts/User.jsx";
import GenericNotFound from "../components/GenericNotFound/GenericNotFound.jsx";

export default function AuthGuard(props) {
    const { user, setUser } = useUserContext();

    if(!user.id) {
        return <GenericNotFound />;
    }

    return <Outlet />;
}