import styles from './Contacts.module.css';

export default function Contacts() {
    return (
        <div className="contact-page section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="section-heading">
                            <h6>| Contact Us</h6>
                            <h2>Get In Touch With Our Agents</h2>
                        </div>
                        <p>When you really need to download free CSS templates, please remember our website TemplateMo.
                            Also, tell your friends about our website. Thank you for visiting. There is a variety of
                            Bootstrap HTML CSS templates on our website. If you need more information, please contact
                            us.</p>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="item phone">
                                    <img src="assets/images/phone-icon.png" alt="" className={styles.Ico}/>
                                        <h6>010-020-0340<br/><span>Phone Number</span></h6>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="item email">
                                    <img src="assets/images/email-icon.png" alt="" className={styles.Ico}/>
                                        <h6>info@villa.co<br/><span>Business Email</span></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <form id="contact-form" action="" method="post">
                            <div className="row">
                                <div className="col-lg-12">
                                    <fieldset>
                                        <label htmlFor="name">Full Name</label>
                                        <input type="name" name="name" id="name" placeholder="Your Name..."
                                               autoComplete="on"  />
                                    </fieldset>
                                </div>
                                <div className="col-lg-12">
                                    <fieldset>
                                        <label htmlFor="email">Email Address</label>
                                        <input type="text" name="email" id="email" pattern="[^ @]*@[^ @]*"
                                               placeholder="Your E-mail..." />
                                    </fieldset>
                                </div>
                                <div className="col-lg-12">
                                    <fieldset>
                                        <label htmlFor="subject">Subject</label>
                                        <input type="subject" name="subject" id="subject" placeholder="Subject..."
                                               autoComplete="on" />
                                    </fieldset>
                                </div>
                                <div className="col-lg-12">
                                    <fieldset>
                                        <label htmlFor="message">Message</label>
                                        <textarea name="message" id="message" placeholder="Your Message"></textarea>
                                    </fieldset>
                                </div>
                                <div className="col-lg-12">
                                    <fieldset>
                                        <button type="submit" id="form-submit" className="orange-button">Send Message
                                        </button>
                                    </fieldset>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-lg-12">
                        <div id="map">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23264.79148343807!2d23.52871447366603!3d43.207414182471695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40ab165d222faba7%3A0x400a01269bf5d40!2z0JLRgNCw0YbQsA!5e0!3m2!1sbg!2sbg!4v1699950047547!5m2!1sbg!2sbg"
                                width="100%" height="500px" frameBorder="0" loading="lazy"
                                className={styles.map}
                                allowFullScreen=""></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}