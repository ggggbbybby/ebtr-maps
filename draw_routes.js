
function parseLatLng([lat, lng]) {
    return {
            lat: parseFloat(lat),
            lng: parseFloat(lng),
        }
}
function drawRoutes(map) {
    var rt_80_nb_stops = stops_by_line["80/North"].map(stop => parseLatLng(stops[stop]))
    var rt_80 = new google.maps.Polyline({
        path: rt_80_nb_stops,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 6
    })
    rt_80.setMap(map);

    var rt_80_info = new google.maps.InfoWindow({
        content: "Route 80 will be discontinued."
    });
    rt_80.addListener('click', function(e) {
        rt_80_info.setPosition(e.latLng)
        rt_80_info.open(map)
    })
}