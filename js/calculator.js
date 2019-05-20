{
    "use strict";
    const calculadora = {
        "+": (valor1, valor2) => valor1 + valor2,
        "-": (valor1, valor2) => valor1 - valor2,
        "*": (valor1, valor2) => valor1 * valor2,
        "/": (valor1, valor2) => valor1 / valor2,
        "": (valor1, valor2) => ""
    }

    function realizarOperacao(operador, valor1, valor2) {
        return calculadora[operador](valor1, valor2);
    }

    function separarValores(string) {
        const SEPARA_VALORES =
            new RegExp("(-?[\\.\\d]+)([" + getOperadores().join("") + "])?", "g");
        return string.match(SEPARA_VALORES);
    }

    function contemUmValor(string) {
        return separarValores(string).length === 1;
    }

    function getUltimoValor(valor) {
        return separarValores(valor).pop();
    }

    function getOperador(string) {
        let valores = string.match(getPegaOperadores());
        if (valores == null)
            return "";
        return valores[0];
    }

    function getNumero(string) {
        return Number(string.replace(/[\D]$/, ""));
    }

    function calcular(string) {
        let valores = separarValores(string);
        let acumulado = 0;
        for (let i = 0; i < valores.length - 1; i++) {
            let valor1 = getNumero(valores[i]);
            let valor2 = getNumero(valores[i + 1])
            let operador = getOperador(valores[i]);
            if (i === 0)
                acumulado = valor1;
            acumulado = realizarOperacao(operador, acumulado, valor2);
        }
        return acumulado;
    }

    //Outra solução
    // function calcular(valor) {
    //     let valores = separarValores(valor);
    //     return valores.reduce(function (acumulado, atual) {
    //         let valor1 = getNumero(acumulado);
    //         let operador = getOperador(acumulado);
    //         let valor2 = getNumero(atual);
    //         let lastOperador = contemOperador(atual) ? getOperador(atual) : "";

    //         return realizarOperacao(operador, valor1, valor2) + lastOperador;
    //     });
    // }
}