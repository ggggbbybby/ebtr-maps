# ebtr-maps
Maps project for East Bay Transit Riders

## Setup

1. Run `npm install`
2. Run `cp config.json.sample config.json` and add your AC Transit API key. Register for one [here](http://api.actransit.org/transit/Account/Register) if you don't have one.
3. Run `npm run migrate` to set up the initial SQLite database.
4. Run `node script/loaddb.js` to load route information into the database.
5. Run `node server.js` to start the server on localhost.
