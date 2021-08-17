
const express = require('express');
const router = express.Router();
const spotifyController = require('../controller/spotifyController');
const authController = require('../controller/authController.js');

router.get('/',
  authController.getSpotifyTokenFromDB,
  spotifyController.apiRequest,
  (req, res) => {
  // console.log(res.locals.data);
  res.status(200).json(res.locals.data);
});

router.get('/playing',
  authController.getSpotifyTokenFromDB,
  spotifyController.getPlayingSong,
  (req, res) => {
    // res.locals()
    res.status(200).send(res.locals.songData);
  }
)



module.exports = router;