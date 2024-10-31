// Creating Map
let myMap = L.map("map", {
    center: [37.7749,-122.4194],
    zoom: 5

});

// adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(myMap);

// adding the GeoJSON data
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(data => {

    //creating function for the marker size based on magnitude
    function markerSize(magnitude){
        return magnitude * 3; //can adjust for better visability
    }
    // Creating the function to determine marker color based on depth
    function getColor(depth) {
        return depth > 90 ? '#FF0000' :
               depth > 70 ? '#FF7F00' :
               depth > 50 ? '#FFF0F0' :
               depth > 30 ? '#7FFF00' :
               depth > 10 ? '#00FF00' :
                            '#00FFFF' ;
    }
//creating a GeoJason layer
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, {
                radius: markerSize(feature.properties.mag),
                fillColor: getColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 1, 
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`Magnitude: ${feature.properties.mag}<br>Location: ${feature.properties.place}<br>Depth: ${feature.geometry.coordinates[2]} km`);
        }
    }).addTo(myMap);

//creating the ledgend
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
        const div = L.DomUtil.create('div', 'info legend');
        const depths = [-10, 10, 30, 50, 70, 90];
        const labels = [];

        for (let i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
        }
        return div;
    };

    legend.addTo(myMap);
})
.catch(error => {
    console.error("Error loading GeoJSON data:", error);
});