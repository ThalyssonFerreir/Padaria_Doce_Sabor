import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../assets/css/auth.css";
import AuthInput from "../componentes/AuthInput";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback({ message: "", type: "" });
    try {
      const res = await fetch("http://localhost:3000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ message: "Cadastro realizado com sucesso! Redirecionando...", type: "success" });
        // MUDANÇA AQUI: Redireciona para o login após o sucesso
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setFeedback({ message: data.error || "Erro ao cadastrar", type: "error" });
      }
    } catch (err) {
      setFeedback({ message: "Erro de conexão. Tente novamente.", type: "error" });
      console.error(err);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="tela-register">
      <div className="container-register">
        <div className="logo-register">
          <img src="/assets/img/imgsPadaria/PadariaLogo.webp" alt="Logo da Padaria"></img>
        </div>
        <h1>Cadastrar como cliente</h1>
        <form onSubmit={handleSubmit} className="form-register">
          <AuthInput
            iconClassName="bi-person-fill"
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <AuthInput
            iconClassName="bi-envelope-fill"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="input-group password-group">
            <i className="bi bi-lock-fill"></i>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <i
              className={`bi ${showPassword ? 'bi-eye-slash-fill' : 'bi-eye-fill'} password-toggle-icon`}
              onClick={() => setShowPassword(!showPassword)}
            ></i>
          </div>
          {feedback.message && (
            <p className={`mensagem ${feedback.type}`}>
              {feedback.message}
            </p>
          )}
          <button type="submit" className="button-register-form" disabled={isLoading}>
            {isLoading ? 'Concluindo...' : 'Concluir cadastro'}
          </button>
        </form>
        <div className="register-footer-links">
            {/* MUDANÇA AQUI: O Link agora aponta para /login */}
            <Link to="/login">Já tenho conta (Fazer login)</Link>
            <Link to="/cadvendedor">Cadastrar como vendedor</Link>
        </div>
      </div>
    </div>
  );
}