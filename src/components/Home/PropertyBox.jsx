import {Link} from "react-router-dom";
import React from "react";

export default function PropertyBox ({property}) {
    return (
        <div className="col-lg-4 col-md-6">
            <div className="item" style={{minHeight: '510px'}}>
                <Link to={`/property/${property.id}`}><img style={{maxHeight: '148px'}} src={property.pic ?? 'assets/images/property-01.jpg'}
                                                     alt=""/></Link>
                <span className="category" style={{textTransform: 'capitalize'}}>{property.type}</span>
                <h6>${property.price}</h6>
                <h4><a href="property-details.html">{property.title}</a></h4>
                <ul>
                    <li>Safety: <span>{property.safety}</span></li> <br/>
                    <li>Number of rooms: <span>{property.number_of_rooms}</span></li><br/>
                    <li>Area: <span>{property.quadrature}m2</span></li><br/>
                    <li>Floor: <span>{property.floor_number}</span></li><br/>
                    <li>Parking: <span>{property.with_parking === 1 ? 'yes' : 'no'}</span></li><br/>
                </ul>
                <div className="main-button">
                    <Link to={`/property/${property.id}`}>view more</Link>
                </div>
            </div>
        </div>
    );
}