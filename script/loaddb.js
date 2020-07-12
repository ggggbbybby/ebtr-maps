const knex = require('../lib/db');
const actransitApi = require('../lib/actransit_api');

knex.transaction(async (trx) => {
  await trx('route_stop').del();
  await trx('route_direction').del();
  await trx('route').del();

  const routes = await actransitApi('routes');
  for (const route of routes) {
    //console.log(route.RouteId);
    await trx('route').insert({
      id: route.RouteId,
      description: route.Description,
      type: 'local'
    });

    const waypoints = await actransitApi(`route/${route.RouteId}/waypoints`);
    for (const pattern of waypoints[0].Patterns) {
      const route_direction_id = (await trx('route_direction').insert({
        route_id: route.RouteId,
        direction: pattern.Direction,
        first_place: pattern.FirstPlaceId,
        last_place: pattern.LastPlaceId,
        destination: pattern.Destination
      }))[0];

      let seq = 1;
      for (const waypoint of pattern.Waypoints) {
        await trx('route_stop').insert({
          route_direction_id,
          seq,
          lat: waypoint.Latitude,
          lng: waypoint.Longitude,
          heading: waypoint.Heading
        });
        seq++;
      }
    }
  }
}).then(() => {
  process.exit();
});
