document.addEventListener('DOMContentLoaded', () => {
    const numero1Input = document.getElementById('numero1');
    const numero2Input = document.getElementById('numero2');
    const resultadoDiv = document.getElementById('resultado');

    cargarResultados();

    document.getElementById('sumar').addEventListener('click', () => {
        calcular('+');
    });

    document.getElementById('restar').addEventListener('click', () => {
        calcular('-');
    });

    document.getElementById('multiplicar').addEventListener('click', () => {
        calcular('*');
    });

    document.getElementById('dividir').addEventListener('click', () => {
        calcular('/');
    });

    document.getElementById('verResultados').addEventListener('click', () => {
        cargarResultados();
    });
    
    

    function calcular(operador) {
        const numero1 = parseFloat(numero1Input.value);
        const numero2 = parseFloat(numero2Input.value);

        if (isNaN(numero1) || isNaN(numero2)) {
            resultadoDiv.textContent = 'Por favor, ingrese números válidos.';
            return;
        }

        let resultado;
        switch (operador) {
            case '+':
                resultado = numero1 + numero2;
                break;
            case '-':
                resultado = numero1 - numero2;
                break;
            case '*':
                resultado = numero1 * numero2;
                break;
            case '/':
                if (numero2 === 0) {
                    resultadoDiv.textContent = 'La división por cero no está definida.';
                    return;
                }
                resultado = numero1 / numero2;
                break;
            default:
                resultado = 'Operador no válido.';
        }

        resultadoDiv.textContent = `El resultado es: ${resultado}`;
        guardarResultado(`${numero1} ${operador} ${numero2} = ${resultado}`);
    }

    function guardarResultado(resultado) {
        if (localStorage.getItem('resultados')) {
            const resultados = JSON.parse(localStorage.getItem('resultados'));
            resultados.push(resultado);
            localStorage.setItem('resultados', JSON.stringify(resultados));
        } else {
            localStorage.setItem('resultados', JSON.stringify([resultado]));
        }
    }

    function cargarResultados() {
        if (localStorage.getItem('resultados')) {
            const resultados = JSON.parse(localStorage.getItem('resultados'));
            resultadoDiv.textContent = 'Todos los resultados guardados:';
            resultadoDiv.innerHTML = ''; // Limpiamos el contenido anterior
            resultados.forEach(resultado => {
                const p = document.createElement('p');
                p.textContent = resultado;
                resultadoDiv.appendChild(p);
            });
        } else {
            resultadoDiv.textContent = 'No hay resultados guardados.';
        }
    }
    
    
});
