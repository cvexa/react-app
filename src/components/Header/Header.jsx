import SubHeader from "./SubHeader.jsx";
import {Link, NavLink} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Header() {
    const defaultHeaderClass = 'header-area header-sticky';
    const [headerClass, setHeaderClass] = useState(defaultHeaderClass)

    useEffect(() => {
        const updatePosition = () => {
            let position = Math.floor(window.scrollY);
            if(position > 100) {
                setHeaderClass(defaultHeaderClass + ' background-header')
            }
            if(position < 120) {
                setHeaderClass(defaultHeaderClass);
            }
        }

        window.addEventListener('scroll', updatePosition)

        updatePosition()

        return () => window.removeEventListener('scroll', updatePosition)
    }, []);


    return (<>
            <SubHeader />
            <header className={headerClass}>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <nav className="main-nav">
                                <Link to={'/'} className="logo">
                                    <h1>React</h1>
                                </Link>
                                <ul className="nav">
                                    <li><NavLink to={'/'} className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
                                    <li><a href="properties.html">Properties</a></li>
                                    <li><a href="property-details.html">Property Details</a></li>
                                    <li><NavLink to={'/contacts'} className={({ isActive }) => isActive ? "active" : ""}>Contact Us</NavLink></li>
                                    <li><NavLink to={'/login'} className={({ isActive }) => isActive ? "active" : ""}>Login</NavLink></li>
                                    <li><NavLink to={'/register'} className={({ isActive }) => isActive ? "active" : ""}>Register</NavLink></li>
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