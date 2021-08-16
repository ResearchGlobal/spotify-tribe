const fetch = require('node-fetch');

const spotifyController = {};

spotifyController.apiRequest = (req, res, next) => {
  //this is unsafe because it allows outsiders to write custom queries. But it's much faster for MVP
  console.log('requesting...', req.query);
  console.log(res.locals)
  fetch(res.locals.apiHref, {
    headers: {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${res.locals.authToken}`
    }
  })
  .then(data => {
    return data.json()
  })
  .then(data => {
    console.log("API_REQUEST DATA:", data)
    res.locals.data = data;
    return next()
  })
  .catch(err => {
    console.log(err);
  })
}

module.exports = spotifyController;