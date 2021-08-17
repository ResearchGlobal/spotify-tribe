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
    res.cookie.data = data.data;
    res.locals.data = data.data;
    return next()
  })
  .catch(err => {
    console.log(err);
  })
}

spotifyController.getPlayingSong = (req, res, next) => {
  console.log('***** IN PLAYING SONG *****');
  console.log(res.locals);

  const playingSongURI = 'https://api.spotify.com/v1/me/player/currently-playing'


  axios.get(playingSongURI, {
    headers: {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json',
      'Authorization' : `Bearer ${res.locals.authToken}`
    }
  })
  .then(data => {
    console.log('***** SONG PLAYING DATA RETRIEVED: *****');
    // console.log(data);
    res.locals.songData = {
      title: data.data.item.name,
      artist: data.data.item.artists[0].name
    };
    console.log(res.locals.songData);
    return next();
  })
  .catch(err => {
    console.log('***** ERR: Error in getPlayingSong');
    console.log(err)
    return next();
  })


  // return next();
  //  await
}


module.exports = spotifyController;