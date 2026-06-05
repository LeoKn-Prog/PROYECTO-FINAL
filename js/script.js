// =====================================
// ARREGLO DE PRODUCTOS
// =====================================

let productos = [];

// =====================================
// REFERENCIAS DOM
// =====================================

const presupuestoInput =
document.getElementById("presupuesto");

const productoInput =
document.getElementById("producto");

const precioInput =
document.getElementById("precio");

const cantidadInput =
document.getElementById("cantidad");

const tablaProductos =
document.getElementById("tablaProductos");

const resultado =
document.getElementById("resultado");

const progreso =
document.getElementById("progreso");

const textoPorcentaje =
document.getElementById("textoPorcentaje");

// =====================================
// EVENTOS
// =====================================

document
.getElementById("agregar")
.addEventListener("click", agregarProducto);

document
.getElementById("calcular")
.addEventListener("click", calcularCompra);

document
.getElementById("limpiar")
.addEventListener("click", limpiarTodo);

// =====================================
// AGREGAR PRODUCTO
// =====================================

function agregarProducto(){

    let producto =
    productoInput.value.trim();

    let precio =
    Number(precioInput.value);

    let cantidad =
    Number(cantidadInput.value);

    if(
        producto === "" ||
        precio <= 0 ||
        cantidad <= 0
    ){
        alert(
            "Complete correctamente todos los campos."
        );
        return;
    }

    let subtotal =
    precio * cantidad;

    productos.push({
        producto,
        precio,
        cantidad,
        subtotal
    });

    actualizarTabla();

    productoInput.value = "";
    precioInput.value = "";
    cantidadInput.value = "";

    productoInput.focus();
}

// =====================================
// TABLA
// =====================================

function actualizarTabla(){

    tablaProductos.innerHTML = "";

    productos.forEach(p => {

        tablaProductos.innerHTML += `
        <tr>
            <td>${p.producto}</td>
            <td>Bs ${p.precio}</td>
            <td>${p.cantidad}</td>
            <td>Bs ${p.subtotal}</td>
        </tr>
        `;

    });

}

// =====================================
// CALCULAR COMPRA
// =====================================

function calcularCompra(){

    let presupuesto =
    Number(presupuestoInput.value);

    if(presupuesto <= 0){

        alert(
            "Ingrese un presupuesto válido."
        );

        return;
    }

    if(productos.length === 0){

        alert(
            "Debe agregar al menos un producto."
        );

        return;
    }

    let total = 0;

    productos.forEach(p => {

        total += p.subtotal;

    });

    let saldo =
    presupuesto - total;

    let porcentaje =
    Math.floor(
        (total * 100) / presupuesto
    );

    actualizarBarra(porcentaje);

    mostrarResultado(
        presupuesto,
        total,
        saldo,
        porcentaje
    );

    // Lleva automáticamente
    // a la sección de resultados

    document
    .getElementById("resultados")
    .scrollIntoView({
        behavior:"smooth"
    });

}

// =====================================
// RESULTADO
// =====================================

function mostrarResultado(
    presupuesto,
    total,
    saldo,
    porcentaje
){

    let clasificacion = "";
    let mensaje = "";
    let clase = "";

    if(total > presupuesto){

        clase = "peligro";

        clasificacion =
        "Presupuesto insuficiente";

        mensaje =
        "La compra supera el presupuesto disponible.";

        resultado.className =
        "card resultado-card peligro";

        resultado.innerHTML = `
            <h2>Resultados</h2>

            <p>
                <strong>Total de compra:</strong>
                Bs ${total}
            </p>

            <p>
                <strong>Monto faltante:</strong>
                Bs ${Math.abs(saldo)}
            </p>

            <p>
                <strong>Clasificación:</strong>
                ${clasificacion}
            </p>

            <p>
                <strong>Interpretación:</strong>
                ${mensaje}
            </p>
        `;

        return;
    }

    if(porcentaje < 50){

        clase = "exito";

        clasificacion =
        "Gasto Bajo";

        mensaje =
        "Excelente administración del presupuesto.";

    }
    else if(porcentaje <= 80){

        clase = "alerta";

        clasificacion =
        "Gasto Medio";

        mensaje =
        "El presupuesto es adecuado para la compra.";

    }
    else{

        clase = "peligro";

        clasificacion =
        "Gasto Alto";

        mensaje =
        "La compra está cerca del límite del presupuesto.";

    }

    resultado.className =
    `card resultado-card ${clase}`;

    resultado.innerHTML = `
        <h2>Resultados</h2>

        <p>
            <strong>Total de compra:</strong>
            Bs ${total}
        </p>

        <p>
            <strong>Saldo restante:</strong>
            Bs ${saldo}
        </p>

        <p>
            <strong>Clasificación:</strong>
            ${clasificacion}
        </p>

        <p>
            <strong>Interpretación:</strong>
            ${mensaje}
        </p>
    `;

}

