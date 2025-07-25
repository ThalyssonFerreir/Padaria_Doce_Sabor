import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const galleryItems = [
  { src: "/assets/img/gallery/gallery-1.jpg", alt: "Foto de um rocambole com cobertura de chocolate" },
  { src: "/assets/img/gallery/gallery-2.jpg", alt: "Foto de uma trufa partida" },
  { src: "/assets/img/gallery/gallery-3.jpg", alt: "Foto de cesta de café da manhã" },
  { src: "/assets/img/gallery/gallery-4.jpg", alt: "Foto de uma sobremesa com chocolate" },
  { src: "/assets/img/gallery/gallery-5.jpg", alt: "Foto de pudim" },
  { src: "/assets/img/gallery/gallery-6.jpg", alt: "Foto de cesta com uva passas, damasco, e outros" },
  { src: "/assets/img/gallery/gallery-7.jpg", alt: "Foto de uma cesta com itens de café da manhã" },
  { src: "/assets/img/gallery/gallery-8.jpg", alt: "Foto de um bolo com corações" },
  { src: "/assets/img/gallery/gallery-9.jpg", alt: "Foto de pães carioquinhas" },
  { src: "/assets/img/gallery/gallery-10.png", alt: "Foto de vários tipos de pães" },
];

function Gallery() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section id="produtos" className="gallery section light-background">
      <div className="container section-title" data-aos="fade-up">
        <h2>Nossos Produtos</h2>
        <p>
          <span>Venha &amp; Confira</span>{" "}
          <span className="description-title">nossos produtos</span>
        </p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1200: { slidesPerView: 5, spaceBetween: 30 },
          }}
        >
          {galleryItems.map((item, index) => (
            <SwiperSlide key={index}>
              <a className="glightbox" data-gallery="images-gallery" href={item.src}>
                <img src={item.src} className="img-fluid" alt={item.alt} />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Gallery;
