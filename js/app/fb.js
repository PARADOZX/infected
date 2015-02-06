define(function (require, exports){

	"use strict";

	var loadSDK 			= require('facebook');

function checkLoginState()
{
	FB.login(function(response){

		console.log(response);
		    
		if (response.status === 'connected') {
		    // console.log(response.authResponse.accessToken);
		    getLikes();
		} else if (response.status === 'not_authorized') {
		    document.getElementById('status').innerHTML = 'Please log ' +
		    'into this app.';
		} else {
		    document.getElementById('status').innerHTML = 'Please log ' +
		    'into Facebook.';
		}
	}, {scope: 'email, user_likes'});
}

function getLikes()
{
	FB.api('/me/likes', function (response){
		if (response && !response.error) {
			console.log(response);
		}
	})
}

window.fbAsyncInit = function() 
{
    FB.init({
        appId      : '748346081885443',
        xfbml      : true,
        cookie     : true,
    	version    : 'v2.1'
	});
};

exports.checkLoginState = checkLoginState;

});