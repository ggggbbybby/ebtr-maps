function stopsByLine(line, dir) {
    return fetch(`/stops/${line}/${dir}`).then(res => res.json());
}

function drawRoutes(map) {
    stopsByLine(80, 'Northbound').then(rt_80_nb_stops => {
        const rt_80 = new google.maps.Polyline({
            path: rt_80_nb_stops,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 6
        });
        rt_80.setMap(map);

        const rt_80_info = new google.maps.InfoWindow({
            content: "Route 80 will be discontinued."
        });
        rt_80.addListener('click', function(e) {
            rt_80_info.setPosition(e.latLng)
            rt_80_info.open(map)
        });
    });
}
