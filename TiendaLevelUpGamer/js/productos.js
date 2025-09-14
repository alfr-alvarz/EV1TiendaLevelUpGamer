const productos =[
    {nombre: "Silla Gamer ", precio : 33990},
    {nombre: "Play Station 5",precio : 890000},
    {nombre: "Pc Gamer ASUS ", precio: 678000},
    {nombre: "Audifonos redmi", precio: 14990}
];

const container =document.getElementById("productoscontainer")

productos.forEach(p => {
    const card = document.createElement("div");
    card.className = "producto-card";
    card.innerHTML = `
      <h3>${p.nombre}</h3>
      <p>Precio: $${p.precio}</p>
      <button onclick="agregarAlCarrito('${p.nombre}', ${p.precio})">🛒 Agregar</button>
    `;
    container.appendChild(card);
  });

  function agregarAlCarrito (nombre,precio){
    let carrito =JSON.parse(localStorage.getItem("carrito"))||[];
    carrito.push({nombre,precio});
    localStorage.setItem("carrito",JSON.stringify(carrito));
    alert("${nombre} agregado al carrito de compras")
  }