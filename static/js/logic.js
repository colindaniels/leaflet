url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

d3.json(url, function(data) {
  
    console.log()
    var myMap = L.map('mapid', {
      center: [0, 0],
      zoom: 2
    });
    
    L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
      attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY
    }).addTo(myMap);

    
    for(let i in data.features) {
      var coordinates = data.features[i]['geometry']['coordinates']
      if (isNaN(Math.pow(parseFloat(data.features[i]['properties']['mag']), 6.5))) {

        var circle = L.circle(coordinates.slice(0,2).reverse(), {
        
          color: 'black',
          fillOpacity: 1,
  
          radius: 0
        }).addTo(myMap)
      
        circle.bindPopup('Name: ' + data.features[i]['properties']['title'] + '\nMagnitude: ' + data.features[i]['properties']['mag'])
        
      }
      else {
        console.log(Math.pow(parseFloat(coordinates.slice(2,3)), 2))
        var color = ''
        if (Math.pow(parseFloat(coordinates.slice(2,3)), 2) < 100) {
          color = 'green'
        }
        else if (Math.pow(parseFloat(coordinates.slice(2,3)), 2) < 1000) {
          color = 'yellow'
        }
        else if (Math.pow(parseFloat(coordinates.slice(2,3)), 2) < 100000) {
          color = 'red'
        }
        else {
          color = 'black'
        }
        var circle = L.circle(coordinates.slice(0,2).reverse(), {
          color: color,
          fillOpacity: 1,
  
          radius: Math.pow(parseFloat(data.features[i]['properties']['mag']), 6.5)
          //radius: Math.pow(parseFloat(coordinates.slice(2,3)), 2)
        }).addTo(myMap)
      
        circle.bindPopup('Name: ' + data.features[i]['properties']['title'] + '\nMagnitude: ' + data.features[i]['properties']['mag'] + '\n' + 'Depth: ' + parseFloat(coordinates.slice(2,3)))
      }
      

    }
    
  });
