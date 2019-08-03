var axios = require('axios');
var moment = require('moment');
require("dotenv").config();
var keys = require('./keys.js');
var spotify = new Spotify(keys.spotify);

var command = process.argv[2].toLowerCase();
var request = process.argv[3].toLowerCase();


switch (commmand) {
    case 'concert-this':
        concertThis();
        break;

    case 'spotify-this-song':
        spotifyThis();
        break;

    case 'movie-this':
        movieThis();
        break;

    case 'do-what-it-says':
        pullFromFile();
        break;

    default:
        break;
}

var concertThis = function() {

}

var spotifyThis = function() {

}

var movieThis = function() {

}

var pullFromFile = function() {
    
}