// =====================================
// BARRA DE PROGRESO
// =====================================

function actualizarBarra(porcentaje){

    let valor = porcentaje;

    if(valor > 100){
        valor = 100;
    }

    progreso.style.width =
    valor + "%";

    textoPorcentaje.textContent =
    porcentaje +
    "% del presupuesto utilizado";

    if(porcentaje < 50){

        progreso.style.background =
        "linear-gradient(90deg,#22c55e,#16a34a)";
    }
    else if(porcentaje <= 80){

        progreso.style.background =
        "linear-gradient(90deg,#f59e0b,#d97706)";
    }
    else{

        progreso.style.background =
        "linear-gradient(90deg,#ef4444,#dc2626)";
    }

}

// =====================================
// LIMPIAR
// =====================================

function limpiarTodo(){

    productos = [];

    tablaProductos.innerHTML = "";

    presupuestoInput.value = "";

    productoInput.value = "";
    precioInput.value = "";
    cantidadInput.value = "";

    progreso.style.width = "0%";

    textoPorcentaje.textContent =
    "0%";

    resultado.className =
    "card resultado-card";

    resultado.innerHTML = `
        <h2>Resultados</h2>

        <p>
            Ingrese productos y presione
            "Calcular Compra".
        </p>
    `;
}

// =====================================
// FUNCIÓN CASOS
// =====================================

function cargarCaso(
    presupuesto,
    listaProductos
){

    presupuestoInput.value =
    presupuesto;

    productos =
    listaProductos;

    actualizarTabla();

    // Baja automáticamente
    // hacia el simulador

    document
    .getElementById("simulador")
    .scrollIntoView({
        behavior:"smooth"
    });

}

// =====================================
// CASO 1
// =====================================

document
.getElementById("caso1")
.addEventListener("click", () => {

    cargarCaso(
        500,
        [
            {
                producto:"Arroz",
                precio:58,
                cantidad:5,
                subtotal:290
            },
            {
                producto:"Aceite",
                precio:58,
                cantidad:5,
                subtotal:290
            }
        ]
    );

});

// =====================================
// CASO 2
// =====================================

document
.getElementById("caso2")
.addEventListener("click", () => {

    cargarCaso(
        1000,
        [
            {
                producto:"Arroz",
                precio:20,
                cantidad:5,
                subtotal:100
            },
            {
                producto:"Aceite",
                precio:18,
                cantidad:4,
                subtotal:72
            },
            {
                producto:"Azúcar",
                precio:10,
                cantidad:3,
                subtotal:30
            }
        ]
    );

});

// =====================================
// CASO 3
// =====================================

document
.getElementById("caso3")
.addEventListener("click", () => {

    cargarCaso(
        800,
        [
            {
                producto:"Leche",
                precio:12,
                cantidad:15,
                subtotal:180
            },
            {
                producto:"Arroz",
                precio:20,
                cantidad:10,
                subtotal:200
            },
            {
                producto:"Aceite",
                precio:18,
                cantidad:8,
                subtotal:144
            }
        ]
    );

});

// =====================================
// CASO 4
// =====================================

document
.getElementById("caso4")
.addEventListener("click", () => {

    cargarCaso(
        1200,
        [
            {
                producto:"Azúcar",
                precio:10,
                cantidad:5,
                subtotal:50
            },
            {
                producto:"Harina",
                precio:15,
                cantidad:6,
                subtotal:90
            },
            {
                producto:"Arroz",
                precio:14,
                cantidad:10,
                subtotal:140
            }
        ]
    );

});