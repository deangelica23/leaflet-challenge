// Creating Map
let myMap = L.map("map", {
    center: [//insert something],
    zoom: 11

});

// adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// adding the GeoJSON data

// Creating the function to determine marker color based on depth

//creating a GeoJason layer

//creating the ledgend

