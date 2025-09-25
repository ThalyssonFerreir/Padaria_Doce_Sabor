import { useState } from "react";
import { toast } from "react-toastify";
import "../assets/css/auth.css";
import AuthInput from "../componentes/AuthInput";

export default function TrabalheConosco() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [descricao, setDescricao] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("deu certo");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/usuarios/solicitacao-vendedor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, telefone, endereco, descricao }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        // Limpar campos
        setNome(""); setEmail(""); setTelefone(""); setEndereco(""); setDescricao("");
      } else {
        toast.error(data.error || "Erro ao enviar solicitação.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="tela-register">
      <div className="container-register">
        <div className="logo-register">
          <img src="/assets/img/imgsPadaria/PadariaLogo.webp" alt="Logo da Padaria" />
        </div>
        <h1>Trabalhe Conosco - Solicitação de Vendedor</h1>
        <form onSubmit={handleSubmit} className="form-register">
          <AuthInput
            iconClassName="bi-person-badge-fill"
            type="text"
            placeholder="Nome da Loja ou Vendedor"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <AuthInput
            iconClassName="bi-envelope-fill"
            type="email"
            placeholder="Email Comercial"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <AuthInput
            iconClassName="bi-telephone-fill"
            type="text"
            placeholder="Telefone/WhatsApp"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            required
          />
          <AuthInput
            iconClassName="bi-geo-alt-fill"
            type="text"
            placeholder="Endereço da Loja"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
          <AuthInput
            iconClassName="bi-card-text"
            type="text"
            placeholder="Descrição da Loja ou Serviços"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
          <button type="submit" className="button-register-form" disabled={isLoading}>
            {isLoading ? "Enviando..." : "Enviar Solicitação"}
          </button>
        </form>
      </div>
    </div>
  );
}
