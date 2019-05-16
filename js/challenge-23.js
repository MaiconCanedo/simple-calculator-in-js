/*
Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
As regras são:

- Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
diretamente;
- O input deve iniciar com valor zero;
- Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
- Deve haver 4 botões para as operações principais: soma (+), subtração(-),
multiplicação(x) e divisão(÷);
- Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
que irá limpar o input, deixando-o com valor 0;

- A cada número pressionado, o input deve atualizar concatenando cada valor
digitado, como em uma calculadora real;
- Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
operação no input. Se o último caractere no input já for um símbolo de alguma
operação, esse caractere deve ser substituído pelo último pressionado.
Exemplo:
- Se o input tem os valores: "1+2+", e for pressionado o botão de
multiplicação (x), então no input deve aparecer "1+2x".
- Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
input;
- Ao pressionar o botão "CE", o input deve ficar zerado.
*/

(function (window, document) {
    let travarZeroAEsquerda = true;

    let $inputVisor = document.querySelector("[data-js=visor]");
    let $inputFundo = document.querySelector(".saida");

    let $botoesNumero = document.querySelectorAll("[data-js=botaoNumero]");
    let $botoesOperacao = document.querySelectorAll("[data-js=botaoOperacao]");

    let $botaoZero = document.querySelector("[data-js=botaoZero]");

    let $botaoCE = document.querySelector("[data-js=botaoCE]");
    let $botaoC = document.querySelector("[data-js=botaoC]");
    let $botaoBackspace = document.querySelector("[data-js=botaoBackspace]");
    let $botaoVirgula = document.querySelector("[data-js=botaoVirgula]");
    let $botaoMaisOuMenos = document.querySelector("[data-js=botaoMaisOuMenos]");
    let $botaoIgual = document.querySelector("[data-js=botaoIgual]");

    $inputFundo.addEventListener("clik", event => console.log("Clicou!"), false);

    Array.prototype.forEach.call($botoesNumero, function ($botaoNumero) {
        $botaoNumero.addEventListener("click", event =>
            addValor($botaoNumero.value), false);
    });

    Array.prototype.forEach.call($botoesOperacao, function ($botaoOperacao) {
        $botaoOperacao.addEventListener("click", event =>
            addOperador($botaoOperacao.value));
    }, false);

    $botaoIgual.addEventListener("click", mostrarResultado, false);

    document.addEventListener("keydown", event => {
        let tecla = event.key;

        if (/^\d+$/g.test(tecla))
            addValor(tecla);

        if (tecla === "Backspace")
            apagarAEsquerda();

        if (tecla === "Delete" || tecla === "Escape")
            limparVisor();

        if (/[\.,]/.test(tecla))
            addVirgula();

        if (/[-+*/]$/.test(tecla))
            addOperador(tecla);

        if (tecla === "Enter" || tecla === "=")
            mostrarResultado();

        if (tecla === "_")
            $botaoMaisOuMenos.click();
    });

    $botaoZero.addEventListener("click", event => {
        if (!isZerado($inputVisor.value) || !travarZeroAEsquerda)
            return addValor("0");

    }, false);

    $botaoCE.addEventListener("click", event => {
        let valorAtual = $inputVisor.value;
        if (isUmValor(valorAtual))
            return limparVisor();

        let regex = new RegExp("" + getUltimoValor(valorAtual) + "$");
        $inputVisor.value = valorAtual.replace(regex, "")
    }, false);

    $botaoC.addEventListener("click", limparVisor, false);

    $botaoBackspace.addEventListener("click", apagarAEsquerda, false);

    $botaoVirgula.addEventListener("click", addVirgula, false);

    $botaoMaisOuMenos.addEventListener("click", event => {
        let valorAtual = $inputVisor.value;
        let ultimoValor = getUltimoValor(valorAtual);
        let regex = new RegExp("" + ultimoValor + "$");

        valorAtual = valorAtual.replace(regex, "");

        if (/-/.test(ultimoValor) || isZerado(valorAtual))
            return $inputVisor.value = valorAtual + ultimoValor.replace(/^-/, "");

        $inputVisor.value = valorAtual + "-" + ultimoValor;
    });


    function addOperador(operador) {
        let valorAtual = $inputVisor.value;
        if (/[-+*/]$/.test(valorAtual))
            apagarAEsquerda();

        $inputVisor.value += operador;
    }

    function addVirgula() {
        let valorAtual = $inputVisor.value;
        if (isZerado(valorAtual))
            travarZeroAEsquerda = false;

        if (!/\./.test(getUltimoValor(valorAtual)))
            addValor(".");
    }

    function addValor(valor) {
        if (isZerado($inputVisor.value) && travarZeroAEsquerda)
            $inputVisor.value = "";

        $inputVisor.value += valor;
        travarZeroAEsquerda = true;
    }

    function apagarAEsquerda() {
        travarZeroAEsquerda = true;
        let valorAtual = $inputVisor.value;

        if (isZerado(valorAtual))
            return;

        valorAtual = valorAtual.slice(0, -1);
        $inputVisor.value = valorAtual || "0";
    }

    function limparVisor() {
        travarZeroAEsquerda = true;
        $inputVisor.value = "0";
    }

    function mostrarResultado() {
        if (isUmValor($inputVisor.value))
            return;

        $inputVisor.value = calcular($inputVisor.value);
    }

    let isZerado = valor => valor === "0";

})(window, document);