define(function (require, exports){

	"use strict";

	var $               = require('jquery'),
		loadSDK 		= require('facebook'),
		cookie 			= require('app/cookie_management');		

function checkLoginState()
{
	FB.login(function(response){

		console.log(response);	//debug
		    
		if (response.status === 'connected') {
		    // console.log(response.authResponse.accessToken);	//debug
		    getLikes();
		    try{
		    	if(cookie.FBcookieExists(document.cookie)) {
		    		ns.router.navigate('', true);
		    	} else alert('Error setting or finding cookie.  Please retry log in.'); 
			} catch(e) {
				alert('Error setting or finding cookie.  Please retry log in.'); 
			}
		} else if (response.status === 'not_authorized') {
		    document.getElementById('status').innerHTML = 'Please log ' +
		    'into this app.';
		} else {
		    document.getElementById('status').innerHTML = 'Please log ' +
		    'into Facebook.';
		}
	}, {scope: 'user_likes'});
}

function getLikes()
{
	FB.api('/me', function (response){
		if (response && !response.error) {
			console.log(response);
		}
	})

	FB.api('/me/likes', function (response){
		if (response && !response.error) {
			console.log(response);
		}
	})
}

function logOut()
{
	FB.logout(function(response) {
  		console.log('user is now logged out');
	});
}

window.fbAsyncInit = function() 
{
    FB.init({
        appId      : '748346081885443',
        xfbml      : true,
        cookie     : true,
    	version    : 'v2.2'
	});
};

exports.checkLoginState = checkLoginState;
exports.logOut = logOut;

});