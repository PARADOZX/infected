define(function (require, exports){

function getLocation() 
{
	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position){
			console.log(position);
		});
	} else {
		
	}
}

exports.getLocation = getLocation;


});