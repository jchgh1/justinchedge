// To update the site, change the country name below and commit the change.
// The outline is loaded automatically; no image upload is needed.
const currentStop = {
  country: "United States of America",
};

const nameEl = document.querySelector("#country-name");
const shapeEl = document.querySelector("#country-shape");
const messageEl = document.querySelector("#map-message");

nameEl.textContent = currentStop.country;

async function showCountry() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson");
    if (!response.ok) throw new Error("Map data could not be loaded.");
    const world = await response.json();
    const wanted = currentStop.country.trim().toLocaleLowerCase();
    const aliases = {
      "united states": ["united states of america", "united states"],
      "america": ["united states of america", "united states"],
      "usa": ["united states of america", "united states"],
    };
    const acceptedNames = [wanted, ...(aliases[wanted] || [])];
    const feature = world.features.find((item) => {
      const props = item.properties;
      return [props.ADMIN, props.name, props.NAME, props.SOVEREIGNT]
        .filter(Boolean).some((name) => acceptedNames.includes(name.toLocaleLowerCase()));
    });
    if (!feature) throw new Error(`Could not find “${currentStop.country}”. Check the country name in app.js.`);

    const projection = d3.geoMercator().fitExtent([[35, 35], [665, 455]], feature);
    const path = d3.geoPath(projection);
    const geometry = feature.geometry.type === "MultiPolygon" ? feature.geometry.coordinates : [feature.geometry.coordinates];
    shapeEl.innerHTML = geometry.map((coordinates) => {
      const polygon = { type: "Polygon", coordinates };
      return `<path d="${path(polygon)}"></path>`;
    }).join("");
    messageEl.hidden = true;
    document.querySelector("#map").setAttribute("aria-label", `Outline of ${currentStop.country}`);
  } catch (error) {
    messageEl.textContent = error.message || "The map could not be loaded. Please try again later.";
  }
}

showCountry();
