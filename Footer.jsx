import React from 'react';
import './Footer.css';
import leftside from '../assets/footerlogo.png'; // Import the image

function Footer() {
    return (
        <footer className="footer">
            <img src={leftside} alt="Company Logo" className="footer-logo" />
            <h5>Sofgen Computer Consultants (P) Ltd.</h5>
            <h5>Contact: 0124-4250521, 4301825, 4373116, +91-92120-11919</h5>
            <h5>Email: sofgenteam23@gmail.com; Sofgen@gmail.com; info@sofgen.org</h5>
        </footer>
    );
}

export default Footer;
