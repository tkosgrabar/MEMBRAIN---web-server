var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var _baudrate = 115200;
var separator = "\n";

var nodeParser = require('../parsers/NodeParser');
var measurementParser = require('../parsers/MeasurementParser');

exports.init = function() {
    var sp = new SerialPort('COM9', {
        baudrate: _baudrate,
        parser: serialport.parsers.readline(separator),
        buffersize : 512
    },true);

    sp.on('data', function(data) {
        var data = ""+data;
        console.log("UART: " + data);
        var string = data.split(']');

        if(string[0] == '[Table'){
            console.log("Odgovor je [Table]");
            nodeParser.parseNode(string, function(node) {
                //persist
            }, function(error) {

            });

        } else if(string[0] == '[Status'){

        } else if(string[0] == '[Measurement'){

        } else if(string[0] == '[Return'){

        } else if(string[0] == '[Event'){

        }

    });

};