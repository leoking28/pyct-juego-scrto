// Declaración global
let NumSecreto;
let numIntentos = 1;
let listaNumerosSorteados = []; // Asegúrate de que esta variable esté declarada globalmente
let numeroMax = 10;

condicionesIniciales();
console.log(NumSecreto);

function asignarTextElement(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function comparaNum() {
    let numUsuario = parseInt(document.getElementById('valorUsuario').value, 10);

    // Verifica si numUsuario es un número válido
    if (isNaN(numUsuario) || numUsuario < 1 || numUsuario > numeroMax) {
        asignarTextElement('p', 'Por favor, ingresa un número válido entre 1 y ' + numeroMax + '.');
        return;
    }

    console.log('Número secreto:', NumSecreto);
    console.log('Número ingresado:', numUsuario);

    if (numUsuario === NumSecreto) {
        asignarTextElement('p', `GANASTE en ${numIntentos} ${(numIntentos === 1) ? 'intento' : 'intentos'} :D`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (numUsuario > NumSecreto) {
        asignarTextElement('p', 'El número secreto es menor.');
    } else {
        asignarTextElement('p', 'El número secreto es mayor.');
    }

    numIntentos++;
    limpiarCaja();
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumSecreto() {
    let numGenerado = Math.floor(Math.random() * numeroMax) + 1;

    console.log('Número generado:', numGenerado);
    console.log('Lista de números sorteados:', listaNumerosSorteados);

    // Verifica si el número ya ha sido generado
    if (listaNumerosSorteados.includes(numGenerado)) {
        return generarNumSecreto(); // Llama recursivamente si el número ya existe
    } else {
        listaNumerosSorteados.push(numGenerado);
        return numGenerado;
    }
}

function reiniciarJuego() {
    limpiarCaja();
    condicionesIniciales(); 
}

function condicionesIniciales() {
    asignarTextElement('h1', 'Juego del número secreto');
    asignarTextElement('p', `Escoge un número del 1 al ${numeroMax}`);
    numIntentos = 1;
    NumSecreto = generarNumSecreto();
    listaNumerosSorteados = []; // Reinicia la lista de números sorteados
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');
}