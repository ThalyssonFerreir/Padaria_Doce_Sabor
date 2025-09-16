import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/register.css";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState(""); // Para exibir feedback
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await res.json();

      if (res.ok) {
        setMensagem("Cadastro realizado com sucesso!");
        setNome("");
        setEmail("");
        setSenha("");
        navigate("/homepage");
      } else {
        setMensagem(data.error || "Erro ao cadastrar");
      }
    } catch (err) {
      setMensagem("Erro ao conectar com o servidor");
      console.error(err);
    }
  };

  return (
    <div className="tela-register">

      <div className="container-register">

        <div className="logo-register">
          <img src="/assets/img/imgsPadaria/PadariaLogo.webp"></img>
        </div>
        
        <h1>Cadastrar como cliente!</h1>

        <form onSubmit={handleSubmit} className="form-register">
          <input
            className="input-register"
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            className="input-register"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input-register"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit" className="button-register-form">
            Concluir cadastro!
          </button>

        </form>


        {mensagem &&
          <p className="mensagem">
            {mensagem}
          </p>}


        <button onClick={() => navigate("/")} className="button-register">
          Fazer o login
        </button>

        <button className="button-cad-vendedor-em-register" onClick={() => navigate("/cadVendedor")}>
          Cadastrar como vendedor!
        </button>         
      </div>

    </div>
  );
}
