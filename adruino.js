const io = require('socket.io-client');
const five = require('johnny-five');
//const config = require('./config');

// Connect to the socket server
const socket = io.connect('http://localhost:3000');

const board = five.Board();

board.on('ready', function () {

  const led = new five.Led(10); // Set pin 13 for LED
  //const value = this.digitalWrite(7,"The Light is ON");
  //digitalWrite(8,"The Light is OFF");


  const sensor = new five.Sensor({
    pin: "A0",
    custom: {
      a: "",
      b: "",
    }
  });
  socket.on('message', function (data) {
      //var newmsg = data.message;
     while(!sensor.custom.a===""){
      if(sensor.custom.a===""){
      sensor.custom.a += data.message;
      } else{
        sensor.custom.a===""
      }}
      led.on();
    console.log(sensor.custom.a);
    socket.emit('getdata',sensor.custom.a);
        led.off();
    
  })

  // Turn LED on when event led:on is received
  socket.on('led:on', function () {
    led.on();
    //this.digitalRead(7,function(value){
    //console.log(value);
    //});
  });

  // Turn LED off when event led:off is received
  socket.on('led:off', function () {
    led.off();
  });

});