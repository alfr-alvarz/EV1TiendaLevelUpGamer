const productos = [
  { 
      nombre: "Silla Gamer", 
      precio: 33.990, 
      imagen: "assets/img/sillagamer.avif" 
  },
  { 
      nombre: "Play Station 5", 
      precio: 890.000, 
      imagen: "assets/img/play5.webp" 
  },
  { 
      nombre: "Pc Gamer ASUS", 
      precio: 678.000, 
      imagen: "assets/img/asus.png" 
  },
  { 
      nombre: "Audífonos Redmi", 
      precio: 14.990, 
      imagen: "assets/img/audifonos.webp" 
  },
  {
    nombre: "Teclado Gamer",
    precio: 24.990,
    imagen: "assets/img/Teclado.webp"
  },
  {
    nombre :"Mouse Gamer",
    precio: 6.990,
    imagen: "assets/img/mouse.jpg" 

  }

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
}
