function Footer() {
  return (
    <footer id="footer" className="footer dark-background">
      <div className="container">
        <div className="row gy-3">
          <div className="col-lg-3 col-md-6 d-flex">
            <i className="bi bi-geo-alt icon"></i>
            <div>
              <h4>Endereço</h4>
              <p>Rua da praia, 9999 - Praia</p>
              <p>Fortaleza - CE</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex">
            <i className="bi bi-telephone icon"></i>
            <div>
              <h4>Contato</h4>
              <p>
                <strong>Telefone:</strong> <span>85 9 1234-1234</span><br />
                <strong>Email:</strong> <span>docesabor@padaria.com</span>
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 d-flex">
            <i className="bi bi-clock icon"></i>
            <div>
              <h4>Horário de funcionamento</h4>
              <p>
                <strong>Seg-Sab :</strong> <span>07:00 - 20:00</span><br />
                <strong>Dom:</strong> <span>07:00 - 14:00</span>
              </p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <h4>Acompanhe nossas redes</h4>
            <div className="social-links d-flex">
              <a href="#footer" className="twitter">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#footer" className="facebook">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#footer" className="instagram">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>
          © <span>Copyright</span>{" "}
          <strong className="px-1 sitename">Yummy</strong>{" "}
          <span>All Rights Reserved</span>
        </p>
        <div className="credits">
          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a> Distributed by{" "}
          <a href="https://themewagon.com">ThemeWagon</a>
        </div>
      </div>

      <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short"></i>
      </a>

      <div id="preloader"></div>
    </footer>
  );
}

export default Footer;
