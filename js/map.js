// js/map.js

document.addEventListener("DOMContentLoaded", () => {
  const width = 900;
  const height = 500;

  const svg = d3.select("#chart-mapa")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(
      d3.zoom()
        .scaleExtent([1, 8])
        .on("zoom", (event) => {
          mapa.attr("transform", event.transform);
        })
    );

  const projection = d3.geoNaturalEarth1()
    .scale(160)
    .translate([width / 2, height / 2]);

  const path = d3.geoPath().projection(projection);

  const colorEscala = d3.scaleSequential()
    .interpolator(d3.interpolateOranges)
    .domain([0, 10000]);

  const mapa = svg.append("g");

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

  // Crear el tooltip para el zoom
  const tooltipZoom = d3.select("#tooltip-zoom");

  // Mostrar el tooltip al pasar el cursor sobre el mapa
  svg.on("mouseover", (event) => {
    tooltipZoom
      .style("display", "block")
      .style("position", "absolute")
      .style("left", `${event.pageX + 10}px`)
      .style("top", `${event.pageY - 28}px`);
  });

  // Mover el tooltip con el cursor
  svg.on("mousemove", (event) => {
    tooltipZoom
      .style("left", `${event.pageX + 10}px`)
      .style("top", `${event.pageY - 28}px`);
  });

  // Ocultar el tooltip al salir del mapa
  svg.on("mouseout", () => {
    tooltipZoom.style("display", "none");
  });

  // Cargar el archivo GeoJSON desde la carpeta data
  fetch("data/world-geo.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("No se pudo cargar el archivo GeoJSON");
      }
      return response.json();
    })
    .then(geoData => {
      // Cargar el archivo CSV con las emisiones
      fetch("data/emisiones_co2.csv")
        .then(response => {
          if (!response.ok) {
            throw new Error("No se pudo cargar el archivo CSV");
          }
          return response.text();
        })
        .then(csvData => {
          // Procesar los datos del CSV
          const datosPorPais = {};
          const rows = csvData.split("\n").slice(1);
          rows.forEach(row => {
            const [country, emissions] = row.split(",").map(item => item.trim());
            if (country && emissions) {
              datosPorPais[country] = parseFloat(emissions);
            }
          });

          // Renderizar el mapa utilizando los datos cargados
          mapa.selectAll("path")
            .data(geoData.features)
            .join("path")
            .attr("d", path)
            .attr("fill", d => {
              const valor = datosPorPais[d.properties.name];
              return valor ? colorEscala(valor) : "#eee";
            })
            .attr("stroke", "#999")
            .attr("stroke-width", 0.5)
            .on("mouseover", function (event, d) {
              const valor = datosPorPais[d.properties.name];
              const texto = valor ? `${valor.toLocaleString()} MtCO₂` : "Sin datos";
              tooltip
                .style("opacity", 1)
                .html(`<strong>${d.properties.name}</strong><br>Total: ${texto}`)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY - 28}px`);
            })
            .on("mousemove", (event) => {
              tooltip
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY - 28}px`);
            })
            .on("mouseout", () => {
              tooltip.style("opacity", 0);
            });
        })
        .catch(error => console.error("Error al cargar el archivo CSV:", error));
    })
    .catch(error => console.error("Error al cargar el archivo GeoJSON:", error));

  // Funcionalidad de botones de zoom
  d3.select("#zoom-in").on("click", () => {
    svg.transition().call(
      d3.zoom().scaleBy, 1.5 
    );
  });

  d3.select("#zoom-out").on("click", () => {
    svg.transition().call(
      d3.zoom().scaleBy, 0.75 
    );
  });
});
