import React from 'react';

// Este componente recebe todas as props de um input normal
// e uma 'iconClassName' para o ícone do Bootstrap
function AuthInput({ iconClassName, ...props }) {
    return (
        <div className="input-group">
            <i className={`bi ${iconClassName}`}></i>
            <input {...props} />
        </div>
    );
}

export default AuthInput;