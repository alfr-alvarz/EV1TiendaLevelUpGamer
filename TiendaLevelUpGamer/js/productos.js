const productos = [
    { nombre: "Silla Gamer",
      precio: 33990, 
      imagen: "assets/img/sillagamer.avif", 
      categoria: "sillas", 
      destacado: true },

    { nombre: "Play Station 5", 
      precio: 890000, 
      imagen: "assets/img/play5.webp", 
      categoria: "consolas", 
      destacado: true },

    { nombre: "Pc Gamer ASUS", 
      precio: 678000, 
      imagen: "assets/img/asus.png", 
      categoria: "pc", 
      destacado: false },

    { nombre: "Audífonos Redmi", 
      precio: 14990, 
      imagen: "assets/img/audifonos.webp", 
      categoria: "accesorios", 
      destacado: false },

    
    { nombre: "Mouse Pad",
      precio: 2990,
      imagen: "assets/img/mousepad.avif",
      categoria: "accesorios",
      destacado: false}  
];



const container = document.getElementById("productoscontainer");


productos.forEach(p => {
    const card = document.createElement("div");
    card.className = "producto-card";
    card.innerHTML = `
        <img src="${p.imagen}" alt="${p.nombre}" class="producto-img">
        <h3>${p.nombre}</h3>
        <p>Precio: $${p.precio}</p>
        <button onclick="agregarAlCarrito('${p.nombre}', ${p.precio})">🛒 Agregar</button>
    `;
    container.appendChild(card);
});

function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(nombre + " agregado al carrito");
}

//Parte Reseñas 
// Obtener elementos
const formReseña = document.getElementById("formReseña");
const listaReseñas = document.getElementById("listaReseñas");

// Para este ejemplo, usamos un ID de producto fijo. 
// En tu proyecto real, cada producto tendría un ID único
const productoID = "ps5"; 

// Cargar reseñas existentes
function cargarReseñas() {
    const reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];
    listaReseñas.innerHTML = "";

    // Filtrar reseñas del producto actual
    reseñas.filter(r => r.productoID === productoID)
           .forEach(r => {
        const div = document.createElement("div");
        div.className = "reseña-card";
        div.innerHTML = `
            <strong>${r.usuario}</strong> - <span>${r.calificacion} ★</span>
            <p>${r.comentario}</p>
        `;
        listaReseñas.appendChild(div);
    });
}

// Guardar nueva reseña
formReseña.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const usuario = document.getElementById("usuario").value.trim();
    const calificacion = document.getElementById("calificacion").value;
    const comentario = document.getElementById("comentario").value.trim();

    if (!usuario || !calificacion || !comentario) return;

    const reseñas = JSON.parse(localStorage.getItem("reseñas")) || [];
    reseñas.push({ productoID, usuario, calificacion, comentario });
    localStorage.setItem("reseñas", JSON.stringify(reseñas));

    // Limpiar formulario y recargar reseñas
    formReseña.reset();
    cargarReseñas();
});
// Función para obtener parámetros de la URL
function obtenerParametro(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const categoriaSeleccionada = obtenerParametro("categoria");
mostrarProductos(categoriaSeleccionada);


// Cargar reseñas al inicio
cargarReseñas();
