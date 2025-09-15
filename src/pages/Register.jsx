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
      const res = await fetch("http://localhost:3000/cadastro", {
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
    <div className="tela">

      <div className="container">

        <div className="logo">
          <img src="/assets/img/imgsPadaria/PadariaLogo.webp"></img>
        </div>
        
        <h1>Cadastrar como cliente!</h1>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />


        </form>

          <button type="submit">
            Concluir cadastro!
          </button>

        {mensagem &&
          <p className="mensagem">
            {mensagem}
          </p>}


        <button onClick={() => navigate("/")}>
          Fazer o login
        </button>

        <button className="Cad-vendedor" onClick={() => navigate("/cadVendedor")}>
          Cadastrar como vendedor!
        </button>         
      </div>

    </div>
  );
}
