define(function (require, exports){

function getLocation() 
{
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			return position;
		});
	}
}

exports.getLocation = getLocation;


});