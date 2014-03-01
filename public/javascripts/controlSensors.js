var socket = io.connect();

socket.on('sensorTableData',function(sensors){
	var printdata = JSON.stringify(sensors);
	console.log(printdata);

	$('#sensorTable tbody').empty();
	$('#nodeSelect').empty();

	$(sensors.data).each(function(i, row){
		var timestamp = new Date(row.TimeStamp); 
		var time = timestamp.toLocaleString();

		var string = '<tr>' + 
							'<td>' + row.Number +' </td>' +
							'<td>' + row.Adress + '</td>' +
							'<td>' + row.Type + '</td>' +
							'<td>' + row.Identifier + '</td>' +
							'<td>' + row.LocationX + '</td>' +
							'<td>' + row.LocationY + '</td>' +
							'<td>' + row.LocationZ + '</td>' +
							'<td>' + row.Interval + '</td>' +
							'<td>' + row.LastResponse + '</td>' +
						 	'<td>' + row.TxPower + '</td>' +
						 	'<td>' + row.PendingRequests  + '</td>' + 
						 	'<td>' + time  + '</td>' + 
				      '</tr>';
		$('#sensorTableBody').append(string);

		if(row.Adress != 0x0){
			console.log(row.Adress);
			string = '<option value='+row.Adress+'>' + row.Adress + '</option>';
			$('#nodeSelect').append(string);
		}
	});
});

socket.on('nRFHubStatusData',function(hubStatusData){
	
	
 	hubStatus =  JSON.parse(hubStatusData.data[0].Status);
 	var timestamp = new Date(hubStatusData.data[0].TimeStamp); 
	var time = timestamp.toLocaleString();

 	var element = $('#hubStatusTable');
	element.empty();
	var string = "<p>Time stamp:" + time + "</p>";
	element.append(string);	
	element.append("<table>")		
	for(key in hubStatus){
		element.append("<tr><td>" + key + "</td><td>" + hubStatus[key] +"</td></tr>");
	} 
	element.append("</table>");
});

socket.on('sensorData', function(sensorData){
	var printdata = JSON.stringify(sensorData);
	console.log(printdata);

	var element = $('#sensorDataTableBody');
	element.empty();

	$(sensorData.data).each(function(i, row){
		var timestamp = new Date(row.TimeStamp); 
		var time = timestamp.toLocaleString();
		row.Data = JSON.parse(row.Data);
		var string = '<tr>' +
							'<td>' + row.Adress +' </td>' +
							'<td>' + row.Battery + '</td>' +
							'<td>' + row.Data.data1 + '</td>' +
							'<td>' + row.Data.data2 + '</td>' +
							'<td>' + row.Data.data3 + '</td>' +
							'<td>' + row.Data.data4 + '</td>' +
							'<td>' + row.Data.data5 + '</td>' +
							'<td>' + row.Data.free + '</td>' +
							'<td>' + time + '</td>' +
					 '</tr>';
		element.append(string);
	});
});

socket.on('HubEvent',function(data){
	console.log(data.name);
	//$('#UARTdata').empty();
	var string = '<p>' + data + '</p>';

	var element = $('#HubEventLog');
	element.append(string);  

	var height = element[0].scrollHeight;
 	element.scrollTop(height);

});

socket.on('HubReturn',function(data){
	console.log(data.name);
	var timestamp = new Date(); 
	var time = timestamp.toLocaleTimeString();

	//$('#UARTdata').empty();
	var string = time + ' ' + data + '<br>';

	var element = $('#HubReturnLog');
	element.append(string);  

	var height = element[0].scrollHeight;
 	element.scrollTop(height);

});

socket.on('HubMeasurment',function(data){
	console.log(data.name);
	//$('#UARTdata').empty();
	var string = '<p>' + data + '</p>';

	var element = $('#HubMeasurmentLog');
	element.append(string);  

	var height = element[0].scrollHeight;
 	element.scrollTop(height);

});


