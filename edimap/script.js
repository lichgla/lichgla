mapboxgl.accessToken =
  "pk.eyJ1IjoibGljaGF6enVycmkiLCJhIjoiY2xjcTkxeTZwMDFjdzNxcGkxc3ZiMm01cCJ9.BCDqXIzjpVC4yqqBaY2VaA";

const style_edi_pri = "mapbox://styles/lichazzurri/cldk4vvse004t01rnahfl3uob";
const style_edi_sec = "mapbox://styles/lichazzurri/cldk75xjs000o01o083v3yx4p";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: style_edi_pri,
  center: [-3.286, 55.924],
  zoom: 11
});

const layerList = document.getElementById("menu");
const inputs = layerList.getElementsByTagName("input");

map.on("mousemove", (event) => {
  const dzone = map.queryRenderedFeatures(event.point, {
    layers: ["primary-school"]
  });
  document.getElementById("pd").innerHTML = dzone.length
    ? `<h5>${dzone[0].properties.SCHOOL_NAM}</h5> <h5>${dzone[0].properties.ADD_1}, ${dzone[0].properties.POSTCODE}</h5> <h5>TEL: <strong>${dzone[0].properties.TELEPHONE}</strong></h5> <h5>${dzone[0].properties.WEBSITE} </h5>`
    : `<p>Hover over a data zone!</p>`;
});

//On click the radio button, toggle the style of the map.
for (const input of inputs) {
  input.onclick = (layer) => {
    if (layer.target.id == "style_edi_pri") {
      map.setStyle(style_edi_pri);
      map.on("mousemove", (event) => {
        const dzone = map.queryRenderedFeatures(event.point, {
          layers: ["primary-school"]
        });
        document.getElementById("pd").innerHTML = dzone.length
          ? `<h5>${dzone[0].properties.SCHOOL_NAM}</h5> <h5>${dzone[0].properties.ADD_1}, ${dzone[0].properties.POSTCODE}</h5> <h5>TEL: <strong>${dzone[0].properties.TELEPHONE}</strong></h5> <h5>${dzone[0].properties.WEBSITE} </h5>`
          : `<p>Hover over a data zone!</p>`;
      });
    }
    if (layer.target.id == "style_edi_sec") {
      map.setStyle(style_edi_sec);
      map.on("mousemove", (event) => {
        const dzone = map.queryRenderedFeatures(event.point, {
          layers: ["secondary-school"]
        });
        document.getElementById("pd").innerHTML = dzone.length
          ? `<h5>${dzone[0].properties.EST_NAME}</h5> <h5>${dzone[0].properties.ADD_1}, ${dzone[0].properties.POSTCODE}</h5> <h5>TEL: <strong>${dzone[0].properties.TELEPHONE}</strong></h5> <h5>${dzone[0].properties.WEBSITE} </h5>`
          : `<p>Hover over a data zone!</p>`;
      });
    }
  };
}

const geocoder = new MapboxGeocoder({
  // Initialize the geocoder
  accessToken: mapboxgl.accessToken, // Set the access token
  mapboxgl: mapboxgl, // Set the mapbox-gl instance
  marker: false, // Do not use the default marker style
  placeholder: "Search for places in Edinburgh", // Placeholder text for the search bar
  proximity: {
    longitude: 55.924,
    latitude: -3.286
  } // Coordinates of Glasgow center
});

map.addControl(geocoder, "top-left");
map.addControl(new mapboxgl.NavigationControl(), "top-left");

map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
  }),
  "top-left"
);