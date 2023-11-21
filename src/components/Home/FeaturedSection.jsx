import React from "react";
import styles from './FeaturedSection.module.css';
import {useEffect, useState} from "react";
import {GetFeatured} from "../../services/properties.jsx";
import {useNavigate, Link} from "react-router-dom";
import {CircularProgress} from "@mui/material";
import Box from "@mui/material/Box";

export default function FeaturedSection() {
    const [featuredProperty, setFeaturedProperty] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        try {
            GetFeatured().then((res) => {
                if (!res.message) {
                    setFeaturedProperty(res);
                } else {
                    throw new Error(res.message);
                }
            });
        } catch (e) {//to do what to do when error come in on home page
            navigate('/')
        }
    }, []);
    return (
        <div className="featured section">
            <div className="container">
                {featuredProperty ?
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="left-image">
                                <img src={featuredProperty.pic} alt="photo"/>
                                <Link to={'/'}><img src="assets/images/featured-icon.png"
                                                                     className={styles.featMainIco} alt=""/></Link>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="section-heading">
                                <h6>| Featured</h6>
                                <h2>{featuredProperty.title}</h2>
                            </div>
                            <div className="accordion" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button" type="button" data-bs-toggle="collapse"
                                                data-bs-target="#collapseOne" aria-expanded="true"
                                                aria-controls="collapseOne">
                                            Best useful links ?
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse show"
                                         aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Get <strong>the best villa</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                                aria-expanded="false" aria-controls="collapseTwo">
                                            How does this work ?
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse"
                                         aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Dolor <strong>almesit amet</strong>, consectetur adipiscing elit, sed
                                            doesn't
                                            eiusmod tempor incididunt ut labore
                                            consectetur <code>adipiscing</code> elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button"
                                                data-bs-toggle="collapse" data-bs-target="#collapseThree"
                                                aria-expanded="false" aria-controls="collapseThree">
                                            Why is Villa Agency the best ?
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse"
                                         aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Dolor <strong>almesit amet</strong>, consectetur adipiscing elit, sed
                                            doesn't
                                            eiusmod tempor incididunt ut labore
                                            consectetur <code>adipiscing</code> elit,
                                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="info-table">
                                <ul>
                                    <li>
                                        <img src="assets/images/info-icon-01.png" className={styles.featIco} alt=""/>
                                        <h4>{featuredProperty.quadrature}<br/><span>Total </span></h4>
                                    </li>
                                    <li>
                                        <img src="assets/images/info-icon-02.png" className={styles.featIco} alt=""/>
                                        <h4>Contract<br/><span>{featuredProperty.contract}</span></h4>
                                    </li>
                                    <li>
                                        <img src="assets/images/info-icon-03.png" className={styles.featIco} alt=""/>
                                        <h4>Payment<br/><span>{featuredProperty.payment_process}</span></h4>
                                    </li>
                                    <li>
                                        <img src="assets/images/info-icon-04.png" className={styles.featIco} alt=""/>
                                        <h4>Safety<br/><span>{featuredProperty.safety}</span></h4>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    :
                    <Box sx={{display: 'flex', justifyContent: 'center'}}>
                        <CircularProgress size={'10rem'}/>
                    </Box>
                }
            </div>
        </div>
    );
}