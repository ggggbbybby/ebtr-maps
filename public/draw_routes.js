function get(path) {
    return fetch(path).then(res => res.json());
}

function drawRoutes(map) {
    get('/routes').then(routes => {
      routes.forEach(route => {
        get(`/stops/${route.route_id}/${route.directions[0]}`).then(stops => {
            const route_polyline = new google.maps.Polyline({
                path: stops,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 6
            });
            route_polyline.setMap(map);

            const route_info = new google.maps.InfoWindow({
                content: `Route ${route.route_id}`
            });
            route_polyline.addListener('click', function(e) {
                route_info.setPosition(e.latLng);
                route_info.open(map);
            });
        })
      });
    });
}
