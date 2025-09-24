import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import CurrencyInput from 'react-currency-input-field';

const API_URL = 'http://localhost:3000';

function FormularioProduto({ onCancel, onProductSaved, produtoParaEditar }) {
    const [nome, setNome] = useState('');
    const [codigoBarras, setCodigoBarras] = useState('');
    const [tipo, setTipo] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');
    const [imagem, setImagem] = useState(null);
    const [imagemPreview, setImagemPreview] = useState('');
    const fileInputRef = useRef(null);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const isEditing = !!produtoParaEditar;
    // --- MUDANÇA AQUI ---
    const tiposDeExemplo = ['Pães', 'Salgados', 'Doces e Bolos', 'Bebidas', 'Mercearia'];

    useEffect(() => {
        if (isEditing) {
            setNome(produtoParaEditar.nome);
            setCodigoBarras(produtoParaEditar.codigoBarras || '');
            setTipo(produtoParaEditar.tipo || '');
            setQuantidade(produtoParaEditar.estoque.toString());
            setValor(produtoParaEditar.preco.toString());
            if (produtoParaEditar.imagemUrl) {
                setImagemPreview(`${API_URL}/${produtoParaEditar.imagemUrl}`);
            } else {
                setImagemPreview('');
            }
        }
    }, [produtoParaEditar, isEditing]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImagem(file);
            const previewUrl = URL.createObjectURL(file);
            setImagemPreview(previewUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('codigoBarras', codigoBarras);
        formData.append('tipo', tipo);
        formData.append('quantidade', quantidade);
        formData.append('valor', valor.replace(',', '.'));
        if (imagem) formData.append('imagem', imagem);

        const token = localStorage.getItem('token');
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `${API_URL}/api/produtos/${produtoParaEditar.id}` : `${API_URL}/api/produtos`;

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData,
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Falha ao ${isEditing ? 'atualizar' : 'salvar'} o produto.`);
            }
            toast.success(`Produto ${isEditing ? 'atualizado' : 'salvo'} com sucesso!`);
            onProductSaved();
        } catch (err) {
            toast.error(err.message);
            setError(err.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form className="form-container-com-imagem" onSubmit={handleSubmit}>
            <div className="form-header">
                <h2 className="painel-titulo">{isEditing ? 'Editar Produto' : 'Adicionar Produto'}</h2>
                <nav className="breadcrumbs">
                    <a href="#" onClick={(e) => { e.preventDefault(); onCancel(); }}>Produtos</a>
                    <span>&gt;</span>
                    <span>{isEditing ? `Editar #${produtoParaEditar.id}` : 'Adicionar'}</span>
                </nav>
            </div>
            <div className="form-body">
                <div className="form-layout-grid">
                    <div className="image-upload-field">
                        <label>Foto do produto</label>
                        <div className="image-upload-box" onClick={() => fileInputRef.current.click()}>
                            {imagemPreview ? (
                                <div className="image-preview"><img src={imagemPreview} alt="Pré-visualização" /></div>
                            ) : (
                                <div className="upload-placeholder"><i className="bi bi-image"></i><span>Clique para adicionar uma imagem</span></div>
                            )}
                            <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/png, image/jpeg" style={{ display: 'none' }} />
                        </div>
                    </div>
                    <div className="form-fields-grid">
                        <div className="form-field field-span-2"><label>Nome do produto</label><input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required /></div>
                        <div className="form-field field-span-2"><label>Código de barras</label><input type="text" value={codigoBarras} onChange={(e) => setCodigoBarras(e.target.value)} /></div>
                        <div className="form-field">
                            <label>Tipo</label>
                            <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                                <option value="" disabled>Selecione um tipo...</option>
                                {tiposDeExemplo.map(t => (<option key={t} value={t}>{t}</option>))}
                            </select>
                        </div>
                        <div className="form-field"><label>Quantidade</label><input type="number" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required /></div>
                        <div className="form-field">
                            <label>Valor (R$)</label>
                            <CurrencyInput
                                id="valor-produto"
                                name="valor"
                                placeholder="R$ 0,00"
                                value={valor}
                                decimalsLimit={2}
                                onValueChange={(value) => setValor(value || '')}
                                prefix="R$ "
                                decimalSeparator=","
                                groupSeparator="."
                                className="input-currency"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="form-actions">
                {error && <p style={{ color: 'red', marginRight: 'auto' }}>{error}</p>}
                <button type="submit" className="btn-painel btn-primary-green" disabled={isSaving}>
                    {isSaving ? 'Salvando...' : (isEditing ? 'Atualizar Produto' : 'Cadastrar Produto')}
                </button>
                <button type="button" className="btn-painel btn-secondary-red" onClick={onCancel} disabled={isSaving}>
                    Cancelar
                </button>
            </div>
        </form>
    );
}

export default FormularioProduto;