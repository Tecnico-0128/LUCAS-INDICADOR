//cadastrar
const nome = document.getElementById('nome');
const cpf = document.getElementById('cpf');
const data = document.getElementById('data');
const salario = document.getElementById('salario');
const funcao = document.getElementById('funcao');
const estado = document.getElementById('estado');
const funcionarios = JSON.parse(localStorage.getItem("funcionarios")) || []

//salario
const cpf2 = document.getElementById('cpf2');
const salario2 = document.getElementById('salario2');

//demissao
const cpf3 = document.getElementById('cpf3');

//listar
const divativo = document.getElementById('ativo');
const divdemitido = document.getElementById('demitido');

function cadastrar() {
    console.log("dfsd")
    if (!nome.value.trim() || !cpf.value.trim() || !data.value.trim() || !salario.value.trim()
        || !funcao.value.trim() || !estado.value.trim()) {
        alert(`Todos os campos devem ser preenchidos!`);
        return;
    }
    console.log("a")
    if (!/^[A-Za-z\sÀ-ý]+$/.test(nome.value)) {
        alert(`O nome só pode conter letras, espaços e acentos!`);
        return;
    }
    console.log("b")
    if (!/^\d{11}$/.test(cpf.value)) {
        alert(`O CPF deve conter somente 11 digítos e somente números!`);
        return;
    }
    if (estado.value.trim().toUpperCase() != "ativo".trim().toUpperCase()) {
        alert(`O estado atual deve ser igual ativo!`);
        return;
    }
    if (Number(salario.value) <= 0) {
        alert(`O salário deve ser maior que 0!`);
        return;
    }
    let achou = false;
    for (let p of funcionarios) {
        if (p.cpf.trim() === cpf.value.trim()) {
            achou = true;
            alert(`Este cliente já está cadastrado!`)
            break;
        }
    }
    if (!achou) {
        const funcionario = {
            nome: nome.value,
            cpf: cpf.value,
            data: data.value,
            salario: salario.value,
            funcao: funcao.value,
            estado: estado.value
        }
        funcionarios.push(funcionario)
        localStorage.setItem("funcionarios", JSON.stringify(funcionarios))
        alert(funcionario.nome + " foi cadastrado(a).")
    }
}

function alterar() {
    let i = -1;
    let sla = false;
    let indice;
    for (let p of funcionarios) {
        i++;
        indice = i;
        if (p.cpf.trim() === cpf2.value.trim()) {
            sla = true;
            break;
        }
    } if (!sla) {
        alert(`Este funcionário não foi encontrado!`);
        return;
    }
    if (Number(salario2.value) <= 0) {
        alert(`O salário deve ser maior que 0!`);
        return;
    }
    if (Number(salario2.value) < funcionarios[indice].salario) {
        alert(`O novo salário tem que ser maior que o antigo!`);
        return;
    }
    funcionarios[indice].salario = Number(salario2.value);
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios))
    alert("Operação sucedida!")
    return;
}

function demitir() {
    let i = -1;
    let sla = false;
    let indice;
    for (let p of funcionarios) {
        i++;
        indice = i;
        if (p.cpf.trim() === cpf3.value.trim()) {
            sla = true;
            break;
        }
    } if (!sla) {
        alert(`Este funcionário não foi encontrado!`);
        return;
    }
    funcionarios[indice].estado = "demitido";
    localStorage.setItem("funcionarios", JSON.stringify(funcionarios))
    alert("Funcionário demitido!")
    return;
}

function listar() {
    divdemitido.innerHTML = "Funcionários demitidos:"
    for (let funcionario of funcionarios) {
        if (funcionario.estado.toUpperCase().trim() == "demitido".toUpperCase().trim())
            divdemitido.innerHTML += `<p>Nome: ${funcionario.nome} | CPF: ${funcionario.cpf} | Data de nascimento: ${funcionario.data} | Salário: ${funcionario.salario} | Função: ${funcionario.funcao} | Estado atual: ${funcionario.estado.toUpperCase().trim()}
        </p>`
    }

    divativo.innerHTML = "Funcionários ativos:"
    for (let funcionario of funcionarios) {
        if (funcionario.estado.toUpperCase().trim() === "ativo".toUpperCase().trim())
            divativo.innerHTML += `<p>Nome: ${funcionario.nome} | CPF: ${funcionario.cpf} | Data de nascimento: ${funcionario.data} | Salário: ${funcionario.salario} | Função: ${funcionario.funcao} | Estado atual: ${funcionario.estado.toUpperCase().trim()}</p>`
    }
}