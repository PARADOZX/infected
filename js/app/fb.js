define(function (require, exports){

	"use strict";

	var $               = require('jquery'),
		loadSDK 		= require('facebook'),
		_               = require('underscore'),
        Backbone        = require('backbone'),
		HomeView        = require('app/views/Home'),
		namespace		= require('app/namespace');
		// cookie 			= require('app/cookie_management');

// function checkLoginState()
// {
	
// 	var fbData = {};

// 	FB.login(function(response){
// 		fbData = response;
// 		if (response.status === 'connected') {
// 		    // console.log(response.authResponse.accessToken);	//debug
// 			FB.api('/me', function (me){
// 				if (response && !response.error) {
// 					fbData.me = me;
// 					FB.api('/me/likes', function (likes){
// 						if (response && !response.error) {
// 							fbData.likes = likes;
// 					    	if(cookie.FBcookieExists(document.cookie)) {
// 					    		namespace.router.navigate('', false); 
// 					    		var homeView = new HomeView({facebookData : fbData});
// 					    		homeView.render();
// 					    	} else alert('Error setting or finding cookie.  Please retry log in.'); 
// 						}
// 					});
// 				}
// 			});
// 		} else if (response.status === 'not_authorized') {
// 		    document.getElementById('status').innerHTML = 'Please log ' +
// 		    'into this app.';
// 		} else {
// 		    document.getElementById('status').innerHTML = 'Please log ' +
// 		    'into Facebook.';
// 		}
// 	}, {scope: 'user_likes'});
// }


// function logOut()
// {
// 	FB.logout(function(response) {
//   		console.log('user is now logged out');
// 	});
// }

// window.fbAsyncInit = function() 
// {
//     FB.init({
//         appId      : '748346081885443',
//         xfbml      : true,
//         cookie     : true,
//     	version    : 'v2.2'
// 	});
// };

// exports.checkLoginState = checkLoginState;
// exports.logOut = logOut;

function statusChangeCallback(response) {
    if (response.status === 'connected') {
    	getFbInfo(response);
    } else if (response.status === 'not_authorized') {
    	namespace.router.navigate('', true); 
    	document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
    	namespace.router.navigate('login', true); 
    	document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
        FB.login(function(response){
        	if (response.status === 'connected') getFbInfo(response);
        });
    }
}

  
function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
	FB.init({
	    appId      : '748346081885443',
	    cookie     : true,  // enable cookies to allow the server to access 
	                        // the session
	    xfbml      : true,  // parse social plugins on this page
	    version    : 'v2.1' // use version 2.1
	});


	FB.getLoginStatus(function(response) {
	    statusChangeCallback(response);
	});

};

  
function getFbInfo(response)
{
	
	var fbData = {};

	fbData = response;

	FB.api('/me', function (response){
		if (response && !response.error) {
			fbData.me = response;
			FB.api('/me/likes', function (response){
				if (response && !response.error) {
					fbData.likes = response;
					namespace.fbData = fbData;
					namespace.router.navigate('', true);
		    	}  
			});
		}
	});
}


exports.checkLoginState = checkLoginState;



});