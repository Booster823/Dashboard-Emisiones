// js/tabla.js

document.addEventListener("DOMContentLoaded", () => {
  // Datos de emisiones por país (integrados directamente)
  const datos = [
    { Country: "Afghanistan", EmisionesTotales: 11.0202 },
    { Country: "Albania", EmisionesTotales: 5.1443 },
    { Country: "Algeria", EmisionesTotales: 178.1328 },
    { Country: "Andorra", EmisionesTotales: 0.42387 },
    { Country: "Angola", EmisionesTotales: 20.7805 },
    { Country: "Argentina", EmisionesTotales: 195.806 },
    { Country: "Australia", EmisionesTotales: 382.972 },
    { Country: "Austria", EmisionesTotales: 58.578 },
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

  // Crear el contenedor de la tabla
  const contenedor = d3.select("#tabla-emisiones");

  // Crear la tabla
  const tabla = contenedor.append("table").attr("class", "tabla");

  const thead = tabla.append("thead");
  thead.append("tr")
    .selectAll("th")
    .data(["País", "Emisiones Totales (MtCO₂)"])
    .enter()
    .append("th")
    .text(d => d);

  const tbody = tabla.append("tbody");

  // Función para actualizar la tabla
  function actualizarTabla() {
    // Ordenar los datos de mayor a menor por defecto
    const datosOrdenados = [...datos].sort((a, b) => b.EmisionesTotales - a.EmisionesTotales);

    // Actualizar las filas de la tabla
    const filas = tbody.selectAll("tr")
      .data(datosOrdenados, d => d.Country);

    filas.enter()
      .append("tr")
      .merge(filas)
      .html(d => `
        <td>${d.Country}</td>
        <td>${Number(d.EmisionesTotales).toLocaleString()}</td>
      `);

    filas.exit().remove();
  }

  // Inicializar la tabla
  actualizarTabla();
});
