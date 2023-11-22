import React from "react";
import styles from './FeaturedSection.module.css';

export default function PropertyInfoSideBar({property}) {
    return (
        <div className="info-table">
            <ul>
                <li>
                    <img src="/assets/images/info-icon-01.png" className={styles.featIco} alt=""/>
                    <h4>{property.quadrature}<br/><span>Total Flat Space </span></h4>
                </li>
                <li>
                    <img src="/assets/images/info-icon-02.png" className={styles.featIco} alt=""/>
                    <h4>Contract<br/><span>{property.contract}</span></h4>
                </li>
                <li>
                    <img src="/assets/images/info-icon-03.png" className={styles.featIco} alt=""/>
                    <h4>Payment<br/><span>{property.payment_process}</span></h4>
                </li>
                <li>
                    <img src="/assets/images/info-icon-04.png" className={styles.featIco} alt=""/>
                    <h4>Safety<br/><span>{property.safety}</span></h4>
                </li>
            </ul>
        </div>
    );
}