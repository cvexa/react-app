import {Link} from "react-router-dom";
import {useUserContext} from "../../contexts/User.jsx";

export default function SubHeader() {
    const { user, setUser } = useUserContext();

    return (
        <div className="sub-header">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-8">
                        <ul className="info">
                            <li><i className="fa fa-envelope"></i> svetoslav.vasilev@volasoftware.com</li>
                            <li><i className="fa fa-map"></i>Vratsa, Bulgaria</li>
                        </ul>
                    </div>
                    {!user.token &&
                        <div className="col-lg-4 col-md-4">
                            <ul className="social-links">
                                <li><Link title="Login" to={'/login'}><i className="fa-solid fa-arrow-right-to-bracket"></i></Link></li>
                                <li><Link title="Register" to={'/register'}><i className="fa-solid fa-address-card"></i></Link></li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}