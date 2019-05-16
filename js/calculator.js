{
    const SEPARA_VALOR = /(-?[\.\d]+)([-+*/])?/g;

    let calculadora = {
        "+": (valor1, valor2) => valor1 + valor2,
        "-": (valor1, valor2) => valor1 - valor2,
        "*": (valor1, valor2) => valor1 * valor2,
        "/": (valor1, valor2) => valor1 / valor2,
        "": (valor1, valor2) => ""
    }

    function realizarOperacao(operador, valor1, valor2) {
        // if (!operador) return "";
        return calculadora[operador](Number(valor1), Number(valor2));
    }

    function separarValores(valor) {
        return valor.match(SEPARA_VALOR);
    }

    function isUmValor(valor) {
        return separarValores(valor).length === 1;
    }

    function getUltimoValor(valor) {
        var valores = separarValores(valor);
        return valores[valores.length - 1];
    }

    function getOperador(valor) {
        let valores = valor.match(/[-+*/]$/);
        if (valores == null)
            return "";
        return valores[0];
    }

    function getNumero(valor) {
        return valor.replace(/[\D]$/, "");
    }

    function contemOperador(valor) {
        return /[-+*/]$/.test(valor);
    }

    function calcular(valor) {
        let valores = separarValores(valor);
        let acumulado = 0;
        for (let i = 0; i < valores.length - 1; i++) {
            let valor1 = getNumero(valores[i]);
            let valor2 = getNumero(valores[i + 1])
            let operador = getOperador(valores[i]);

            if (i === 0) acumulado = valor1;

            acumulado = realizarOperacao(operador, acumulado, valor2);
        }
        return acumulado;
    }

    function calcular(valor) {
        let valores = separarValores(valor);
        return valores.reduce(function (acumulado, atual) {
            let valor1 = getNumero(acumulado);
            let operador = getOperador(acumulado);
            let valor2 = getNumero(atual);
            let lastOperador = contemOperador(atual) ? getOperador(atual) : "";

            return realizarOperacao(operador, valor1, valor2) + lastOperador;
        });
    }

    console.log(separarValores("-1+-2+-3"));
    console.log(getNumero("-1+"))
    console.log(getOperador("-1+"))
    console.log(calcular("1+2"));
}