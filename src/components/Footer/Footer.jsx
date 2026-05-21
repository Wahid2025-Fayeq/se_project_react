import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__left">Developed by: Wahid Fayeq</p>
        <p className="footer__right">{year}</p>
      </div>
    </footer>
  );
}

export default Footer;
