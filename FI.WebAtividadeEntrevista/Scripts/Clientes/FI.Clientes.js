const beneficiariosEmMemoria = [];

//abre modal
function abrirModalBeneficiarios() {
    $('#modalBeneficiarios').modal('show');
}

//valida CPF
function cpfValido(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

//inclui beneficiário em memória e na tabela
function incluirBeneficiario() {
    const cpf = $('#benefCpf').val().trim();
    const nome = $('#benefNome').val().trim();

    if (!cpf || !nome) {
        alert('Preencha CPF e Nome!');
        return;
    }

    if (!cpfValido(cpf)) {
        alert('CPF inválido!');
        return;
    }

    beneficiariosEmMemoria.push({ cpf, nome });

    $('#listaBeneficiarios').append(`
        <tr data-cpf="${cpf}">
            <td>${cpf}</td>
            <td>${nome}</td>
            <td class="text-right">
                <button type="button" class="btn btn-primary btn-sm btnAlterarBeneficiario">Alterar</button>
                <button type="button" class="btn btn-primary btn-sm btnExcluirBeneficiario">Excluir</button>
            </td>
        </tr>
    `);

    $('#benefCpf').val('');
    $('#benefNome').val('');
}

//exclui beneficiário em memória e na tabela
$(document).on('click', '.btnExcluirBeneficiario', function () {
    const row = $(this).closest('tr');
    const cpf = row.data('cpf');

    const index = beneficiariosEmMemoria.findIndex(b => b.cpf === cpf);
    if (index > -1) beneficiariosEmMemoria.splice(index, 1);

    row.remove();
});

//alterar beneficiário
$(document).on('click', '.btnAlterarBeneficiario', function () {
    const row = $(this).closest('tr');
    const cpf = row.data('cpf');

    const beneficiario = beneficiariosEmMemoria.find(b => b.cpf === cpf);
    if (!beneficiario) {
        alert('Beneficiário não encontrado.');
        return;
    }

    $('#benefCpf').val(beneficiario.cpf);
    $('#benefNome').val(beneficiario.nome);

    const index = beneficiariosEmMemoria.findIndex(b => b.cpf === cpf);
    if (index > -1) beneficiariosEmMemoria.splice(index, 1);

    row.remove();

    $('#benefNome').focus();
});

//formata CPFs
$('#CPF, #benefCpf').on('input', function () {
    let v = this.value.replace(/\D/g, '');
    if (v.length > 11) v = v.slice(0, 11);
    let r = '';
    if (v.length > 0) r = v.slice(0, 3);
    if (v.length > 3) r += '.' + v.slice(3, 6);
    if (v.length > 6) r += '.' + v.slice(6, 9);
    if (v.length > 9) r += '-' + v.slice(9, 11);
    this.value = r;
});

//associa botão incluir beneficiário
$(document).ready(function () {
    $('#btnIncluirBeneficiario').on('click', incluirBeneficiario);
});

//envia cliente + beneficiários
$('#formCadastro').submit(function (e) {
    e.preventDefault();

    const dadosCliente = {
        Nome: $('#Nome').val(),
        Sobrenome: $('#Sobrenome').val(),
        CPF: $('#CPF').val(),
        Nacionalidade: $('#Nacionalidade').val(),
        CEP: $('#CEP').val(),
        Estado: $('#Estado').val(),
        Cidade: $('#Cidade').val(),
        Logradouro: $('#Logradouro').val(),
        Email: $('#Email').val(),
        Telefone: $('#Telefone').val(),
        Beneficiarios: beneficiariosEmMemoria
    };

    $.ajax({
        url: urlPost,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dadosCliente),
        success: function (res) {
            alert('Cliente salvo!');
            $('#formCadastro')[0].reset();
            $('#listaBeneficiarios').empty();
            beneficiariosEmMemoria.length = 0;
        },
        error: function (err) {
            alert('Erro ao salvar: ' + err.responseText);
        }
    });
});
