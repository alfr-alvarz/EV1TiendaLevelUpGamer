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
      destacado: false }
];

const containerHome = document.getElementById("productosDestacados");

function mostrarProductosDestacados() {
    containerHome.innerHTML = "";
    const destacados = productos.filter(p => p.destacado);

    destacados.forEach(p => {
        const card = document.createElement("div");
        card.className = "producto-card";
        card.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}" width="150">
            <h3>${p.nombre}</h3>
            <p class="precio">Precio: $${p.precio}</p>
            <button onclick="agregarAlCarrito('${p.nombre}', ${p.precio})">🛒 Agregar</button>
        `;
        containerHome.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", mostrarProductosDestacados);
