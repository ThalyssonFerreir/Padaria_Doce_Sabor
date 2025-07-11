import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

function Testimonials() {
  const testimonials = [
    {
      name: 'José Carlos',
      text: 'O melhor pão carioquinha da região! Sempre quentinho e crocante. Atendimento excelente!',
      img: '/assets/img/testimonials/testimonials-1.jpg'
    },
    {
      name: 'Jessica Moreira',
      text: 'Os doces são simplesmente deliciosos. A torta de maçã é minha favorita!',
      img: '/assets/img/testimonials/testimonials-2.jpg'
    },
    {
      name: 'Maria Joana',
      text: 'Muito aconchegante, ótimo para tomar um café e relaxar. Super recomendo!',
      img: '/assets/img/testimonials/testimonials-3.jpg'
    },
    {
      name: 'João Azevedo',
      text: 'Qualidade impecável! Tudo é feito com carinho, dá pra sentir no sabor.',
      img: '/assets/img/testimonials/testimonials-4.jpg'
    }
  ];

  return (
    <section id="clientes" className="testimonials section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Nossos clientes</h2>
        <p>O que nossos clientes <span className="description-title">falam sobre nós</span></p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          modules={[Pagination, Autoplay]}
          loop={true}
          speed={600}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={i}>
              <div className="testimonial-item">
                <div className="row gy-4 justify-content-center">
                  <div className="col-lg-6">
                    <div className="testimonial-content">
                      <p>
                        <i className="bi bi-quote quote-icon-left"></i>
                        <span>{t.text}</span>
                        <i className="bi bi-quote quote-icon-right"></i>
                      </p>
                      <h3>{t.name}</h3>
                      <div className="stars">
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                        <i className="bi bi-star-fill"></i>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 text-center">
                    <img src={t.img} className="img-fluid testimonial-img" alt={`Foto de ${t.name}`} />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Testimonials;
