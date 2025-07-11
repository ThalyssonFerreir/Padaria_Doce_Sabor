import { useEffect, useState } from "react";
import AOS from "aos";

function TrabalheConosco() {
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");

    setTimeout(() => {
      setStatus("sent");
      e.target.reset();
    }, 2000);
  };

  return (
    <section id="trabalhe-conosco" className="contact section">
      <div className="container section-title">
        <h2>Trabalhe conosco</h2>
        <p>
          <span>Gostou de nossa equipe?</span>{" "}
          <span className="description-title">Junte-se a nós</span>
        </p>
      </div>

      <div className="container">
        <form className="php-email-form" onSubmit={handleSubmit}>
          <div className="row gy-4">
            <div className="col-md-6">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Seu Nome Completo"
                required
              />
            </div>

            <div className="col-md-6">
              <input
                type="email"
                name="email"
                className="form-control"
                placeholder="E-mail"
                required
              />
            </div>

            <div className="col-md-6">
              <input
                type="tel"
                name="phone"
                className="form-control"
                placeholder="Telefone (com DDD)"
                required
              />
            </div>

            <div className="col-md-6">
              <input
                type="text"
                name="linkedin"
                className="form-control"
                placeholder="Link para seu LinkedIn (opcional)"
              />
            </div>

            <div className="col-md-12">
              <input
                type="text"
                name="desired_position"
                className="form-control"
                placeholder="Cargo Desejado"
                required
              />
            </div>

            <div className="col-md-12">
              <label htmlFor="resume">
                Anexar seu Currículo (PDF, DOC, DOCX - Máx. 5MB):
              </label>
              <input
                type="file"
                name="resume"
                id="resume"
                accept=".pdf,.doc,.docx"
                className="form-control"
                required
              />
            </div>

            <div className="col-md-12 text-center">
              {status === "loading" && <div className="loading">Enviando...</div>}
              {status === "sent" && (
                <div className="sent-message">
                  Sua mensagem e currículo foram enviados com sucesso. Agradecemos o seu interesse!
                </div>
              )}
              <button type="submit" disabled={status === "loading"}>
                Enviar Candidatura
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default TrabalheConosco;
