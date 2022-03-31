// Store our API endpoint as queryUrl.
// var queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";


// Perform a GET request to the query URL.
d3.json(queryUrl).then(function (data) {
    console.log("homework test");
    console.log(data.features);
  // Using the features array sent back in the API data, create a GeoJSON layer, and add it to the map.
  let earthquakeData = data.features;
  // 1.
  // Pass the features to a createFeatures() function:
  createFeatures(earthquakeData);

});

// 2. 
function createFeatures(earthquakeData) {

    //make a function that binds the popups
    function onEachFeature(feature, layer)
    {
      layer.bindPopup(`<h2>${feature.properties.place}</h2>
      <hr>
      <b>Date/time: </b>${new Date(feature.properties.time)}
      <hr>
      <b>Magnitude: </b> ${feature.properties.mag}<br>
      <b>Depth: </b> ${feature.geometry.coordinates[2]}`
      );
    }
  
    // this function calculates radius based on magnitude
    function getRadius(magnitude)
    {
      if (magnitude  === 0)
          return 1;
      else
          return magnitude * 5;
    }
  
    // this function picks colors for line based on depth
    function getLineColor(depth)
    {
        if (depth > 60)
            return "#3733FF"
        else if (depth > 45)
            return "#33ADFF"
        else if (depth > 30)
            return "#33FFF5"
        else if (depth > 7)
            return "#33FF62"
        else
            return "#FFF933"
    }
    
    // this function picks colors for the two circle data points
    function getFillColor(depth)
    {
        if (depth > 60)
            return "#3733FF"
        else if (depth > 45)
            return "#33ADFF"
        else if (depth > 30)
            return "#33FFF5"
        else if (depth > 7)
            return "#33FF62"
        else
            return "#FFF933"
        }
  
    // this function returns the style data based on the depth of the earthquake
    function styleInfo(feature)
    {
        return {
            opacity: 0.5,
            fillcollor: getFillColor(feature.geometry.coordinates[2]),
            color: getLineColor(feature.geometry.coordinates[2]),
            radius: getRadius(feature.properties.mag),
            stroke: true
        };
    }
    // Save the earthquake data in a variable.
    //create GeoJSON layer that contains the features array
    var earthquakes = L.geoJSON(earthquakeData, {
        
      // turn each marker into a circle
      pointToLayer: function(feature, latlng){
          return L.circleMarker(latlng);
      },
      // to adjust each style for each circle marker, do the following:
      style: styleInfo,
      onEachFeature:onEachFeature});
  
    // Pass the earthquake data to a createMap() function.
    createMap(earthquakes);
  
  }
  
  
  // 3.
  // createMap() takes the earthquake data and incorporates it into the visualization:
  
  function createMap(earthquakes) {
    // Create the base layers.
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    })
  
    var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    });

    var grayscale = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}', {
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        minZoom: 0,
        maxZoom: 20,
        ext: 'png'
    });

    var worldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
 
    // Create a baseMaps object.
    var baseMaps = {
      "Street Map": street,
      "Topographic Map": topo,
      "Gray Scale": grayscale,
      "World Imagery": worldImagery
    };
  
    // Create a new map.
    // Edit the code to add the earthquake data to the layers.
    // Center on Parkfield, CA...the earthquake capital of the world
    var myMap = L.map("map", {
      center: [
        35.8997, -120.4327
      ],
      zoom: 3,
      layers: [street, earthquakes, topo, grayscale, worldImagery]
    });
  
    
    // get teh tectonic plate data and place on map
    // variable for tectonic plate data

    var tectonicPlates = new L.layerGroup();

    // use API to get tectonic plate data
    tectonicURL = ("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json")
    d3.json(tectonicURL).then(function(tectonicData){
        // console.log("tectonic print test");
        // console.log(tectonicData);

        L.geoJSON(tectonicData,{
            color: "red",
            weight: 2
        }).addTo(tectonicPlates);

    });

    // introduce the plates to the map
    tectonicPlates.addTo(myMap);

    var overlays = {
          "Earthquake": earthquakes,
          "Tectonic Plates": tectonicPlates
        }
    
    // Create a layer control that contains our baseMaps.
    // Be sure to add an overlay Layer that contains the earthquake GeoJSON.
    L.control.layers(baseMaps, overlays, {
        collapsed: false
        }).addTo(myMap);

  }