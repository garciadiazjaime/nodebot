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
  // control lights
  // var pins = ["D0", "D1", "D2", "D3", "D4", "D5", "D6", "D7"];
  // var leds = [];
  //
  // pins.map((pin) => {
  //   var led = new five.Led(pin);
  //   led.on();
  //   leds.push(led);
  // });
  //
  // this.on("exit", function() {
  //   leds.map((led) => {
  //     led.off();
  //   });
  // });

  var led = new five.Led('D5');
  led.on();

  photoresistor = new five.Sensor({
     pin: "A2",
     freq: 250
  });

   // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: photoresistor
  });

  // "data" get the current reading from the photoresistor
  photoresistor.on("data", function() {
    console.log(this.value);
  });

  this.on("exit", function() {
    led.off();
  });

});
