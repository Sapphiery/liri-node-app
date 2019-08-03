var axios = require('axios');
var moment = require('moment');
var fs = require('fs');
require("dotenv").config();
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);


var readInput = function(command,request) {
    switch (command) {
        case 'concert-this':
            concertThis(request);
            break;

        case 'spotify-this-song':
            spotifyThis(request);
            break;

        case 'movie-this':
            movieThis(request);
            break;

        case 'do-what-it-says':
            pullFromFile();
            break;

        default:
            break;
    }
};

var concertThis = function(request) {
    var url = "https://rest.bandsintown.com/artists/" + request.split(' ').join('%20') + "/events?app_id=codingbootcamp";
    axios.get(url)
         .then(function(response) {
            data = response.data;
            if(data.length === 0) console.log(`No event info found for ${request}.`);
            for (let i = 0; i < data.length; i++) {
                console.log(`Venue name: ${data[i].venue.name}\nVenue location: ${data[i].venue.city}, ${data[i].venue.region}, ${data[i].venue.country}\nDate: ${moment(data[i].datetime).format('MM/DD/YYYY')}\n`);
            }
         })
         .catch(function(err) {
             console.log(err);
         });

};

var spotifyThis = function(request) {
    if (!request) {
        request = 'I Saw The Sign';
    }
    spotify.search({type:'track', query: request, limit:5})
            .then(function(response) {
                var items = response.tracks.items;
                for(let j = 0; j < items.length; j++) {
                    var artistsList = items[j].artists;
                    var artists = [];
                    for (let i = 0; i < artistsList.length; i++) {
                        artists.push(artistsList[i].name);
                    }
                    artists = artists.join(', ');
                    var songname = items[j].name;
                    var preview = items[j].preview_url;
                    var album = items[j].album.name;

                    console.log(`Artist(s): ${artists}\nSong Name: ${songname}\nPreview link: ${preview}\nAlbum: ${album}\n`);
                }
            })
            .catch(function(err) {
                console.log(err);
            });
};

var movieThis = function(request) {
    var url = `http://www.omdbapi.com/?apikey=trilogy&t=${request.split(' ').join('+')}`;
    axios.get(url)
         .then(function(response) {
            var data = response.data;

            console.log(`Title: ${data.Title}\nYear: ${data.Year}\nIMDB rating: ${data.imdbRating}\nRotten Tomatoes rating: ${data.Ratings[1].Value}\nCountry: ${data.Country}\nLanguage: ${data.Language}\nPlot: ${data.Plot}\nActors: ${data.Actors}`);
         })
         .catch(function(err) {
             console.log(err);
         });
};

var pullFromFile = function() {
    fs.readFile('random.txt','utf8',(err,data)=>{
        if (err) return console.log(err);

        var parsed = data.split(',');
        var cmd = parsed[0];
        var req = parsed[1].split('"').join('');
        readInput(cmd,req);
    })
};

readInput(process.argv[2].toLowerCase(),process.argv[3]);


