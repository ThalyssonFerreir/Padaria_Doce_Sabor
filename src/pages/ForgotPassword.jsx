import { useState } from "react";
import "../assets/css/auth.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback({ message: "", type: "" });

    try {
      const res = await fetch("http://localhost:3000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }

      if (res.ok) {
        setFeedback({
          message: "Se este e-mail estiver cadastrado, enviaremos um link de recuperação.",
          type: "success",
        });
      } else {
        setFeedback({
          message: data.error || "Erro ao enviar solicitação",
          type: "error",
        });
      }
    } catch (err) {
      console.error("Erro no forgot-password:", err);
      setFeedback({
        message: "Erro de conexão. Tente novamente.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tela-login">
      <div className="container-login">
        <h1>Recuperar Senha</h1>
        <form onSubmit={handleSubmit} className="form-login">

          <div className="input-group">

            <i className="fa fa-envelope-fill"></i>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          {feedback.message && (
            <p className={`mensagem ${feedback.type}`}>{feedback.message}</p>
          )}

          <button type="submit" className="button-login-form" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar link de recuperação"}
          </button>
        </form>
      </div>
    </div>
  );
}
