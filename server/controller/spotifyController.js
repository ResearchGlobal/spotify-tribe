// const fetch = require('node-fetch');
const axios = require('axios');

const spotifyController = {};

spotifyController.apiRequest = (req, res, next) => {
  //this is unsafe because it allows outsiders to write custom queries. But it's much faster for MVP
  console.log('requesting...', req.query);
  axios.get(res.locals.apiHref, {
    headers: {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${res.locals.authToken}`
    }
  })
  .then(data => {
    console.log("API_REQUEST DATA:", data.data)
    res.locals.data = data.data;
    return next()
  })
  .catch(err => {
    console.log(err);
  })
}

module.exports = spotifyController;