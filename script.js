// Elementos de Tarefas
const inputTarefa = document.getElementById('novaTarefa');
const listaTarefas = document.getElementById('listaDeTarefas');

// Elementos de Gastos
const inputDescricaoGasto = document.getElementById('descricaoGasto');
const inputValorGasto = document.getElementById('valorGasto');
const listaGastos = document.getElementById('listaDeGastos');
const totalGastoElemento = document.getElementById('totalGasto');
let totalGastos = 0;

// --- Funcionalidades de Tarefas ---
function adicionarTarefa() {
    const textoTarefa = inputTarefa.value.trim();
    if (textoTarefa) {
        const novaLi = document.createElement('li');
        novaLi.innerHTML = `
            <span>${textoTarefa}</span>
            <div class="botoes-acao">
                <button class="botao-concluir" onclick="concluirTarefa(this)">Concluir</button>
                <button class="botao-remover" onclick="removerTarefa(this)">Remover</button>
            </div>
        `;
        listaTarefas.appendChild(novaLi);
        inputTarefa.value = '';
    }
}

function concluirTarefa(botao) {
    const listItem = botao.parentNode.parentNode;
    const textoTarefa = listItem.querySelector('span');
    textoTarefa.classList.toggle('concluida');
}

function removerTarefa(botao) {
    const listItem = botao.parentNode.parentNode;
    listaTarefas.removeChild(listItem);
}

inputTarefa.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});

// --- Funcionalidades de Gastos ---
function adicionarGasto() {
    const descricao = inputDescricaoGasto.value.trim();
    const valor = parseFloat(inputDescricaoGasto.value);

    if(descricao && !isNaN(valor) && valor > 0) {
        const novaLi = document.createElement('li');
        novaLi.innerHTML = `
            <span>${descricao}</span>
            <span>R$ ${valor.toFixed(2)}</span>
            <button class="botao-remover" onclick="removerGasto(this)">Remover</button>
        `;
        listaGastos.appendChild(novaLi);
        totalGastos += valor;
        atualizarTotalGasto();
        inputDescricaoGasto.value = '';
        inputValorGasto.value = '';
    } else {
        alert("Por favor, insira uma descrição e um valor válido para o gasto.");
    }
}

function removerGasto(botao) {
    const listItem = botao.parentNode;
    const valorRemovido = parseFloat(listItem.querySelector('span:nth-child(2)').textContent.replace('R$ ', ''));
    totalGastos -= valorRemovido;
    listaGastos.removeChild(listItem);
    atualizarTotalGasto();
}

function atualizarTotalGasto() {
    totalGastoElemento.textContent = `R$ ${totalGastos.toFixed(2)}`;
}

inputValorGasto.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarGasto();
    }
});