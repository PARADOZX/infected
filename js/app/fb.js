define(function (require, exports){

	"use strict";

	var $               = require('jquery'),
		loadSDK 		= require('facebook'),
		_               = require('underscore'),
        Backbone        = require('backbone'),
		HomeView        = require('app/views/Home'),
		cookie 			= require('app/cookie_management');

function checkLoginState()
{
	
	var fbData = {};

	FB.login(function(response){
		fbData = response;
		if (response.status === 'connected') {
		    // console.log(response.authResponse.accessToken);	//debug
			FB.api('/me', function (me){
				if (response && !response.error) {
					fbData.me = me;
					FB.api('/me/likes', function (likes){
						if (response && !response.error) {
							fbData.likes = likes;
							try{
						    	if(cookie.FBcookieExists(document.cookie)) {
						    		ns.router.navigate('', false); 
						    		var homeView = new HomeView({facebookData : fbData});
						    		homeView.render();
						    	} else alert('Error setting or finding cookie.  Please retry log in.'); 
							} catch(e) {
								alert('Error setting or finding cookie.  Please retry log in.'); 
							}
						}
					});
				}
			});
		} else if (response.status === 'not_authorized') {
		    document.getElementById('status').innerHTML = 'Please log ' +
		    'into this app.';
		} else {
		    document.getElementById('status').innerHTML = 'Please log ' +
		    'into Facebook.';
		}
	}, {scope: 'user_likes'});
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