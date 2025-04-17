// js/resumen.js

document.addEventListener("DOMContentLoaded", () => {
  // Datos de emisiones por país (integrados directamente)
  const datos = [
    { Country: "Afghanistan", EmisionesTotales: 11.0202 },
    { Country: "Albania", EmisionesTotales: 5.1443 },
    { Country: "Algeria", EmisionesTotales: 178.1328 },
    { Country: "Andorra", EmisionesTotales: 0.42387 },
    { Country: "Angola", EmisionesTotales: 20.7805 },
    { Country: "Anguilla", EmisionesTotales: 0.14453 },
    { Country: "Antigua and Barbuda", EmisionesTotales: 0.64483 },
    { Country: "Argentina", EmisionesTotales: 195.806 },
    { Country: "Armenia", EmisionesTotales: 7.6083 },
    { Country: "Australia", EmisionesTotales: 382.972 },
    { Country: "Austria", EmisionesTotales: 58.578 },
    { Country: "Azerbaijan", EmisionesTotales: 43.937 },
    { Country: "Bangladesh", EmisionesTotales: 113.4269 },
    { Country: "Belgium", EmisionesTotales: 83.3685 },
    { Country: "Brazil", EmisionesTotales: 486.4701 },
    { Country: "Canada", EmisionesTotales: 549.299 },
    { Country: "China", EmisionesTotales: 11902.5032 },
    { Country: "Colombia", EmisionesTotales: 105.2387 },
    { Country: "Denmark", EmisionesTotales: 27.2648 },
    { Country: "Egypt", EmisionesTotales: 269.0062 },
    { Country: "France", EmisionesTotales: 272.4758 },
    { Country: "Germany", EmisionesTotales: 596.1514 },
    { Country: "India", EmisionesTotales: 3062.3245 },
    { Country: "Indonesia", EmisionesTotales: 733.2239 },
    { Country: "Iran", EmisionesTotales: 817.8799 },
    { Country: "Italy", EmisionesTotales: 313.4606 },
    { Country: "Japan", EmisionesTotales: 988.7847 },
    { Country: "Mexico", EmisionesTotales: 482.6234 },
    { Country: "Russia", EmisionesTotales: 1815.9247 },
    { Country: "Saudi Arabia", EmisionesTotales: 736.2053 },
    { Country: "South Africa", EmisionesTotales: 401.8931 },
    { Country: "Spain", EmisionesTotales: 221.6156 },
    { Country: "United Kingdom", EmisionesTotales: 305.1463 },
    { Country: "United States", EmisionesTotales: 4911.391 },
    { Country: "Vietnam", EmisionesTotales: 334.7261 },
  ];

  // País con más emisiones
  const mayor = datos.reduce((a, b) => a.EmisionesTotales > b.EmisionesTotales ? a : b);

  // Emisiones totales globales
  const totalGlobal = datos.reduce((sum, d) => sum + d.EmisionesTotales, 0);

  // Promedio por país
  const promedio = totalGlobal / datos.length;

  const contenedor = d3.select("#resumen");

  contenedor.append("div")
    .attr("class", "tarjeta")
    .html(`<h3>Total Global</h3><p>${totalGlobal.toLocaleString()} MtCO₂</p>`);

  contenedor.append("div")
    .attr("class", "tarjeta")
    .html(`<h3>Promedio por País</h3><p>${promedio.toFixed(2)} MtCO₂</p>`);

  contenedor.append("div")
    .attr("class", "tarjeta")
    .html(`<h3>Mayor Emisor</h3><p>${mayor.Country}: ${mayor.EmisionesTotales.toLocaleString()} MtCO₂</p>`);
});
