define(function (require, exports){

	"use strict";

	var $               = require('jquery'),
		loadSDK 		= require('facebook'),
		_               = require('underscore'),
        Backbone        = require('backbone'),
		HomeView        = require('app/views/Home'),
		namespace		= require('app/namespace'),
		cookie 			= require('app/cookie_management');

function getFBdata()
{
	// FB.api('/me', function (response){
	// 	if (response && !response.error) {
	// 		console.log(response);
	// 	}
	// });
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

exports.getFBdata = getFBdata;



});