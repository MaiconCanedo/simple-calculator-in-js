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
    const ZERO = "0.";
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

    let $inputValor = document.querySelector("[data-js=valor]");

    $um.addEventListener("click", event => setValor("1"), false);
    $dois.addEventListener("click", event => setValor("2"), false);
    $tres.addEventListener("click", event => setValor("3"), false);
    $quatro.addEventListener("click", event => setValor("4"), false);
    $cinco.addEventListener("click", event => setValor("5"), false);
    $seis.addEventListener("click", event => setValor("6"), false);
    $sete.addEventListener("click", event => setValor("7"), false);
    $oito.addEventListener("click", event => setValor("8"), false);
    $nove.addEventListener("click", event => setValor("9"), false);

    $zero.addEventListener("click", event => {
        if (!isZerado($inputValor.value))
            setValor("0");
    }, false);

    $ce.addEventListener("click", event => $inputValor.value = ZERO, false);

    $backspace.addEventListener("click", event => {
        let valorAtual = $inputValor.value;

        if (isZerado(valorAtual))
            return;

        valorAtual = valorAtual.substring(0, valorAtual.length - 1);
        $inputValor.value = valorAtual || ZERO;
    }, false);

    $virgula.addEventListener("click", event => {
        let valorAtual = $inputValor.value;
        if (isZerado(valorAtual))
            return travarZeroAEsquerda = true;

        if (!/\./.test(valorAtual))
            setValor(".");
    });

    $maisOuMenos.addEventListener("click", event => {
        let valorAtual = $inputValor.value;

        if (/-/.test(valorAtual) || isZerado(valorAtual))
            return $inputValor.value = $inputValor.value.replace("-", "");

        $inputValor.value = "-" + $inputValor.value;
    });

    function setValor(valor) {

        if (isZerado($inputValor.value) && )
            $inputValor.value = "";

        $inputValor.value += valor;
    }

    let isZerado = valor => valor === ZERO;

})(window, document);