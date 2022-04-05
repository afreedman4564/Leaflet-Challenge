# Leaflet Homework: Visualizing Data with Leaflet

## Choose Data
- Pull data from webpage: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson
- Use d3 to traverse through the file to understand data structure
- Create function to allow callable data


## Functions for visualization
- Create function to determine size of marker using magnitude of earthquake
- Create function to determine color of marker using depth as determining factor
- Make color darker as depth increase
- Create function, using BindPopup, to determine the data elements to reveal when user clicks on the marker
- Create function to call on the functions for marker radius and color


## Tile Layers
- Use openstreetmap to grab tile layer syntax
- Create a variable for tile layers used

## Map to center point/coordinate
- Use coordinates for earthquake capital of world (Parkfield, CA)
- Introduce various tile layers and zoom level as default when page refreshed/open

## Tectonic Plate overlay
- Leverage github source to grab tectonic plate outline: https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json
- Leverage geoJSON to formate the tectonic plate overlay
- Add earthquake and tectonic plate overlays, allowing user to choose one, both or none


## Introduce Legend
- Create function to introduce Legend
- Determine intervals for legend colors based on depth of earthquake
- Create a div and innerHTML to display the legend with colors
- Update CSS file display formatting of legend