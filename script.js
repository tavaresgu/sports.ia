function showNotification(message, type = 'error') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Mostrar a notificação com animação
    setTimeout(() => notification.classList.add('show'), 100);

    // Remover a notificação após 3 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Aqui você pode adicionar a lógica de validação do login
    // Por enquanto, vamos apenas verificar se os campos não estão vazios
    if (email && password) {
        // Redireciona para a página de dashboard
        window.location.href = 'dashboard.html';
    } else {
        showNotification('Por favor, preencha todos os campos!');
    }
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i-1, i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i-1, i)) * (12 - i);
    }

    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

function formatarCPF(cpf) {
    const numeros = cpf.replace(/[^\d]/g, '');
    return numeros.replace(/([\d]{3})([\d]{3})([\d]{3})([\d]{2})/, '$1.$2.$3-$4');
}

document.getElementById('cpf').addEventListener('input', function(e) {
    let cpf = e.target.value;
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length <= 11) {
        e.target.value = formatarCPF(cpf);
    }
});

function register() {
    const email = document.getElementById('email').value;
    const cpf = document.getElementById('cpf').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const ageConfirm = document.getElementById('age-confirm').checked;
    if (!email || !cpf || !password || !confirmPassword) {
        showNotification('Por favor, preencha todos os campos!');
        return;
    }

    if (!validarCPF(cpf)) {
        showNotification('CPF inválido!');
        return;
    }

    if (password !== confirmPassword) {
        showNotification('As senhas não coincidem!');
        return;
    }

    if (!ageConfirm) {
        showNotification('Você precisa confirmar que é maior de 18 anos!');
        return;
    }

    // Mostrar mensagem de sucesso
    showNotification('Conta criada com sucesso! Redirecionando...', 'success');
    
    // Redirecionar após 3 segundos
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000);
}
