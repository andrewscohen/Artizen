import "./Footer.css";

const Footer = ({ bottomOfPage }) => {
  return (
    <div className="footer" id={bottomOfPage ? "bottom-footer" : ""}>
      <div className="footer-section">
        <p>Andrew Cohen</p>
        <a href="https://github.com/andrewscohen" target="_new">
          <i className="fab fa-github" />
        </a>
        <a href="https://www.linkedin.com/in/mrandrewcohen/" target="_new">
          <i className="fab fa-linkedin" />
        </a>
      </div>
      <div className="footer-section">
        <p>Austin Howard</p>
        <a href="https://github.com/Austin-from-TX" target="_new">
          <i className="fab fa-github" />
        </a>
        <a href="https://www.linkedin.com/in/stevenaustinhoward/" target="_new">
          <i className="fab fa-linkedin" />
        </a>
      </div>
      <div className="footer-section">
        <p>Matt Kufchak</p>
        <a href="https://github.com/cellomatt" target="_new">
          <i className="fab fa-github" />
        </a>
        <a href="https://www.linkedin.com/in/mattkufchak/" target="_new">
          <i className="fab fa-linkedin" />
        </a>
      </div>
      <div className="footer-section">
        <p>Rob Daraban</p>
        <a href="https://github.com/darabandev" target="_new">
          <i className="fab fa-github" />
        </a>
        <a href="https://www.linkedin.com/in/robertdaraban/" target="_new">
          <i className="fab fa-linkedin" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
