import { useState } from "react";
import "../assets/css/auth.css";
import { useNavigate, Link } from "react-router-dom";
import AuthInput from "../componentes/AuthInput";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFeedback({ message: "", type: "" });

    try {
      const res = await fetch("http://localhost:3000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        setFeedback({ message: `Bem-vindo, ${data.usuario.nome}!`, type: "success" });

        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario', JSON.stringify(data.usuario));
        }

        // ==================================================================
        // A MÁGICA DO REDIRECIONAMENTO ACONTECE AQUI
        // ==================================================================
        // Verificamos a 'role' do usuário que veio da API
        if (data.usuario.role === 'VENDEDOR') {
            // Se for vendedor, vai para o painel
            setTimeout(() => navigate("/perfil-vendedor"), 1500);
        } else {
            // Se for qualquer outra coisa (CLIENTE), vai para a homepage
            setTimeout(() => navigate("/homepage"), 1500);
        }

      } else {
        setFeedback({ message: data.error || "Erro ao fazer login", type: "error" });
      }
    } catch (err) {
      setFeedback({ message: "Erro de conexão. Tente novamente.", type: "error" });
      console.error(err);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className='tela-login'>
      <div className="container-login">
        <div className="logo-login">
          <img src="/assets/img/imgsPadaria/PadariaLogo.webp" alt="Logo da Padaria"></img>
        </div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="form-login">
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
              placeholder="password"
              value={senha}
              onChange={(e) => setpassword(e.target.value)}
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
          <button type="submit" className="button-login-form" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <div className="login-footer-links">
          <Link to="/register">Realizar Cadastro</Link>
        </div>
      </div>
    </div>
  );
}