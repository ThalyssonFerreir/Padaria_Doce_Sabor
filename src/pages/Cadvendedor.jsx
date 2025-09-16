import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/cadvendedor.css";

export default function Cadvendedor() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState(""); // Para exibir feedback
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/cadvendedor", {
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
    <div className="tela-cad-vendedor">

      <div className="container-cad-vendedor">

        <div className="logo-cad-vendedor">
          <img src="/assets/img/imgsPadaria/PadariaLogo.webp"></img>
        </div>
        
        <h1>Cadastrar como Vendedor!</h1>

        <form onSubmit={handleSubmit} className="form-cad-vendedor">
          <input
            className="input-cad-vendedor"
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            className="input-cad-vendedor"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="input-cad-vendedor"
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit" className="button-cad-vendedor">
            Concluir cadastro!
          </button>
          
        </form>


        {mensagem &&
          <p className="mensagem">
            {mensagem}
          </p>}


        <button onClick={() => navigate("/")} className="button-cad-vendedor">
          Fazer o login
        </button>
       
      </div>

    </div>
  );
}
