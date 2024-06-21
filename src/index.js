


var methodElement = document.getElementById('method');

function setMethod() {
    var selectElement = document.getElementById("inputMethod");
    var selectedValue = selectElement.value;

    if (selectedValue == "1") {
        setLagrange();
    } else if (selectedValue == "2") {
        setNewton();
    }
}

let n = 3;
let elements = [];

function setLagrange() {
    methodElement.innerHTML = `
                <h4>Método de Lagrange</h4>
                <h5>Insira os valores</h5>
                <div id="input-container">
                    <div class="d-flex gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text">X0</span>
                            <input type="number" class="form-control" id="point-x0">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Y0</span>
                            <input type="number" class="form-control" id="point-y0">
                        </div>
                    </div>
                    <div class="d-flex gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text">X1</span>
                            <input type="number" class="form-control" id="point-x1">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Y1</span>
                            <input type="number" class="form-control" id="point-y1">
                        </div>
                    </div>
                    <div class="d-flex gap-2">
                        <div class="input-group mb-3">
                            <span class="input-group-text">X2</span>
                            <input type="number" class="form-control" id="point-x2">
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Y2</span>
                            <input type="number" class="form-control" id="point-y2">
                        </div>
                    </div>

                </div>
                <div id="button-group" class="d-flex flex-column gap-2">
                    <button type="button" id="add-button"
                        class="btn btn-info rounded-5 w-100 d-flex align-items-center justify-content-center"
                        onclick="addPoint()" style="height: 2.5rem">
                        <i class="fi fi-br-plus text-white fw-bold"></i>
                    </button>
                </div>

                <div class="mt-5">
                    <div class="input-group mb-5 px-5">
                        <span class="input-group-text">Ponto a ser interpolado</span>
                        <input type="number" class="form-control" id="value-point">
                    </div>
                    <button
                        class="btn rounded-5 w-100 d-flex align-items-center justify-content-center border border-3 border-info">
                        <span class="fw-bold text-uppercase text-info" onclick="calcularLagrange();">Calcular</span>
                    </button>
                </div>

                <div class="d-flex justify-content-center">
                     <div id="result" class="d-flex flex-column align-items-center gap-2 text-center p-4 w-75"></div>
                </div>
               
    `;
}

function calcularLagrange() {
    var pontoX = parseFloat(document.getElementById('value-point').value);

    var pontos = [];
    for (var i = 0; i < n; i++) {
        var x = parseFloat(document.getElementById('point-x' + i).value);
        var y = parseFloat(document.getElementById('point-y' + i).value);
        pontos.push({ x: x, y: y });
    }

    var resultado = interpolarLagrange(pontoX, pontos);
    var resultElement = document.getElementById('result');
    resultElement.innerHTML = `<div><h4>Detalhes do Cálculo:</h4>${resultado.detalhes}</div>`;
    resultElement.innerHTML += `<div><h4>Resultado</h4> <p>O valor interpolado para x = ${pontoX} é ${resultado.valor}</p></div>`;
}

function interpolarLagrange(x, pontos) {
    var resultado = 0;
    var detalhes = '';

    for (var i = 0; i < pontos.length; i++) {
        var termo = pontos[i].y;
        var termoDetalhes = `${pontos[i].y}`;

        for (var j = 0; j < pontos.length; j++) {
            if (j !== i) {
                termo *= (x - pontos[j].x) / (pontos[i].x - pontos[j].x);
                termoDetalhes += ` * ((${x} - ${pontos[j].x}) / (${pontos[i].x} - ${pontos[j].x}))`;

            }
        }

        resultado += termo;
        detalhes += `<p>L${i} = ${termoDetalhes} = ${termo.toFixed(6)}</p>`;
    }
    return { valor: resultado, detalhes: detalhes };
}

function setNewton() {
    methodElement.innerHTML = `
    <h4>Método de Newton</h4>
    <h5>Insira os valores</h5>
    <div id="input-container">
        <div class="d-flex gap-2">
            <div class="input-group mb-3">
                <span class="input-group-text">X0</span>
                <input type="number" class="form-control" id="point-x0">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Y0</span>
                <input type="number" class="form-control" id="point-y0">
            </div>
        </div>
        <div class="d-flex gap-2">
            <div class="input-group mb-3">
                <span class="input-group-text">X1</span>
                <input type="number" class="form-control" id="point-x1">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Y1</span>
                <input type="number" class="form-control" id="point-y1">
            </div>
        </div>
        <div class="d-flex gap-2">
            <div class="input-group mb-3">
                <span class="input-group-text">X2</span>
                <input type="number" class="form-control" id="point-x2">
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text">Y2</span>
                <input type="number" class="form-control" id="point-y2">
            </div>
        </div>

    </div>
    <div id="button-group" class="d-flex flex-column gap-2">
        <button type="button" id="add-button"
            class="btn btn-info rounded-5 w-100 d-flex align-items-center justify-content-center"
            onclick="addPoint()" style="height: 2.5rem">
            <i class="fi fi-br-plus text-white fw-bold"></i>
        </button>
    </div>

    <div class="mt-5">
        <div class="input-group mb-5 px-5">
            <span class="input-group-text">Ponto a ser interpolado</span>
            <input type="number" class="form-control" id="value-point">
        </div>
        <button
            class="btn rounded-5 w-100 d-flex align-items-center justify-content-center border border-3 border-info">
            <span class="fw-bold text-uppercase text-info" onclick="calcularNewton();">Calcular</span>
        </button>
    </div>

   <div class="d-flex justify-content-center">
        <div id="result" class="d-flex flex-column align-items-center gap-2 text-center p-4  w-75"></div>
   </div>
`;
}

