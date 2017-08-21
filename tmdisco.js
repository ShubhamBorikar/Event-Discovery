var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
var request = require('request');

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 

//app.use(express.bodyParser());

app.post('/myaction', function(req, res) {
	var url;
	if (req.body.city=="LA") {url="https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=qdDuo0SGAceB28A5foahJp29O3AOBGpn";}
 if (req.body.city=="SF") {url="https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=382&apikey=qdDuo0SGAceB28A5foahJp29O3AOBGpn";}

request(url, function (error, response, body) {
  if (!error && response.statusCode == 200) {
    res.send(body); // Show the HTML for the Google homepage. 
  }
})
  
});

app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});