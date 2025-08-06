/**
 * @jest-environment jsdom
 */
const {
  agregarACarrito,
  carrito,
  productos,
  getTotal,
  resetTotal
} = require('./script');

describe('SaludPlus Medica - Tests de carrito de productos médicos', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <ul id="lista-carrito"></ul>
      <span id="total"></span>
    `;
    carrito.length = 0;
    resetTotal();
  });

  test('agrega un producto al carrito', () => {
    agregarACarrito(productos[0]); // Guantes de Nitrilo
    expect(carrito.length).toBe(1);
    expect(carrito[0].nombre).toBe("Guantes de Nitrilo (Caja 100)");
    expect(getTotal()).toBeCloseTo(12.50);
  });

  test('actualiza el DOM correctamente con el producto agregado', () => {
    agregarACarrito(productos[1]); // Mascarilla KN95
    const lista = document.getElementById("lista-carrito");
    expect(lista).not.toBeNull();
    expect(lista.children.length).toBe(1);
    expect(lista.textContent).toContain("Mascarilla KN95");
    const totalTexto = document.getElementById("total").textContent;
    expect(totalTexto).toBe("1.80");
  });

  test('agrega múltiples productos y calcula total', () => {
    agregarACarrito(productos[2]); // Tensiometro Digital
    agregarACarrito(productos[5]); // Silla de Ruedas
    expect(carrito.length).toBe(2);
    expect(getTotal()).toBeCloseTo(35.00 + 150.00);
  });
});
