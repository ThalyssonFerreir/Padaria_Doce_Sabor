import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { useEffect } from "react";
import AOS from "aos";

const kits = [
  {
    title: "Celebração Deliciosa",
    price: "R$120,00",
    description:
      "Um kit perfeito para celebrar momentos especiais com muito sabor! Inclui um bolo de chocolate com cobertura cremosa e morangos frescos, deliciosos docinhos tradicionais (brigadeiro e beijinho) e mini salgados irresistíveis. Ideal para pequenas comemorações em família ou entre amigos.",
    background: "/assets/img/kits/kit-1.jpeg",
  },
  {
    title: "Festa Brasileira Completa",
    price: "R$150,00",
    description:
      "Uma explosão de sabores brasileiros para sua festa! Este kit traz um bolo de chocolate com cobertura de brigadeiro e morangos, uma variedade de mini salgados (enroladinho de salsicha, coxinha, risole) e docinhos tradicionais (brigadeiro e beijinho). Perfeito para aniversários, confraternizações e eventos com amigos.",
    background: "/assets/img/kits/kit-2.jpg",
  },
  {
    title: "Doçura e Sabor",
    price: "R$200,00",
    description:
      "Uma combinação irresistível de bolo e doces para adoçar sua celebração! Este kit inclui um bolo de chocolate com decoração especial, brigadeiros e beijinhos. Ideal para festas infantis, aniversários e momentos de alegria.",
    background: "/assets/img/kits/kit-3.webp",
  },
  {
    title: "Salgadinhos Festivos",
    price: "A partir de R$100,00",
    description:
      "Este kit foi feito para você que não abre mão de ter tudo do seu jeito. Selecione seus doces preferidos, escolha o sabor do bolo que mais te agrada e monte o mix de salgadinhos que fará sucesso na sua festa.",
    background: "/assets/img/kits/kit-4.png",
  },
];

function Kits() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section id="kits" className="kits section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Kit Festa</h2>
        <p>
          <span className="description-title">
            Encomende um dos nossos Kit Festas
          </span>
        </p>
      </div>

      <div
        className="container-fluid"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <Swiper
          modules={[Pagination, Autoplay]}
          loop={true}
          speed={600}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          slidesPerView="auto"
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 40 },
            1200: { slidesPerView: 3, spaceBetween: 10 },
          }}
          className="init-swiper"
        >
          {kits.map((kit, index) => (
            <SwiperSlide
              key={index}
              className="event-item d-flex flex-column justify-content-end"
              style={{
                backgroundImage: `url(${kit.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                height: "450px",
                position: "relative", // importante para overlay absoluto
              }}
            >
              {/* OVERLAY ESCURO */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  zIndex: 1,
                }}
              ></div>

              {/* TEXTO EM CIMA DO OVERLAY */}
              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                  color: "#fff",
                  padding: "20px",
                  textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
                  borderRadius: "8px",
                }}
              >
                <h3 style={{ color: "#f8f8f8" }}>{kit.title}</h3>
                <div className="price align-self-start">{kit.price}</div>
                <p className="description">{kit.description}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Kits;