$(function(){
	socket.emit('controlSensorsPageLoad');

	// Hub Status

	$('#getHubStatusTableBtn').click(function(){
		socket.emit('getnRFHubStatus');
	});

	// Hub Controls

	$('#hubPowerUpBtn').click(function(){
		socket.emit('hubPowerUp');
	});

	$('#hubPowerDownBtn').click(function(){
		socket.emit('hubPowerDown');
	});

	$('#hubResetBtn').click(function(){
		socket.emit('hubReset');
	});

	$('#hubFlushRxFIFOBtn').click(function(){
		socket.emit('hubFlushRxFIFO');
	});

	$('#hubFlushTxFIFOBtn').click(function(){
		socket.emit('hubFlushTxFIFO');
	});

	$('#hubOutputPower0Btn').click(function(){
		socket.emit('hubROutputPower0');
	});

	$('#hubOutputPower1Btn').click(function(){
		socket.emit('hubROutputPower1');
	});

	$('#hubOutputPower2Btn').click(function(){
		socket.emit('hubROutputPower2');
	});

	$('#hubOutputPower3Btn').click(function(){
		socket.emit('hubROutputPower3');
	});

	// Sensor Table

	$('#getSensorTableBtn').click(function(){
		socket.emit('getSensorTable');
	});

	// Sensor Data Table

	$('#getLastSensorData').click(function(){
		socket.emit('getSensorData');
	});

	// Hub Communication


	$('#HubSendBtn').click(function(){
		var data = $('#HubCommand').val();
		console.log("komanda: " + data);

		socket.emit('UARTrecieve', data);
	});

	$('#HubClearResponse').click(function(){
		$('#HubLog').empty();	
	});

	// Node settings enable/disable elements

	$('#nodeSetSettingsRb, #nodeGetSettingsRb').change(function(){
		
		if($('#nodeGetSettingsRb').is(':checked')){
			
			$('#nodeIdentifierCb').prop('disabled', true);
			$('#nodeIdentifierTb').prop('disabled', true);
			$('#nodeIntervalCb').prop('disabled', true);
			$('#nodeIntervalBaseTb').prop('disabled', true);
			$('#nodeIntervalMulTb').prop('disabled', true);
			$('#nodeLocationCb').prop('disabled', true);
			$('#nodeLocationXTb').prop('disabled', true);
			$('#nodeLocationYTb').prop('disabled', true);
			$('#nodeLocationZTb').prop('disabled', true);
			$('#nodeLocationCb').prop('disabled', true);
			$('#nodePowerCb').prop('disabled', true);
			$('#nodePowerSelect').prop('disabled', true);

			$('#nodeGetIdentifierCb').prop('disabled', false);
			$('#nodeGetIntervalCb').prop('disabled', false);
			$('#nodeGetLocationCb').prop('disabled', false);
			$('#nodeGetTxPowerCb').prop('disabled', false);
			$('#nodeGetTypeCb').prop('disabled', false);


		} else if($('#nodeSetSettingsRb').is(':checked')){
			console.log("Radio button je na Set");
			$('#nodeIdentifierCb').prop('disabled', false);
			$('#nodeIdentifierTb').prop('disabled', false);
			$('#nodeIntervalCb').prop('disabled', false);
			$('#nodeIntervalBaseTb').prop('disabled', false);
			$('#nodeIntervalMulTb').prop('disabled', false);
			$('#nodeLocationCb').prop('disabled', false);
			$('#nodeLocationXTb').prop('disabled', false);
			$('#nodeLocationYTb').prop('disabled', false);
			$('#nodeLocationZTb').prop('disabled', false);
			$('#nodeLocationCb').prop('disabled', false);
			$('#nodePowerCb').prop('disabled', false);
			$('#nodePowerSelect').prop('disabled', false);

			$('#nodeGetIdentifierCb').prop('disabled', true);
			$('#nodeGetIntervalCb').prop('disabled', true);
			$('#nodeGetLocationCb').prop('disabled', true);
			$('#nodeGetTxPowerCb').prop('disabled', true);
			$('#nodeGetTypeCb').prop('disabled', true);
		}
	});


	// Send node request

	$('#nodeSendRequestBtn').click(function(){
		var data = "";

		data += $('#nodeSelect').val() + ' ';

		console.log('')

		if($('#nodeSetSettingsRb').is(':checked')){
			if($('#nodeIdentifierCb').is(':checked'))
				data += $('#nodeIdentifierTb').val() + ' ';
			else
				data += 'x ';
			if($('#nodeIntervalCb').is(':checked'))
				data += $('#nodeIntervalBaseTb').val() + ' ' + $('#nodeIntervalMulTb').val() + ' ';
			else
				data += 'x x ';
			if($('#nodeLocationCb').is(':checked'))
				data += $('#nodeLocationXTb').val() + ' ' + $('#nodeLocationYTb').val() + ' ' + $('#nodeLocationZTb').val() + ' ';
			else
				data += 'x x x ';
			if($('#nodePowerCb').is(':checked'))
				data += $('#nodePowerSelect').val() + ' ';
			else
				data += 'x ';
			console.log(data);

			socket.emit('setNodeSettings',data);
		} else if($('#nodeGetSettingsRb').is(':checked')){
			if($('#nodeGetIdentifierCb').is(':checked'))
				data += '1 ';
			else
				data += 'x ';

			if($('#nodeGetIntervalCb').is(':checked'))
				data += '1 ';
			else
				data += 'x ';

			if($('#nodeGetLocationCb').is(':checked'))
				data += '1 ';
			else
				data += 'x ';

			if($('#nodeGetTxPowerCb').is(':checked'))
				data += '1 ';
			else
				data += 'x ';

			if($('#nodeGetTypeCb').is(':checked'))
				data += '1 ';
			else
				data += 'x ';

			console.log(data);
			socket.emit('getNodeSettings',data);
		}

	});

	



});