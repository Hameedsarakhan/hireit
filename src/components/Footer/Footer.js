import React from 'react'; 
import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="footer-left">
              <div className="footer-logo">
                <img src="hireit logo.jpeg" alt="Logo" />
              </div>
              
              <div className="footer-links">
                <a href="/" className="text-decoration-none text-white">Home</a>
                <a href="/about" className="text-decoration-none text-white">About</a>
                <a href="/contact" className="text-decoration-none text-white">Contact</a>
              </div>
              <br />
              <div className="footer-contact">
                <p>Address: 123 Main St, Pakistan</p>
                <p>Email: hireit@gmail.com</p>
                <p>Phone: +123-456-7890</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="footer-right">
              <div className="social-icons">
                <a href="https://facebook.com" className="icon-link text-white"><i className="fab fa-facebook-square"></i></a>
                <a href="https://instagram.com" className="icon-link text-white"><i className="fab fa-instagram-square"></i></a>
                <a href="https://twitter.com" className="icon-link text-white"><i className="fab fa-twitter-square"></i></a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="footer-copyright text-center">
              <p className="footerpara m-0">&copy; {new Date().getFullYear()} HIREIT. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
