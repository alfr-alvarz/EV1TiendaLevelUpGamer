const form = document.querySelector(".form-registro");
const result1 = document.getElementById("result1");
const result2 = document.getElementById("result2");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    // Obtener valores
    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const fechaNacimiento = new Date(document.getElementById("fechaNacimiento").value);
    const password = document.getElementById("inputPassword4").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const region = document.querySelector(".form-select-region").value;
    const comuna = document.querySelector(".form-select-sm-comuna").value;

    // 1️⃣ Validar edad
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    if (hoy.getMonth() < fechaNacimiento.getMonth() || 
       (hoy.getMonth() === fechaNacimiento.getMonth() && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    if (edad < 18) {
        result1.textContent = "Debes ser mayor de edad para registrarte.";
        result2.textContent = "";
        return;
    }

    // 2️⃣ Validar correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        result1.textContent = "Correo no válido.";
        result2.textContent = "";
        return;
    }

    // 3️⃣ Validar contraseña
    const passRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    if (!passRegex.test(password)) {
        result1.textContent = "Contraseña debe tener mínimo 8 caracteres, al menos una letra y un número.";
        result2.textContent = "";
        return;
    }

    // 4️⃣ Validar teléfono chileno
    const telRegex = /^(\+?56)?\s?(9)?\s?\d{4}\s?\d{4}$/;
    if (!telRegex.test(telefono)) {
        result1.textContent = "Teléfono inválido. Debe ser formato chileno: +56912345678 o 912345678";
        result2.textContent = "";
        return;
    }

    // 5️⃣ Validar región y comuna
    if (region === "--Selecione su región--" || comuna === "--Selecione su Comuna--") {
        result1.textContent = "Debes seleccionar tu región y comuna.";
        result2.textContent = "";
        return;
    }

    // 6️⃣ Aplicar descuento si correo duocuc
    const descuento = email.endsWith("@duocuc.cl") ? 20 : 0;

    // 7️⃣ Guardar usuario
    const usuario = {
        nombre,
        email,
        fechaNacimiento: fechaNacimiento.toISOString().split('T')[0],
        edad,
        password,
        telefono,
        region,
        comuna,
        descuento
    };

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // 8️⃣ Mostrar mensajes
    result1.textContent = `¡Registro exitoso, ${nombre}!`;
    result2.textContent = descuento > 0 ? "¡Tienes un 20% de descuento por ser de Duoc UC!" : "";

    // Después de validar email y password:
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));


    // Limpiar formulario
    form.reset();
});
