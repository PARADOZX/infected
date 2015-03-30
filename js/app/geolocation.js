define(function (require, exports){

function getLocation() 
{
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			return position;
		});
	}
}

function getUserCityState(latitude, longitude, callback){
    $.ajax({
        type: 'GET',
        dataType: "json",
        url: "http://maps.googleapis.com/maps/api/geocode/json?latlng="+latitude+","+longitude+"&sensor=false",
        data: {},
        success: function(data) {
        	var foundCity = false,
        		foundState = false,
        		cityState = {};

	        for (x in data['results']){
	        	if(foundCity === true && foundState === true) break;
	        	var a = data['results'][x]['address_components'];
	            for (y in a){
		            if(a[y]['types'][0] === 'locality'){
		            	if(a[y]['long_name']){
		            		cityState.city = a[y]['long_name'];
		            		foundCity = true;
		            	}
		            } 
		            if(a[y]['types'][0] === 'administrative_area_level_1'){
		            	if(a[y]['short_name']){
		            		cityState.state = a[y]['short_name'];
		            		foundState = true;
		            	}
		            }
	            }
	        }
	        callback(cityState);
        },
        error: function () { console.log('error'); } 
    }); 
}

exports.getLocation = getLocation;
exports.getUserCityState = getUserCityState;

});