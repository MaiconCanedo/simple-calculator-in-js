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

{
    "use strict";
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

    function initialize() {
        initEvents();
    }

    function initEvents() {
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
        $botaoZero.addEventListener("click", event => {
            if (!equalsZero($inputVisor.value) || !travarZeroAEsquerda)
                return addValor("0");
        }, false);
        $botaoCE.addEventListener("click", resetarVisor, false);
        $botaoC.addEventListener("click", zerarVisor, false);
        $botaoBackspace.addEventListener("click", apagarAEsquerda, false);
        $botaoVirgula.addEventListener("click", addVirgula, false);
        $botaoMaisOuMenos.addEventListener("click", trocarSinal, false);
        document.addEventListener("keydown", capturarTeclaPressionada, false);
    }

    function contemOperador(string) {
        return getPegaOperadores().test(string);
    }

    function getPegaOperadores() {
        return new RegExp("[" + getOperadores().join("") + "]$");
    }

    function addOperador(operador) {
        let valorAtual = $inputVisor.value;
        if (contemOperador(valorAtual))
            apagarAEsquerda();
        $inputVisor.value += operador;
    }

    function addVirgula() {
        let valorAtual = $inputVisor.value;
        if (equalsZero(valorAtual))
            travarZeroAEsquerda = false;
        if (!/\./.test(getUltimoValor(valorAtual)))
            addValor(".");
    }

    function addValor(valor) {
        if (equalsZero($inputVisor.value) && travarZeroAEsquerda)
            $inputVisor.value = "";
        $inputVisor.value += valor;
        travarZeroAEsquerda = true;
    }

    function apagarAEsquerda() {
        travarZeroAEsquerda = true;
        let valorAtual = $inputVisor.value;
        if (equalsZero(valorAtual))
            return;
        valorAtual = valorAtual.slice(0, -1);
        $inputVisor.value = valorAtual || "0";
    }

    function zerarVisor() {
        travarZeroAEsquerda = true;
        $inputVisor.value = "0";
    }

    function resetarVisor() {
        let valorAtual = $inputVisor.value;
        if (contemUmValor(valorAtual))
            return zerarVisor();
        let regex = new RegExp("" + getUltimoValor(valorAtual) + "$");
        $inputVisor.value = valorAtual.replace(regex, "");
    }

    function mostrarResultado() {
        if (contemUmValor($inputVisor.value))
            return;
        $inputVisor.value = calcular($inputVisor.value);
    }

    let equalsZero = string => string === "0";

    function getOperadores() {
        return Array.prototype.map
            .call($botoesOperacao, botao => botao.value);
    }

    function trocarSinal() {
        let valorAtual = $inputVisor.value;
        let ultimoValor = getUltimoValor(valorAtual);
        let regex = new RegExp(ultimoValor + "$");
        valorAtual = valorAtual.replace(regex, "");
        if (/-/.test(ultimoValor) || equalsZero($inputVisor.value))
            return $inputVisor.value = valorAtual + ultimoValor.replace(/^-/, "");
        $inputVisor.value = valorAtual + "-" + ultimoValor;
    }

    function capturarTeclaPressionada(event) {
        acoesDasTeclas.filter(acao => acao.isValid(event.key))
            .forEach(acao => acao.action(event.key));
    }


    let acoesDasTeclas = [
        {
            isValid: tecla => /^\d+$/g.test(tecla),
            action: tecla => addValor(tecla)
        },
        {
            isValid: tecla => tecla === "Backspace",
            action: tecla => apagarAEsquerda()
        },
        {
            isValid: tecla => tecla === "Escape",
            action: tecla => zerarVisor()
        },
        {
            isValid: tecla => /[\.,]/.test(tecla),
            action: tecla => addVirgula()
        },
        {
            isValid: tecla => contemOperador(tecla),
            action: tecla => addOperador(tecla)
        },
        {
            isValid: tecla => tecla === "Enter" || tecla === "=",
            action: tecla => mostrarResultado()
        },
        {
            isValid: tecla => tecla === "_",
            action: tecla => trocarSinal()
        },
        {
            isValid: tecla => tecla === "Delete",
            action: tecla => zerarVisor
        }
    ]

    initialize();
}