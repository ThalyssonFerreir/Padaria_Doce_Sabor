import React, { useState } from 'react';

/**
 * Renderiza um formulário para cadastrar um novo produto,
 * incluindo a lógica para enviar os dados para uma API.
 * @param {{ onCancel: () => void, onProductSaved: () => void }} props
 */
function FormularioProduto({ onCancel, onProductSaved }) {
    
    const [nome, setNome] = useState('');
    const [codigoBarras, setCodigoBarras] = useState('');
    const [tipo, setTipo] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const tiposDeExemplo = [
        { id: 1, nome: 'Pães' }, { id: 2, nome: 'Salgados' },
        { id: 3, nome: 'Doces e Bolos' }, { id: 4, nome: 'Bebidas' },
    ];

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);

        const dadosDoProduto = {
            nome,
            codigoBarras,
            tipo,
            quantidade: parseInt(quantidade, 10),
            valor: parseFloat(valor),
        };

        try {

            const response = await fetch('http://localhost:3001/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosDoProduto),
            });

            if (!response.ok) {
                throw new Error('Falha ao salvar o produto. Tente novamente.');
            }
            
            alert('Produto salvo com sucesso!');
            onProductSaved();

        } catch (err) {
            setError(err.message);
            console.error("Erro ao salvar produto:", err);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-header">
                <h2 className="painel-titulo">Adicionar Produto</h2>
                <nav className="breadcrumbs">
                    <a href="#" onClick={(e) => { e.preventDefault(); onCancel(); }}>Produtos</a>
                    <span>&gt;</span>
                    <span>Adicionar</span>
                </nav>
            </div>

            <div className="tab-content">
                <div className="form-grid-simplified">
                    <div className="form-field field-span-2">
                        <label>Nome do produto</label>
                        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Digite o nome do produto" required />
                    </div>
                    <div className="form-field">
                        <label>Código de barras</label>
                        <input type="text" value={codigoBarras} onChange={(e) => setCodigoBarras(e.target.value)} placeholder="Digite o código de barras" />
                    </div>
                    <div className="form-field">
                        <label>Tipo</label>
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                            <option value="" disabled>Selecione um tipo...</option>
                            {tiposDeExemplo.map(t => (
                                <option key={t.id} value={t.nome}>{t.nome}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-field">
                        <label>Quantidade</label>
                        <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} placeholder="0" required />
                    </div>
                    <div className="form-field">
                        <label>Valor (R$)</label>
                        <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="0,00" step="0.01" required />
                    </div>
                </div>
            </div>

            <div className="form-actions">
                {error && <p className="error-message" style={{color: 'red', marginRight: 'auto'}}>{error}</p>}
                <button type="submit" className="btn-painel btn-primary-green" disabled={isSaving}>
                    {isSaving ? 'Salvando...' : 'Cadastrar'}
                </button>
                <button type="button" className="btn-painel btn-secondary-red" onClick={onCancel} disabled={isSaving}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default FormularioProduto;