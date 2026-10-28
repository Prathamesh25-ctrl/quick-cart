import React from 'react'
import "./Footer.css"
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';
function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-box">
                    <h3>About Us</h3>
                    <p>
                        We provide the best product and Best services with best Technology and
                        affordable price.
                    </p>
                </div>
                <div className="footer-box">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>
                           <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/product">Product</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-box">
                    <h3>Contact</h3>
                    <p>Email: info@gmail.com</p>
                    <p>Phone: +91 </p>
                    <p>Phone: +91 000000000</p>
                    <p></p>
                    <p>Location: Mumbai, India</p>
                </div>
                <div className='Logo flex gap-5 flex-col text-xl'>
                <FaFacebook />
                <FaInstagram />
                <FaSquareXTwitter />
            </div>
            </div>
            
            <div className="footer-bottom">
                <p>© 2026 All Rights Reserved | Your Website</p>
            </div>
            
        </footer>

    )
}

export default Footer