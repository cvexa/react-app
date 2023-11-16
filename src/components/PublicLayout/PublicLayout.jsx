import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer";

export default function PublicLayout(props) {
    return (
        <>
            <Header />
            {props.children}
            <Footer />
        </>
    );
}