function calcularNewton() {

    var pontoX = parseFloat(document.getElementById('value-point').value);

    var pontos = [];
    for (var i = 0; i < n; i++) {
        var x = parseFloat(document.getElementById('point-x' + i).value);
        var y = parseFloat(document.getElementById('point-y' + i).value);
        pontos.push({ x: x, y: y });
    }

    var resultado = interpolarNewton(pontoX, pontos);

    var resultElement = document.getElementById('result');
    resultElement.innerHTML = `<div><h4>Detalhes do Cálculo:</h4>${resultado.detalhes}</div>`;
    resultElement.innerHTML += `<div><h4>Resultado</h4> <p>O valor interpolado para x = ${pontoX} é ${resultado.valor}</p></div>`;

}

function interpolarNewton(x, pontos) {
    var n = pontos.length;
    var a = new Array(n).fill(0).map(() => new Array(n).fill(0));
    var y = pontos.map(p => p.y);
    var detalhes = '';

    for (var i = 0; i < n; i++) {
        a[i][0] = y[i];
    }

    for (var j = 1; j < n; j++) {
        for (var i = 0; i < n - j; i++) {
            a[i][j] = (a[i + 1][j - 1] - a[i][j - 1]) / (pontos[i + j].x - pontos[i].x);
            detalhes += `<p>(${a[i + 1][j - 1]} - ${a[i][j - 1]}) / (${pontos[i + j].x} - ${ pontos[i].x}) = ${a[i][j]}</p>`;
        }
    }

    var resultado = a[0][0];
    var termos = `${a[0][0]}`;

    for (var i = 1; i < n; i++) {
        var termo = a[0][i];
        var termoDetalhes = `(${a[0][i]})`;

        for (var j = 0; j < i; j++) {
            termo *= (x - pontos[j].x);
            termoDetalhes += ` * (${x} - ${pontos[j].x})`;
        }

        resultado += termo;
        termos += ` + ${termoDetalhes}`;
        
    }

    detalhes += `<p>P(${x}) = ${termos}</p>`;
    return { valor: resultado, detalhes: detalhes };
}

function addPoint() {

    if (n < 5) {
        var newDflex = document.createElement('div');
        newDflex.className = 'd-flex gap-2';

        var inputGroup1 = document.createElement('div');
        inputGroup1.className = 'input-group mb-3';
        var span1 = document.createElement('span');
        span1.className = 'input-group-text';
        span1.textContent = 'X' + n;
        var input1 = document.createElement('input');
        input1.type = 'number';
        input1.className = 'form-control';
        input1.id = 'point-x' + n;
        inputGroup1.appendChild(span1);
        inputGroup1.appendChild(input1);

        var inputGroup2 = document.createElement('div');
        inputGroup2.className = 'input-group mb-3';
        var span2 = document.createElement('span');
        span2.className = 'input-group-text';
        span2.textContent = 'Y' + n;
        var input2 = document.createElement('input');
        input2.type = 'number';
        input2.className = 'form-control';
        input2.id = 'point-y' + n;
        inputGroup2.appendChild(span2);
        inputGroup2.appendChild(input2);

        newDflex.appendChild(inputGroup1);
        newDflex.appendChild(inputGroup2);

        document.getElementById('input-container').appendChild(newDflex);

        elements.push(newDflex);
        n += 1;


        if (n == 5) {
            const button = document.getElementById('add-button');
            button.style.visibility = 'hidden';
        }
    }

    if (n > 3 && !document.getElementById('remove-button')) {
        var removeButton = document.createElement('button');
        removeButton.id = 'remove-button';
        removeButton.className = 'btn rounded-5 w-100 d-flex align-items-center justify-content-center border border-3 border-danger';
        removeButton.style.height = '2.5rem';
        removeButton.addEventListener('click', removePoint);
        var icon = document.createElement('i');
        icon.classList.add('fi', 'fi-br-trash', 'text-danger');
        removeButton.appendChild(icon);
        document.getElementById('button-group').appendChild(removeButton);
    }

}

function removePoint() {
    if (elements.length > 0) {
        const lastElement = elements.pop();
        lastElement.remove();
        n -= 1;

        if (n < 5) {
            const button = document.getElementById('add-button');
            button.style.visibility = 'visible';
        }
        if (n == 3) {
            const removeButton = document.getElementById('remove-button');
            removeButton.remove();
        }
    }
}




