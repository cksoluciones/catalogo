import { productos } from './data.js';

let carrito = [];

const catalogoGrid = document.getElementById('catalogo-grid');
const resumenCotizacion = document.getElementById('resumen-cotizacion');
const contadorCarrito = document.getElementById('contador-carrito');
const precioTotal = document.getElementById('precio-total');
const btnWhatsApp = document.getElementById('btn-enviar-whatsapp');

// 1. Renderizar el Catálogo en Pantalla
function cargarCatalogo() {
    catalogoGrid.innerHTML = '';
    productos.forEach(prod => {
        const tarjeta = document.createElement('div');
        tarjeta.className = "bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col justify-between";
        tarjeta.innerHTML = `
            <div>
                <img src="${prod.imagen}" alt="${prod.nombre}" class="w-full h-48 object-cover">
                <div class="p-4">
                    <h4 class="font-bold text-lg text-slate-900">${prod.nombre}</h4>
                    <p class="text-slate-600 text-sm mt-1">${prod.descripcion}</p>
                </div>
            </div>
            <div class="p-4 bg-slate-50 border-t flex items-center justify-between">
                <span class="font-bold text-blue-600 text-lg">$${prod.precio.toFixed(2)}</span>
                <button data-id="${prod.id}" class="btn-agregar bg-slate-900 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-800 transition">
                    Añadir
                </button>
            </div>
        `;
        catalogoGrid.appendChild(tarjeta);
    });

    // Activar eventos de los botones
    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.getAttribute('data-id'));
            agregarAlCarrito(id);
        });
    });
}

// 2. Gestionar Estado del Carrito/Cotizador
function agregarAlCarrito(id) {
    const productoEncontrado = productos.find(p => p.id === id);
    const itemEnCarrito = carrito.find(item => item.id === id);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad += 1;
    } else {
        carrito.push({ ...productoEncontrado, cantidad: 1 });
    }
    actualizarInterfazCotizador();
}

function actualizarInterfazCotizador() {
    resumenCotizacion.innerHTML = '';
    let total = 0;
    let cantidadTotalItems = 0;

    if (carrito.length === 0) {
        resumenCotizacion.innerHTML = `<p class="text-slate-500 text-sm">No has seleccionado ningún producto todavía.</p>`;
        precioTotal.textContent = "$0.00";
        contadorCarrito.textContent = "0";
        return;
    }

    carrito.forEach(item => {
        total += item.precio * item.cantidad;
        cantidadTotalItems += item.cantidad;

        const elemento = document.createElement('div');
        elemento.className = "flex justify-between items-center text-sm border-b pb-2";
        elemento.innerHTML = `
            <div>
                <p class="font-semibold text-slate-800">${item.nombre}</p>
                <p class="text-slate-500">Cant: ${item.cantidad} x $${item.precio.toFixed(2)}</p>
            </div>
            <span class="font-bold text-slate-700">$${(item.precio * item.cantidad).toFixed(2)}</span>
        `;
        resumenCotizacion.appendChild(elemento);
    });

    precioTotal.textContent = `$${total.toFixed(2)}`;
    contadorCarrito.textContent = cantidadTotalItems;
}

// 3. Conexión con WhatsApp
btnWhatsApp.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert("Por favor selecciona al menos un producto para cotizar.");
        return;
    }

    let mensaje = "Hola, me gustaría solicitar la siguiente cotización:\n\n";
    let total = 0;

    carrito.forEach(item => {
        mensaje += `- ${item.cantidad}x ${item.nombre} ($${(item.precio * item.cantidad).toFixed(2)})\n`;
        total += item.precio * item.cantidad;
    });

    mensaje += `\n*Total Estimado: $${total.toFixed(2)}*`;

    const numeroWhatsApp = "50557050229"; // REEMPLAZA CON TU NÚMERO
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
});

// Inicializar Aplicación
cargarCatalogo();