// DATOS DE PAYPHONE PARA REDIRECCIONAR:
const token = "OYQ67P1Aw5pUQHkfx0tH7h10XW7UGxhGOtO116BXdldxoV4YHleV42b_f8UPVG23ryKey10Hxd71y37qdxhH7nbT37LGYm17bC6Rnr8xLkLfpELmnoKKADQVAGqU9awomTMot_ILpMQ01zZBeT4ATz6wFkJqaKdKY77sTEtLocksTl515pmljOh5NJ7hPkJ-FGZbD5Hx2QLv8xO3uCsNq1Y2UvMUw7FgihL_BA5uNHIZr0Wx0rwnZ6MubM9AzvCkj69E2NVhp1H2j_ZnjcDOQ9beA88JIeUgNqlr-c7pQh2k-0hCO5sSCA40zZ3s4WgIebRh07FU1NBFEbvdH6nqj81LoZ0";
const storeId = "4fe33019-44e0-41d4-acfc-55ee651057ee";

// NUEVA LISTA DE PRODUCTOS MÉDICOS
const productos = [
  { nombre: "Guantes de Nitrilo (Caja 100)", precio: 12.50, img: "images/guantes.jpg" },
  { nombre: "Mascarilla KN95", precio: 1.80, img: "images/mascarilla.jpg" },
  { nombre: "Tensiometro Digital", precio: 35.00, img: "images/tensiometro.jpg" },
  { nombre: "Termómetro Infrarrojo", precio: 18.99, img: "images/termometro.jpg" },
  { nombre: "Alcohol Antiséptico 500ml", precio: 4.00, img: "images/alcohol.jpg" },
  { nombre: "Silla de Ruedas", precio: 150.00, img: "images/silla.jpg" }
];

let carrito = [];
let total = 0;

const grid = document.getElementById("product-grid");
const listaCarrito = document.getElementById("lista-carrito");
const totalSpan = document.getElementById("total");

function renderProductos() {
  productos.forEach(p => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${p.img}" alt="${p.nombre}">
      <h2>${p.nombre}</h2>
      <p class="price">$${p.precio.toFixed(2)}</p>
    `;
    card.onclick = () => agregarACarrito(p);
    grid.appendChild(card);
  });
}

function agregarACarrito(producto) {
  carrito.push(producto);
  total += producto.precio;
  actualizarCarrito();
}

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  carrito.forEach(p => {
    const item = document.createElement("li");
    item.textContent = `${p.nombre} - $${p.precio.toFixed(2)}`;
    listaCarrito.appendChild(item);
  });
  totalSpan.textContent = total.toFixed(2);
}

async function pagar() {
  if (total === 0) {
    alert("Agrega productos al carrito antes de pagar.");
    return;
  }

  const montoCentavos = Math.round(total * 100);

  const data = {
    amount: montoCentavos,
    amountWithoutTax: montoCentavos,
    amountWithTax: 0,
    tax: 0,
    reference: "Compra SaludPlus Medica",
    currency: "USD",
    clientTransactionId: "trx-" + Date.now(),
    storeId: storeId,
    responseUrl: "http://127.0.0.1"
  };

  try {
    const res = await fetch("https://pay.payphonetodoesposible.com/api/button/Prepare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data)
    });

    const resultado = await res.json();

    if (resultado.payWithPayPhone) {
      window.location.href = resultado.payWithPayPhone;
    } else {
      alert("No se recibió el enlace de pago. Verifica tu token o storeId.");
      console.log("Respuesta:", resultado);
    }

  } catch (error) {
    console.error("Error al conectar con PayPhone:", error);
    alert("Ocurrió un error al conectar con PayPhone.");
  }
}

renderProductos();
