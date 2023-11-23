import styles from './Contacts.module.css';
import {useState} from "react";
import {Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Contacts() {
    const [fakeSubmit, setFakesubmit] = useState(false);
    return (
        <div className="contact-page section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="section-heading">
                            <h6>| Contact Us</h6>
                            <h2>Get In Touch With Our Agents</h2>
                        </div>
                        <p>
                            Nam iaculis, turpis non condimentum gravida, neque ex consequat mauris, in ultrices arcu felis at justo.
                            Duis lacinia ultricies vehicula. Maecenas sollicitudin, nulla vel pellentesque elementum, justo diam elementum leo, at placerat urna nulla in augue.
                            Integer pellentesque nisi eu ante ornare, vel laoreet nulla ultricies. Integer sed dui porttitor, tincidunt magna ut, dapibus libero. Donec faucibus ullamcorper scelerisque.
                        </p>
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
                                    <h6>svetoslav.vasilev<br/>@volasoftware.com<br/><span style={{marginLeft:"35%"}}>Business Email</span></h6>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        {!fakeSubmit ?
                            <form id="contact-form" action="" method="post">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <label htmlFor="name">Full Name</label>
                                            <input type="name" name="name" id="name" placeholder="Your Name..."
                                                   autoComplete="on"/>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <label htmlFor="email">Email Address</label>
                                            <input type="text" name="email" id="email" pattern="[^ @]*@[^ @]*"
                                                   placeholder="Your E-mail..."/>
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12">
                                        <fieldset>
                                            <label htmlFor="subject">Subject</label>
                                            <input type="subject" name="subject" id="subject" placeholder="Subject..."
                                                   autoComplete="on"/>
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
                                            <button type="submit" id="form-submit" className="orange-button"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setFakesubmit(true);
                                                    }}>Send Message
                                            </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </form>
                        :
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.success" gutterBottom>
                                        Thank you for contacting us! <br/>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec gravida id mi a venenatis. Ut elementum nec leo sit amet dignissim.
                                            Nullam nibh enim, eleifend sed enim vitae, elementum laoreet sapien. Curabitur venenatis dui sodales tortor tincidunt, at condimentum est accumsan.
                                            Integer urna urna, mollis in nisl vitae, laoreet malesuada nunc. Morbi viverra turpis quis massa auctor, et pharetra nulla faucibus. Aliquam erat volutpat.
                                            Nam sed lacinia sapien. Fusce id odio convallis, ultrices metus nec, rhoncus odio. Nulla eget ipsum porttitor, elementum metus id, faucibus neque.
                                            Nam porta, ipsum non maximus sagittis, lacus ligula cursus metus, in viverra sem leo eu ante. Nullam vehicula enim sit amet consequat ultrices. Nunc a pulvinar ipsum, ornare dictum nisl. Morbi ullamcorper eu odio at mattis.
                                            Cras ac ex a enim mollis lacinia.
                                        </p>
                                    </Typography>
                                </CardContent>
                            </Card>
                        }
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