// app.js
import { productos } from './data.js';

let carrito = [];

const catalogoGrid = document.getElementById('catalogo-grid');
const resumenCotizacion = document.getElementById('resumen-cotizacion');
const contadorCarrito = document.getElementById('contador-carrito');
const precioTotal = document.getElementById('precio-total');
const btnWhatsApp = document.getElementById('btn-enviar-whatsapp');

// Formateador de moneda
const formatoMoneda = (monto) => {
    return monto === 0 ? 'A Cotizar' : `$${monto.toFixed(2)}`;
};

// 1. Renderizar el Catálogo en Pantalla
function cargarCatalogo() {
    catalogoGrid.innerHTML = '';
    productos.forEach(prod => {
        const tarjeta = document.createElement('div');
        tarjeta.className = "bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col justify-between group";
        
        // Etiqueta dinámica de precio
        const displayPrecio = prod.precio === 0 
            ? `<span class="font-bold text-emerald-600 text-lg bg-emerald-50 px-3 py-1 rounded-full">Por Cotizar</span>`
            : `<span class="font-black text-slate-800 text-xl">$${prod.precio.toFixed(2)}</span>`;

        tarjeta.innerHTML = `
            <div>
                <div class="relative overflow-hidden">
                    <img src="${prod.imagen}" alt="${prod.nombre}" class="w-full h-52 object-cover transform group-hover:scale-105 transition duration-500">
                    <div class="absolute top-3 right-3 bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        ${prod.categoria}
                    </div>
                </div>
                <div class="p-5">
                    <h4 class="font-bold text-xl text-slate-900 leading-tight">${prod.nombre}</h4>
                    <p class="text-slate-500 text-sm mt-3 leading-relaxed">${prod.descripcion}</p>
                </div>
            </div>
            <div class="p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50">
                ${displayPrecio}
                <button data-id="${prod.id}" class="btn-agregar bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 active:bg-blue-800 transition shadow-sm hover:shadow-md flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
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
            // Efecto visual rápido
            const btnOriginal = e.target.innerHTML;
            e.target.innerHTML = "¡Agregado!";
            e.target.classList.replace('bg-blue-600', 'bg-emerald-500');
            setTimeout(() => {
                e.target.innerHTML = btnOriginal;
                e.target.classList.replace('bg-emerald-500', 'bg-blue-600');
            }, 800);
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
    let totalMonto = 0;
    let cantidadTotalItems = 0;
    let hayProductosPorCotizar = false;

    if (carrito.length === 0) {
        resumenCotizacion.innerHTML = `<p class="text-slate-500 text-sm text-center py-4 bg-slate-50 rounded-lg border border-dashed border-slate-200">No has seleccionado ningún producto o servicio todavía.</p>`;
        precioTotal.textContent = "$0.00";
        contadorCarrito.textContent = "0";
        return;
    }

    carrito.forEach((item, index) => {
        const subtotal = item.precio * item.cantidad;
        totalMonto += subtotal;
        cantidadTotalItems += item.cantidad;

        if (item.precio === 0) hayProductosPorCotizar = true;

        const displaySubtotal = item.precio === 0 ? 'A Cotizar' : `$${subtotal.toFixed(2)}`;

        const elemento = document.createElement('div');
        elemento.className = "flex justify-between items-center text-sm border-b border-slate-100 pb-3 hover:bg-slate-50 p-2 rounded transition";
        elemento.innerHTML = `
            <div class="flex-1 pr-2">
                <p class="font-bold text-slate-800 line-clamp-1" title="${item.nombre}">${item.nombre}</p>
                <div class="flex items-center gap-2 mt-1">
                    <p class="text-slate-500 text-xs bg-slate-200 px-2 py-0.5 rounded">Cant: ${item.cantidad}</p>
                    <p class="text-slate-400 text-xs">${formatoMoneda(item.precio)} c/u</p>
                </div>
            </div>
            <div class="flex flex-col items-end">
                <span class="font-black text-slate-700">${displaySubtotal}</span>
                <button class="text-red-400 hover:text-red-600 text-xs mt-1 btn-eliminar flex items-center" data-index="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    Quitar
                </button>
            </div>
        `;
        resumenCotizacion.appendChild(elemento);
    });

    // Eventos para eliminar ítems
    document.querySelectorAll('.btn-eliminar').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            carrito.splice(index, 1);
            actualizarInterfazCotizador();
        });
    });

    // Renderizar Total
    let textoTotal = `$${totalMonto.toFixed(2)}`;
    if (hayProductosPorCotizar && totalMonto > 0) {
        textoTotal += ' + Extras';
    } else if (hayProductosPorCotizar && totalMonto === 0) {
        textoTotal = 'Pendiente';
    }
    
    precioTotal.textContent = textoTotal;
    contadorCarrito.textContent = cantidadTotalItems;
}

// 3. Conexión con WhatsApp
btnWhatsApp.addEventListener('click', () => {
    if (carrito.length === 0) {
        alert("Agrega al menos un equipo o sistema para generar tu cotización.");
        return;
    }

    let mensaje = "👋 Hola equipo, me interesa cotizar los siguientes requerimientos tecnológicos:\n\n";
    let total = 0;
    let hayPorCotizar = false;

    carrito.forEach(item => {
        const subtotalStr = item.precio === 0 ? '(Precio por definir)' : `($${(item.precio * item.cantidad).toFixed(2)})`;
        mensaje += `▪ ${item.cantidad}x ${item.nombre} ${subtotalStr}\n`;
        total += item.precio * item.cantidad;
        if(item.precio === 0) hayPorCotizar = true;
    });

    mensaje += `\n*-----------------------------*`;
    if (total > 0) {
        mensaje += `\n*Base estimada:* $${total.toFixed(2)}`;
    }
    if (hayPorCotizar) {
        mensaje += `\n*(Incluye requerimientos a medida sujetos a cotización)*`;
    }

    const numeroWhatsApp = "50557050229"; // Tu número actual
    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
});

// Inicializar Aplicación
cargarCatalogo();
