import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <h3 className="footer__title">mgBooks</h3>
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
            <img alt="mgBooks" src="/images/pictures/store.png" />
          </div>
        </div>
        <p className="footer__botAlone">mgBooks Indonesia</p>
      </div>
    </footer>
  );
};

export default Footer;
