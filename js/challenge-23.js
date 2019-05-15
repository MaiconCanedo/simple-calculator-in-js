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

    let $um = document.querySelector("[data-js=um]");
    let $dois = document.querySelector("[data-js=dois]");
    let $tres = document.querySelector("[data-js=tres]");
    let $quatro = document.querySelector("[data-js=quatro]");
    let $cinco = document.querySelector("[data-js=cinco]");
    let $seis = document.querySelector("[data-js=seis]");
    let $sete = document.querySelector("[data-js=sete]");
    let $oito = document.querySelector("[data-js=oito]");
    let $nove = document.querySelector("[data-js=nove]");
    let $zero = document.querySelector("[data-js=zero]");

    let $ce = document.querySelector("[data-js=ce]");
    let $c = document.querySelector("[data-js=c]");
    let $backspace = document.querySelector("[data-js=backspace]");
    let $soma = document.querySelector("[data-js=soma]");
    let $subtrai = document.querySelector("[data-js=subtrai]");
    let $multiplica = document.querySelector("[data-js=multiplica]");
    let $dividi = document.querySelector("[data-js=dividi]");
    let $virgula = document.querySelector("[data-js=virgula]");
    let $maisOuMenos = document.querySelector("[data-js=maisOuMenos]");
    let $igual = document.querySelector("[data-js=igual]");

    let $inputValor = document.querySelector("[data-js=valor]");

    $um.addEventListener("click", event => addValor("1"), false);
    $dois.addEventListener("click", event => addValor("2"), false);
    $tres.addEventListener("click", event => addValor("3"), false);
    $quatro.addEventListener("click", event => addValor("4"), false);
    $cinco.addEventListener("click", event => addValor("5"), false);
    $seis.addEventListener("click", event => addValor("6"), false);
    $sete.addEventListener("click", event => addValor("7"), false);
    $oito.addEventListener("click", event => addValor("8"), false);
    $nove.addEventListener("click", event => addValor("9"), false);

    document.addEventListener("keydown", event => {
        let tecla = event.key;

        if (/^\d+$/g.test(tecla))
            addValor(tecla);

        if (tecla === "Backspace") apagarAEsquerda();

        if (tecla === "Delete") limpar();

        if (/[\.,]/.test(tecla)) addVirgula();

        if (/[-+*/]$/.test(tecla)) addOperador(tecla);

        if (tecla === "Enter" || tecla === "=")
            mostrarResultado();

        if (tecla === "_")
            ;
    });

    $zero.addEventListener("click", event => {
        if (!isZerado($inputValor.value) || !travarZeroAEsquerda)
            return addValor("0");

    }, false);

    $ce.addEventListener("click", event => {
        let valorAtual = $inputValor.value;
        if (isUmValor(valorAtual))
            return;

        let regex = new RegExp("" + getUltimoValor(valorAtual) + "$");
        $inputValor.value = valorAtual.replace(regex, "")
    }, false);

    $c.addEventListener("click", limpar, false);

    $backspace.addEventListener("click", apagarAEsquerda, false);

    $virgula.addEventListener("click", addVirgula, false);

    $maisOuMenos.addEventListener("click", event => {
        let valorAtual = $inputValor.value;
        let ultimoValor = getUltimoValor(valorAtual);
        let regex = new RegExp("" + ultimoValor + "$");

        valorAtual = valorAtual.replace(regex, "");

        if (/-/.test(ultimoValor) || isZerado(valorAtual))
            return $inputValor.value = valorAtual + ultimoValor.replace(/^-/, "");

        $inputValor.value = valorAtual + "-" + ultimoValor;
    });

    $soma.addEventListener("click", event => addOperador("+"), false);
    $subtrai.addEventListener("click", event => addOperador("-"), false);
    $multiplica.addEventListener("click", event => addOperador("*"), false);
    $dividi.addEventListener("click", event => addOperador("/"), false);
    $igual.addEventListener("click", mostrarResultado, false);


    function addOperador(operador) {
        let valorAtual = $inputValor.value;
        if (/[-+*/]$/.test(valorAtual))
            return $inputValor.value = valorAtual.replace(/[-+*/]$/, operador);

        $inputValor.value += operador;
    }

    function addVirgula() {
        let valorAtual = $inputValor.value;
        if (isZerado(valorAtual))
            travarZeroAEsquerda = false;

        if (!/\./.test(getUltimoValor(valorAtual)))
            addValor(".");
    }

    function addValor(valor) {
        if (isZerado($inputValor.value) && travarZeroAEsquerda)
            $inputValor.value = "";

        $inputValor.value += valor;
        travarZeroAEsquerda = true;
    }

    function apagarAEsquerda() {
        travarZeroAEsquerda = true;
        let valorAtual = $inputValor.value;

        if (isZerado(valorAtual))
            return;

        valorAtual = valorAtual.substring(0, valorAtual.length - 1);
        $inputValor.value = valorAtual || "0";
    }

    function limpar() {
        travarZeroAEsquerda = true;
        $inputValor.value = "0";
    }

    function mostrarResultado() {
        if (isUmValor($inputValor.value))
            return;

        $inputValor.value = calcular($inputValor.value);
    }

    let isZerado = valor => valor === "0";

})(window, document);