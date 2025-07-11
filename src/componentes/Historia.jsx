function Historia() {
  return (
    <section id="sobre" className="about section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Nossa história</h2>
        <p><span>Saiba mais</span> <span className="description-title">Sobre nós</span></p>
      </div>

      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-7" data-aos="fade-up" data-aos-delay="100">
            <img
              src="/assets/img/about.jpg"
              className="img-fluid mb-4"
              alt="Foto do balcão da padaria, com pães e doces"
            />
            <div className="book-a-table">
              <h3>Reserve uma mesa</h3>
              <p>85 9 1234-1234</p>
            </div>
          </div>
          <div className="col-lg-5" data-aos="fade-up" data-aos-delay="250">
            <div className="content ps-0 ps-lg-5">
              <p className="fst-italic">
                Tradição de 10 anos oferecendo pães, doces e salgados frescos e de qualidade.
              </p>
              <ul>
                <li>
                  <i className="bi bi-check-circle-fill"></i>{' '}
                  <span>Todos preparados com ingredientes de qualidade e carinho.</span>
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>{' '}
                  <span>Ambiente acolhedor que faz da Doce Sabor um lugar querido por todos.</span>
                </li>
                <li>
                  <i className="bi bi-check-circle-fill"></i>{' '}
                  <span>Atendimento personalizado e caloroso, que faz com que cada cliente se sinta parte da história da padaria e volte sempre para mais um saboroso momento.</span>
                </li>
              </ul>
              <p>
                A Padaria Doce Sabor foi fundada há 10 anos e, ao longo do tempo, se tornou um ponto de referência no bairro. Entre os itens mais populares estão os carioquinhas e os bolos. A padaria mantém a tradição de oferecer produtos frescos todos os dias, com um atendimento acolhedor. Hoje, a Doce Sabor é um lugar querido, onde o sabor e a confiança se encontram a cada visita.
              </p>
              <div className="imgOndeEraVideo">
                <img
                  src="/assets/img/pexels-photo-914390.png"
                  alt="Fotos do local da padaria, mesas com vista pro mar"
                  width="500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Historia;
