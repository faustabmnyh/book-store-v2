import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer container">
        <h3 className="footer__title">Mr. Book</h3>
        <div className="footer__container">
          <div className="footer__inner">
            <a href="!#">About mgBooks</a>
            <a href="!#">About Attribute</a>
            <a href="!#">Help Center</a>
            <a href="!#">Jobs</a>
          </div>
          <div className="footer__inner">
            <a href="!#">Account</a>
            <a href="!#">Terms of Buy</a>
            <a href="!#">Contact Us</a>
          </div>
          <div className="footer__inner">
            <a href="!#">Account</a>
            <a href="!#">Terms of Buy</a>
            <a href="!#">Contact Us</a>
          </div>
          <div className="footer__inner">
            <a href="!#">Account</a>
            <a href="!#">Terms of Buy</a>
            <a href="!#">Contact Us</a>
          </div>
          {/* <div className="footer__inner">
            <div className="footer__logo">
              <img src="/images/pictures/logo.svg" alt="" />
              <span>MR. BOOK</span>
            </div>
          </div> */}
        </div>
        <p className="footer__botAlone">© 2022 Mr.book</p>
      </div>
    </footer>
  );
};

export default Footer;
