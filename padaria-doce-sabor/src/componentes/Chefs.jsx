import { useEffect } from "react";
import AOS from "aos";

const chefs = [
  {
    name: "Miguel Souza",
    role: "Padeiro Chefe",
    description:
      "Miguel é o responsável pelos pães frescos e crocantes da Doce Sabor. Com experiência e dedicação, ele garante que cada pão seja feito com qualidade e sabor impecáveis.",
    image: "/assets/img/chefs/chefs-1.avif",
    alt: "Homem, profissional da padaria, fazendo croissant",
    delay: 100,
  },
  {
    name: "José Silva",
    role: "Especialista em Salgados",
    description:
      "José é o mestre dos salgados da Doce Sabor. Seus salgados são preparados com ingredientes frescos e um toque especial, garantindo sabor e crocância em cada mordida.",
    image: "/assets/img/chefs/chefs-2.png",
    alt: "Homem, profissional de salgados, segurando uma bandeja de salgados",
    delay: 200,
  },
  {
    name: "Hana Sato",
    role: "Boleira e Confeiteira",
    description:
      "Hana transforma ingredientes simples em doces incríveis. Com seu talento e criatividade, ela cria bolos e sobremesas que encantam tanto pelo sabor quanto pela beleza.",
    image: "/assets/img/chefs/chefs-3.jpg",
    alt: "Mulher, profissional de confeitaria segurando um bolo confeitado",
    delay: 300,
  },
];

function Chefs() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section id="chefs" className="chefs section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Chefs</h2>
        <p>
          <span className="description-title">Conheça Nossos Chefs</span>
        </p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {chefs.map((chef, index) => (
            <div
              className="col-lg-4 d-flex align-items-stretch"
              data-aos="fade-up"
              data-aos-delay={chef.delay}
              key={index}
            >
              <div className="team-member">
                <div className="member-img">
                  <img
                    src={chef.image}
                    className="img-fluid"
                    alt={chef.alt}
                  />
                </div>
                <div className="member-info">
                  <h4>{chef.name}</h4>
                  <span>{chef.role}</span>
                  <p>{chef.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Chefs;
