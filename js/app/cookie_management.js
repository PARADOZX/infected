define(function (require, exports){

	"use strict";

	function setCookie(value)
	{
		var now = new Date();
		var time = now.getTime();
		time += 3600 * 1000;
		now.setTime(time);
		document.cookie = 'username=' + value + '; expires=' + now.toUTCString() + '; path=/';
	}

	function deleteCookie()
	{
		document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
		console.log('cookie deleted');
	}

	exports.setCookie = setCookie;
	exports.deleteCookie = deleteCookie;

});