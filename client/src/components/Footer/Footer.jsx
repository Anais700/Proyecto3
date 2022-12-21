import React from "react";
import {FiFacebook} from "react-icons/fi"
import {FaWhatsapp} from "react-icons/fa"

const Footer = () => {
    return(
        <div className="foot">
            <footer className="icon">
                <div>
                    <a className="face" href="https://www.facebook.com/profile.php?id=100063116985379">
                        <FiFacebook/>
                    </a>
                </div>
                <div className="number">
                    <a className="whats" href={"https://wa.me/5214432577594"}>
                        <FaWhatsapp/>
                    </a>
                </div>
            </footer>
        </div>
    )
}
export default Footer;