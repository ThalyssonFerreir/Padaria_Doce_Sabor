import { useState } from "react";
import "../assets/css/login.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState(""); // Para feedback
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("Usuário logado:", data);
        setMensagem(`Bem-vindo, ${data.nome}!`);
        navigate("/homepage");
      } else {
        setMensagem(data.error || "Erro ao fazer login");
      }
    } catch (err) {
      setMensagem("Erro ao conectar com o servidor");
      console.error(err);
    }
  };

  return (
    <div className ='tela-login'>

      <div className="container-login">
        
        <div className="logo-login">
          <img src="/assets/img/imgsPadaria/PadariaLogo.webp"></img>
        </div>
        
        <h1>Login</h1>

        <form onSubmit={handleSubmit} className="form-login">
          <input
            className="input-login"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />


          <input
            className="input-login"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit" className="button-login-form">
            Entrar
          </button>

        </form>



        {mensagem &&
         <p className="mensagem">
          {mensagem}
         </p>}

        <button onClick={() => navigate("/register")} className="button-login">
          Realizar Cadastro
        </button>

      </div>

    </div>
    
  );
}
