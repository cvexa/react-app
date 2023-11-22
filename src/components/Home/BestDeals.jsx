import {useEffect, useState} from "react";
import {GetBestDealPropertyByTypes, GetPropertyTypes} from "../../services/properties.jsx";
import {useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import {CircularProgress} from "@mui/material";

export default function BestDeals() {
    const [propertyTypes, setPropertyTypes] = useState({});
    const [propertiesByType, setPropertiesByType] = useState([]);
    const [bestDeal, setBestDeal] = useState({});
    const navigate = useNavigate();

    useEffect( () => {
        try {
            GetPropertyTypes().then((res) => {
                if (!res.message) {
                    setPropertyTypes(res);
                } else {
                    throw new Error(res.message);
                }
            })
            GetBestDealPropertyByTypes('apartment').then(res => {
                setBestDeal(res);
            });
        } catch (e) {//to do what to do when error come in on home page
            navigate('/')
        }
    },[]);

    const handleTypeClick = (type) => {
        try {
            GetBestDealPropertyByTypes(type).then((res) => {
                if (!res.message) {
                        setBestDeal(res);
                } else {
                    throw new Error(res.message);
                }
            });
        } catch (e) {//to do what to do when error come in on home page
            navigate('/')
        }
    }

    return (
        <>
            <div className="fun-facts">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="wrapper">
                                <div className="row">
                                    <div className="col-lg-4">
                                        <div className="counter">
                                            <h2 className="timer count-title count-number" data-to="34"
                                                data-speed="1000"></h2>
                                            <p className="count-text ">Buildings<br/>Finished Now</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="counter">
                                            <h2 className="timer count-title count-number" data-to="12"
                                                data-speed="1000"></h2>
                                            <p className="count-text ">Years<br/>Experience</p>
                                        </div>
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="counter">
                                            <h2 className="timer count-title count-number" data-to="24"
                                                data-speed="1000"></h2>
                                            <p className="count-text ">Awwards<br/>Won 2023</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="section best-deal">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="section-heading">
                                <h6>| Best Deal</h6>
                                <h2>Find Your Best Deal Right Now!</h2>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="tabs-content">
                                <div className="row">
                                    <div className="nav-wrapper ">
                                        <ul className="nav nav-tabs" role="tablist">
                                            {propertyTypes.length > 0 ? propertyTypes.map( (prop, key) => {
                                                return <li key={key} className="nav-item" role="presentation">
                                                    <button className={
                                                        'nav-link active ' +
                                                        (bestDeal.id && bestDeal.type.toLowerCase().replace(/ /g, '') === prop.toLowerCase().replace(/ /g, '') ? 'show' : '')
                                                    }
                                                        id={prop.toLowerCase().replace(/ /g, '') + '-tab'}
                                                            data-bs-toggle="tab"
                                                            data-bs-target={'#' + prop.toLowerCase().replace(/ /g, '')} type="button" role="tab"
                                                            aria-controls={prop.toLowerCase().replace(/ /g, '')} aria-selected="true" onClick={ () => handleTypeClick(prop.toLowerCase())}>{prop}
                                                    </button>
                                                </li>
                                            }) :
                                                <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                                    <CircularProgress size={'10rem'}/>
                                                </Box>
                                            }
                                        </ul>
                                    </div>

                                    <div className="tab-content" id="myTabContent">
                                        {bestDeal.id > 0 ? (
                                             <div key={bestDeal.id} className="tab-pane fade show active" id={bestDeal.type.toLowerCase()} role="tabpanel"
                                                        aria-labelledby={bestDeal.type.toLowerCase().replace(/ /g, '')+'-tab'}>
                                                <div className="row">
                                                    <div className="col-lg-3">
                                                        <div className="info-table">
                                                            <ul>
                                                                <li>Total Flat Space <span>{bestDeal.quadrature} m2</span></li>
                                                                <li>Floor number <span>{bestDeal.floor_number}</span></li>
                                                                <li>Number of rooms <span>{bestDeal.number_of_rooms}</span></li>
                                                                <li>Parking Available <span>{bestDeal.with_parking ? 'yess' : 'no'}</span></li>
                                                                <li>Payment Process <span>{bestDeal.payment_process}</span></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-6">
                                                        <img src={bestDeal.pic} alt=""/>
                                                    </div>
                                                    <div className="col-lg-3">
                                                        <h4>Extra Info About Property</h4>
                                                        <p>
                                                            {bestDeal.description}
                                                        </p>
                                                        <div className="icon-button">
                                                            <a href="property-details.html"><i
                                                                className="fa fa-calendar"></i> Schedule a visit</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) :
                                            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                                                <CircularProgress size={'10rem'}/>
                                            </Box>
                                        }
                                        {/*<div className="tab-pane fade show active" id="appartment" role="tabpanel"*/}
                                        {/*     aria-labelledby="appartment-tab">*/}
                                        {/*    <div className="row">*/}
                                        {/*        <div className="col-lg-3">*/}
                                        {/*            <div className="info-table">*/}
                                        {/*                <ul>*/}
                                        {/*                    <li>Total Flat Space <span>185 m2</span></li>*/}
                                        {/*                    <li>Floor number <span>26th</span></li>*/}
                                        {/*                    <li>Number of rooms <span>4</span></li>*/}
                                        {/*                    <li>Parking Available <span>Yes</span></li>*/}
                                        {/*                    <li>Payment Process <span>Bank</span></li>*/}
                                        {/*                </ul>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col-lg-6">*/}
                                        {/*            <img src="assets/images/deal-01.jpg" alt=""/>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col-lg-3">*/}
                                        {/*            <h4>Extra Info About Property</h4>*/}
                                        {/*            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, do*/}
                                        {/*                eiusmod*/}
                                        {/*                tempor pack incididunt ut labore et dolore magna aliqua quised*/}
                                        {/*                ipsum*/}
                                        {/*                suspendisse.*/}
                                        {/*                <br/><br/>When you need free CSS templates, you can simply type*/}
                                        {/*                TemplateMo*/}
                                        {/*                in any search engine website. In addition, you can type*/}
                                        {/*                TemplateMo*/}
                                        {/*                Portfolio, TemplateMo One Page Layouts, etc.</p>*/}
                                        {/*            <div className="icon-button">*/}
                                        {/*                <a href="property-details.html"><i*/}
                                        {/*                    className="fa fa-calendar"></i> Schedule a visit</a>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="tab-pane fade" id="villa" role="tabpanel"*/}
                                        {/*     aria-labelledby="villa-tab">*/}
                                        {/*    <div className="row">*/}
                                        {/*        <div className="col-lg-3">*/}
                                        {/*            <div className="info-table">*/}
                                        {/*                <ul>*/}
                                        {/*                    <li>Total Flat Space <span>250 m2</span></li>*/}
                                        {/*                    <li>Floor number <span>26th</span></li>*/}
                                        {/*                    <li>Number of rooms <span>5</span></li>*/}
                                        {/*                    <li>Parking Available <span>Yes</span></li>*/}
                                        {/*                    <li>Payment Process <span>Bank</span></li>*/}
                                        {/*                </ul>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col-lg-6">*/}
                                        {/*            <img src="assets/images/deal-02.jpg" alt=""/>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col-lg-3">*/}
                                        {/*            <h4>Detail Info About Villa</h4>*/}
                                        {/*            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, do*/}
                                        {/*                eiusmod*/}
                                        {/*                tempor pack incididunt ut labore et dolore magna aliqua quised*/}
                                        {/*                ipsum*/}
                                        {/*                suspendisse. <br/><br/>Swag fanny pack lyft blog twee. JOMO*/}
                                        {/*                ethical copper*/}
                                        {/*                mug, succulents typewriter shaman DIY kitsch twee taiyaki fixie*/}
                                        {/*                hella venmo after messenger poutine next level humblebr/ag swag*/}
                                        {/*                franzen.</p>*/}
                                        {/*            <div className="icon-button">*/}
                                        {/*                <a href="property-details.html"><i*/}
                                        {/*                    className="fa fa-calendar"></i> Schedule a visit</a>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                        {/*<div className="tab-pane fade" id="penthouse" role="tabpanel"*/}
                                        {/*     aria-labelledby="penthouse-tab">*/}
                                        {/*    <div className="row">*/}
                                        {/*        <div className="col-lg-3">*/}
                                        {/*            <div className="info-table">*/}
                                        {/*                <ul>*/}
                                        {/*                    <li>Total Flat Space <span>320 m2</span></li>*/}
                                        {/*                    <li>Floor number <span>34th</span></li>*/}
                                        {/*                    <li>Number of rooms <span>6</span></li>*/}
                                        {/*                    <li>Parking Available <span>Yes</span></li>*/}
                                        {/*                    <li>Payment Process <span>Bank</span></li>*/}
                                        {/*                </ul>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col-lg-6">*/}
                                        {/*            <img src="assets/images/deal-03.jpg" alt=""/>*/}
                                        {/*        </div>*/}
                                        {/*        <div className="col-lg-3">*/}
                                        {/*            <h4>Extra Info About Penthouse</h4>*/}
                                        {/*            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, do*/}
                                        {/*                eiusmod*/}
                                        {/*                tempor pack incididunt ut labore et dolore magna aliqua quised*/}
                                        {/*                ipsum*/}
                                        {/*                suspendisse. <br/><br/>Swag fanny pack lyft blog twee. JOMO*/}
                                        {/*                ethical copper*/}
                                        {/*                mug, succulents typewriter shaman DIY kitsch twee taiyaki fixie*/}
                                        {/*                hella venmo after messenger poutine next level humblebr/ag swag*/}
                                        {/*                franzen.</p>*/}
                                        {/*            <div className="icon-button">*/}
                                        {/*                <a href="property-details.html"><i*/}
                                        {/*                    className="fa fa-calendar"></i> Schedule a visit</a>*/}
                                        {/*            </div>*/}
                                        {/*        </div>*/}
                                        {/*    </div>*/}
                                        {/*</div>*/}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}