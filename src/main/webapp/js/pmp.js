$('#success-message').hide();
$('#error-message').hide();

$(document).ready(function() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			
			var positionMap = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
					};
			
			$.ajax({
		        url: "https://api.us.apiconnect.ibmcloud.com/alfredolopezmx1ibmcom-demos/poc/mobile-api/get.address-and-region?coordinates=" + position.coords.latitude + "," + position.coords.longitude,
		        headers: {'x-ibm-client-id':'02f2830e-dc54-49dc-b26c-abf0f3514a37'}
		    }).then(function(data) {
		    	$('#address-info').html(data.address);
		    	
		    	var map = new google.maps.Map(document.getElementById('map'),{
		    		zoom: 15,
		    		center: positionMap
		    	});
		    	
		    	var marker = new google.maps.Marker({
		    		position: positionMap,
		    		map: map,
		    		title: data.regionDescription
		    	});
		    	
		    	if (data.id != 0) {
		    		
		    		$('#success-message-panel').html('<button type=\"button\" class=\"close\" data-dismiss=\"alert\">\&times\;<\/button>' +
		    										 '<strong>Excellent<\/strong> You\'re in <a href="\#" class="alert\-link">' + data.regionDescription + '</a>.');
		    		$('#success-message').show();
		    	} else {
		    		$('#error-message-panel').html('<button type=\"button\" class=\"close\" data-dismiss=\"alert\">\&times\;<\/button>' +
		    									   '<strong>Oops</strong> <a href="\#" class="alert-link">You\'are in an invalid region');
		    		
		    		$('#error-message').show();
		    	}
		    }).fail(function(error) {
		    	$('#error-message-panel').html('<button type=\"button\" class=\"close\" data-dismiss=\"alert\">\&times\;<\/button>' +
				   '<strong>Oops</strong> <a href="\#" class="alert-link">occurs an error, try again later...');

		    	$('#error-message').show();
		    });
			
			
		});
	} else {
		$('#error-message-panel').html('<button type=\"button\" class=\"close\" data-dismiss=\"alert\">\&times\;<\/button>' +
		   '<strong>Oops</strong> <a href="\#" class="alert-link">your browser doesn\'t supports geolocation...');

		$('#error-message').show();
	}
	
});