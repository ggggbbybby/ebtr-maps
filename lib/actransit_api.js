const fetch = require('node-fetch');
const config = require('../config.json');
const baseUrl = 'https://api.actransit.org/transit/';

module.exports = (url) => {
  return fetch(`${baseUrl}${url}?token=${config.actransit_api_token}`)
    .then(res => res.json());
};
