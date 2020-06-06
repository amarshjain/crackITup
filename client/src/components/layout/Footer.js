import React from 'react'
import {Link} from 'react-router-dom'

const Footer = props => {
    return (
        <div>
            <footer class="footer-distributed">

                <div class="footer-left">

                <p class="footer-links">
                    <Link to="/">Home</Link> ·
                    <Link to="/login">Login</Link> ·
                    <Link to="/exams">Exams</Link> ·
                    <Link to="/selections">Selections</Link> ·
                    <Link to="/myprofile">Profile</Link> ·
                </p>

                <p class="footer-company-name">Amarsh Jain &copy; 2020</p>
                </div>

                <div class="footer-center">

                <div>
                    <i class="fa fa-map-marker"></i>
                    <p><span>Jasper Hostel IIT(ISM)</span> Dhanbad, Jharkhand</p>
                </div>

                <div>
                    <i class="fa fa-phone"></i>
                    <p>+91-7894045499</p>
                </div>

                <div>
                    <i class="fa fa-envelope"></i>
                    <p><a href="mailto:support@company.com">support@crackitup.com</a></p>
                </div>

                </div>

                <div class="footer-right">

                <p class="footer-company-about">
                    <span>Social Media Links</span>
                </p>

                <div class="footer-icons">

                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-linkedin"></i></a>
                    <a href="#"><i class="fab fa-github"></i></a>

                </div>

                </div>

                </footer> 
        </div>
    )
}

export default Footer
