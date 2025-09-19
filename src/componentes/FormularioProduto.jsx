import React, { useState, useRef, useEffect } from 'react';

function FormularioProduto({ onCancel, onProductSaved }) {
    // Estados para os campos do formulário
    const [nome, setNome] = useState('');
    const [codigoBarras, setCodigoBarras] = useState('');
    const [tipo, setTipo] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    
    // Estados para o upload da imagem
    const [imagem, setImagem] = useState(null);
    const [imagemPreview, setImagemPreview] = useState('');
    const fileInputRef = useRef(null);
    
    // Estados para feedback ao usuário
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const tiposDeExemplo = [
        { id: 1, nome: 'Pães' }, { id: 2, nome: 'Salgados' },
        { id: 3, nome: 'Doces e Bolos' }, { id: 4, nome: 'Bebidas' },
    ];
    
    useEffect(() => {
        // Efeito para limpar a URL de preview da memória para evitar leaks
        return () => {
            if (imagemPreview) {
                URL.revokeObjectURL(imagemPreview);
            }
        };
    }, [imagemPreview]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagem(file); // Guarda o arquivo para o upload
            setImagemPreview(URL.createObjectURL(file)); // Gera URL de preview
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);

        // Para enviar arquivos, usamos FormData
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('codigoBarras', codigoBarras);
        formData.append('tipo', tipo);
        formData.append('quantidade', parseInt(quantidade, 10));
        formData.append('valor', parseFloat(valor));
        if (imagem) {
            formData.append('imagem', imagem); // Adiciona o arquivo de imagem
        }

        try {
            const response = await fetch('http://localhost:3001/produtos', {
                method: 'POST',
                body: formData, 
            });

            if (!response.ok) {
                throw new Error('Falha ao salvar o produto.');
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
        <form className="form-container-com-imagem" onSubmit={handleSubmit}>
            <div className="form-header">
                <h2 className="painel-titulo">Adicionar Produto</h2>
                <nav className="breadcrumbs">
                    <a href="#" onClick={(e) => { e.preventDefault(); onCancel(); }}>Produtos</a>
                    <span>&gt;</span>
                    <span>Adicionar</span>
                </nav>
            </div>

            <div className="form-body">
                <div className="form-layout-grid">
                    {/* Coluna da Esquerda: Upload de Imagem */}
                    <div className="image-upload-field">
                        <label>Foto do produto</label>
                        <div className="image-upload-box" onClick={() => fileInputRef.current.click()}>
                            {imagemPreview ? (
                                <div className="image-preview">
                                    <img src={imagemPreview} alt="Pré-visualização" />
                                </div>
                            ) : (
                                <div className="upload-placeholder">
                                    <i className="bi bi-image"></i>
                                    <span>Clique para adicionar uma imagem</span>
                                </div>
                            )}
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                accept="image/png, image/jpeg"
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>

                    {/* Coluna da Direita: Campos do Formulário */}
                    <div className="form-fields-grid">
                        <div className="form-field field-span-2">
                            <label>Nome do produto</label>
                            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
                        </div>
                        <div className="form-field field-span-2">
                            <label>Código de barras</label>
                            <input type="text" value={codigoBarras} onChange={(e) => setCodigoBarras(e.target.value)} />
                        </div>
                        <div className="form-field">
                            <label>Tipo</label>
                            <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                                <option value="" disabled>Selecione um tipo...</option>
                                {tiposDeExemplo.map(t => (<option key={t.id} value={t.nome}>{t.nome}</option>))}
                            </select>
                        </div>
                        <div className="form-field">
                            <label>Quantidade</label>
                            <input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required />
                        </div>
                        <div className="form-field">
                            <label>Valor (R$)</label>
                            <input type="number" value={valor} onChange={(e) => setValor(e.target.value)} step="0.01" required />
                        </div>
                    </div>
                </div>
            </div>

            <div className="form-actions">
                {error && <p style={{color: 'red', marginRight: 'auto'}}>{error}</p>}
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