var b = require('bonescript');

var SERVO = 'P9_14';
var duty_min = 0.03;
var position = 0;
var increment = 0.1;

exports.derpIt = function(position) {
    console.log('derps\nposition\n');

    var duty = (parseInt(position, 10) / 100);

    var duty_cycle = (duty*0.115) + duty_min;
    b.analogWrite(SERVO, duty_cycle, 60, null);
    console.log("Duty Cycle: " + 
        parseFloat(duty_cycle*100).toFixed(1) + " %");
}

