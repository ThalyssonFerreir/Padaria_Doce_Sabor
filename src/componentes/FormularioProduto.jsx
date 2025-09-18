import React, { useState } from 'react';

// Note que não há mais a variável 'const styles = {...}' aqui.
// Toda a estilização agora vem do seu arquivo CSS através das 'classNames'.

function FormularioProduto() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const dadosDoProduto = {
      nome,
      descricao,
      preco: parseFloat(preco),
      estoque: parseInt(estoque, 10),
    };
    console.log('Dados a serem enviados para a API:', dadosDoProduto);
    alert('Produto salvo! (Verifique o console para ver os dados)');
  };

  return (
    <div>
      <h2>Cadastrar/Editar Produto</h2>
      <form onSubmit={handleSubmit} className="formulario-padrao">
        
        <div className="form-grupo">
          <label htmlFor="nome">Nome do Produto:</label>
          <input
            type="text"
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-grupo">
          <label htmlFor="descricao">Descrição:</label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows="4"
          />
        </div>

        <div className="form-grupo">
          <label htmlFor="preco">Preço (R$):</label>
          <input
            type="number"
            id="preco"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            step="0.01"
            required
          />
        </div>

        <div className="form-grupo">
          <label htmlFor="estoque">Quantidade em Estoque:</label>
          <input
            type="number"
            id="estoque"
            value={estoque}
            onChange={(e) => setEstoque(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-principal">
          Salvar Produto
        </button>
      </form>
    </div>
  );
}

export default FormularioProduto;