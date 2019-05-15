{
    const SEPARA_VALOR = /(-?[\.\d]+)([-+\/*])?/g;

    function getSeparaValor() {
        return SEPARA_VALOR;
    }

    let calculadora = {
        "+": (valor1, valor2) => valor1 + valor2,
        "-": (valor1, valor2) => valor1 - valor2,
        "*": (valor1, valor2) => valor1 * valor2,
        "/": (valor1, valor2) => valor1 / valor2,
        "x": (valor1, valor2) => valor1
    }

    function getOperacao(operador) {
        return calculadora[operador];
    }

    function separarValores(valor) {
        return valor.match(SEPARA_VALOR);
    }

    function getOperador(valor) {
        let valores = valor.match(/[-+*\/]$/);
        if (valores == null)
            return "x";
        return valores[0];
    }

    function getNumero(valor) {
        return Number(valor.replace(/[\D]$/, ""));
    }

    function calcular(valor) {
        let valores = separarValores(valor);
        let acumulado = 0;
        for (let i = 0; i < valores.length - 1; i++) {
            let valor1 = getNumero(valores[i]);
            let valor2 = getNumero(valores[i + 1])
            let operador = getOperador(valores[i]);

            if (i === 0)
                acumulado = valor1;

            acumulado = getOperacao(operador)(acumulado, valor2);
        }
        return acumulado;
    }

    // console.log(separarValores("-1+-2+-3"));
    // console.log(getNumero("-1+"))
    // console.log(getOperador("-1+"))
    // console.log(calcular("-1+-2+-3"));
}