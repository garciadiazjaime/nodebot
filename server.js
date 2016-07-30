var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var Photon = require('./lib/photon');
var photon = new Photon();
var lightsStatus = 0;


app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.get('/pin/turn-on', (req, res) => {
  const { id, value } = req.params;
  photon.turnOn();
  res.status(200).send('lights on');
});


app.get('/pin/turn-off', (req, res) => {
  const { id, value } = req.params;
  photon.turnOff();
  res.status(200).send('lights off');
});

app.get('/pin/:id/:value', (req, res) => {
  const { id, value } = req.params;
  photon.setLigth(id, value)
    .then((results) => {
      res.status(200).send(results);
    });
});

var five = require("johnny-five");
var Particle = require("particle-io");
var board = new five.Board({
  io: new Particle({
    token: "4b60067e15b96a439a12b02ef6a73d55afde9d23",
    deviceId: "2b0023001147353138383138"
  })
});
board.on("ready", function() {
  console.log("Device Ready..");

  photon.init()
    .then(() => {
      app.listen(3030);
      console.log("Running at Port 3030");
    });

  this.on("exit", function() {
    console.log('=== end ===');
    photon.turnOff();
    led.off();
  });

  var led = new five.Led('D5');
  led.on();

  var photoresistor = new five.Sensor({
     pin: "A2",
     freq: 250
  });
  board.repl.inject({
    pot: photoresistor
  });
  photoresistor.on("data", function() {
    // console.log(this.value);
    if (this.value < 980 && lightsStatus) {
      photon.turnOff();
      lightsStatus = 0;
    } else if (this.value > 1000 && !lightsStatus) {
      photon.turnOn();
      lightsStatus = 1;
    }
  });

});
