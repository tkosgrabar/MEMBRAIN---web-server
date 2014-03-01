
var socket = io.connect();


socket.on('lastEventData',function(eventData){
	var data = JSON.stringify(eventData);
	console.log(data);

	$('#eventTablica tbody').empty();

	$(eventData.data).each(function(i, row){
		console.log(row.name);
		var string = '<tr><td>' + row.name +' </td><td>' + row.status + '</td><td>' + row.time + ' </td></tr>'
		$('#eventTableBody').append(string);
	});

});

socket.on('TCPevent',function(data){
	console.log(data.command);
	$('#TCPdata').empty();
	var string = '<p>NAREDBA: ' + data.command + ' PARAMETRI: ' + data.param + '</p>';  
	$('#TCPdata').append(string);
	


});

socket.on('UARTevent',function(data){
	console.log(data.name);
	//$('#UARTdata').empty();
	var string = '<p>' + data + '</p>';

	$('#UARTdata').append(string);  

});

$(function(){

	socket.emit('controlPageLoad');

	
	//LED1
	$('#onBtn1').click(function(){
		socket.emit('led1','on');
	});

	$('#offBtn1').click(function(){
		socket.emit('led1','off');
	});

	// LED 2
	$('#onBtn2').click(function(){
		socket.emit('led2','on');
	});

	$('#offBtn2').click(function(){
		socket.emit('led2','off');
	});

	//TCP
	$('#TCPsendBtn').click(function(){
		var data = $('#TCPcommand').val();
		console.log("komanda: " + data);
		socket.emit('TCPrecieve', data);
	});

	//UART
	$('#UARTsendBtn').click(function(){
		var data = $('#UARTcommand').val();
		console.log("komanda: " + data);
		socket.emit('UARTrecieve', data);
	});

});