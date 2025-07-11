function Inicio() {
  return (
    <section id="inicio" className="hero section light-background">
      <div className="container">
        <div className="row gy-4 justify-content-center justify-content-lg-between">
          <div className="col-lg-5 order-2 order-lg-1 d-flex flex-column justify-content-center">
            <h1 data-aos="fade-up">Delícias Artesanais<br />Feitas com Amor</h1>
            <p data-aos="fade-up" data-aos-delay="100">
              Descubra o verdadeiro sabor de uma padaria que une qualidade, frescor e um toque de carinho em cada receita.
            </p>
            <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
              <a href="#cardapio" className="btn-get-started">Nosso Cardápio</a>
            </div>
          </div>
          <div className="col-lg-5 order-1 order-lg-2 hero-img" data-aos="zoom-out">
            <img
              src="/assets/img/padaria-inicial.jpg"
              className="img-fluid animated rounded-circle"
              alt="Foto de mãos segurando um pão artesanal"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Inicio;
