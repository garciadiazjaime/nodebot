var five = require("johnny-five");

function PhotonLib() {
  this.pins = ["D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7"];
  this.leds = [];
}

PhotonLib.prototype.init = function() {
  return new Promise((resolve, reject) => {
    this.pins.map((pin) => {
      var led = new five.Led(pin);
      led.off();
      this.leds.push(led);
    });
    resolve(true);
  });
}

PhotonLib.prototype.turnOn = function() {
  this.leds.map((led) => {
    led.on();
  });
}

PhotonLib.prototype.turnOff = function() {
  this.leds.map((led) => {
    led.off();
  });
}

PhotonLib.prototype.setLigth = function(pin, value) {
  return new Promise((resolve, reject) => {
    if ( value === '0' ) {
      this.leds[pin].off();
    } else {
      this.leds[pin].on();
    }
    resolve(true);
  });
}

module.exports = PhotonLib;
