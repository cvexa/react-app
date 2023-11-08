import SubHeader from "./SubHeader.jsx";
import {Link} from "react-router-dom";

export default function Header() {
    return (<>
            <SubHeader />
            <header className="header-area header-sticky">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                <Link to={'/'} className="logo">
                                    <h1>React</h1>
                                </Link>
                                <ul className="nav">
                                    <li><Link to={'/'}>Home</Link></li>
                                    <li><a href="properties.html">Properties</a></li>
                                    <li><a href="property-details.html">Property Details</a></li>
                                    <li><a href="contact.html">Contact Us</a></li>
                                    <li><a href="#"><i className="fa fa-calendar"></i> Schedule a visit</a></li>
                                </ul>
                                <a className='menu-trigger'>
                                    <span>Menu</span>
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}