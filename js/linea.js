// js/linea.js

document.addEventListener("DOMContentLoaded", () => {
  // Configuración del gráfico
  const margin = { top: 40, right: 30, bottom: 40, left: 60 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3.select("#grafico-linea")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().range([0, width]);
  const y = d3.scaleLinear().range([height, 0]);

  const linea = d3.line()
    .x(d => x(d.Año))
    .y(d => y(d.Emisiones));

  // Crear el tooltip
  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("position", "absolute")
    .style("background-color", "white")
    .style("border", "1px solid #ccc")
    .style("padding", "5px")
    .style("font-size", "12px")
    .style("pointer-events", "none")
    .style("opacity", 0);

  // Función para actualizar el gráfico
  function actualizarGrafico(datosMexico) {
    // Actualizar escalas
    x.domain(d3.extent(datosMexico, d => d.Año));
    y.domain([0, d3.max(datosMexico, d => d.Emisiones)]).nice();

    // Limpiar elementos previos
    svg.selectAll("*").remove();

    // Ejes
    svg.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    svg.append("g")
      .call(d3.axisLeft(y));

    // Línea
    svg.append("path")
      .datum(datosMexico)
      .attr("fill", "none")
      .attr("stroke", "#c62828")
      .attr("stroke-width", 2)
      .attr("d", linea);

    // Puntos de datos
    svg.selectAll("circle")
      .data(datosMexico)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.Año))
      .attr("cy", d => y(d.Emisiones))
      .attr("r", 4)
      .attr("fill", "orange")
      .attr("stroke", "#333")
      .on("mouseover", (event, d) => {
        tooltip
          .style("opacity", 1)
          .html(`<strong>Año:</strong> ${d.Año}<br><strong>Emisiones:</strong> ${d.Emisiones.toLocaleString()} MtCO₂`)
          .style("left", `${event.pageX + 10}px`)
          .style("top", `${event.pageY - 28}px`);
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0);
      });

    // Punto con mayores emisiones
    if (datosMexico.length > 0) {
      const max = datosMexico.reduce((a, b) => a.Emisiones > b.Emisiones ? a : b);

      svg.append("circle")
        .attr("cx", x(max.Año))
        .attr("cy", y(max.Emisiones))
        .attr("r", 5)
        .attr("fill", "orange")
        .attr("stroke", "#333");

      svg.append("text")
        .attr("x", x(max.Año) + 8)
        .attr("y", y(max.Emisiones) - 10)
        .text(`Mayor: ${max.Emisiones.toLocaleString()} MtCO₂ (${max.Año})`)
        .style("font-size", "12px")
        .style("fill", "#333");
    }
  }

  // Cargar datos desde el archivo CSV
  fetch("data/evolucion_global.csv")
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo CSV");
      }
      return response.text();
    })
    .then(csvData => {
      // Procesar los datos del CSV
      const datosMexico = [];
      const rows = csvData.split("\n").slice(1); // Ignorar encabezado
      rows.forEach(row => {
        const [año, emisiones] = row.split(",").map(item => item.trim());
        if (año && emisiones) {
          datosMexico.push({ Año: +año, Emisiones: +emisiones });
        }
      });

      // Actualizar el gráfico con los datos cargados
      actualizarGrafico(datosMexico);
    })
    .catch(error => console.error("Error al cargar el archivo CSV:", error));
});
