{
    const SEPARA_VALOR = /(-?[\.\d]+)([-+\/*])?/g;

    let calculadora = {
        "+": (valor1, valor2) => valor1 + valor2,
        "-": (valor1, valor2) => valor1 - valor2,
        "*": (valor1, valor2) => valor1 * valor2,
        "/": (valor1, valor2) => valor1 / valor2
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
            return false;
        return valores[0];
    }

    function getNumero(valor) {
        return Number(valor.replace(/[^-\d]/, ""));
    }

    function calcular(valor) {
        let valores = separarValores(valor);
        for (var i = 0; i < valores.length; i++) {
            let valor1 = getNumero(valores[i]);
            let valor2 = Number(valores[i + 1]);
            let operador = getOperador(valores[i]);

            if (i === 0)
                acumulado = valor1;

            acumulado = getOperacao(operador)(acumulado, valor2);
        }
        return acumulado;
    }

    console.log(separarValores("1+2+3"));
    console.log(getNumero("-1+"))
    console.log(getOperador("-1+"))
    console.log(calcular("1+2"));
}