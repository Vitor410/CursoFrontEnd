document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Obtém os valores dos campos
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const telefone = document.getElementById('telefone').value;
    const idade = document.getElementById('idade').value;

    // Valida se os campos não estão vazios
    if (!nome || !email || !senha || !telefone || !idade) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    // Se passou em todas as validações
    alert("Formulário enviado com sucesso!");
    document.getElementById('formulario').reset(); // Reseta o formulário
});
