define(function (require, exports){

	"use strict";

	function setCookie(name, value, days)
	{
		var now = new Date();
		var time = now.getTime();
		time += days * 24 * 3600 * 1000;
		now.setTime(time);
		document.cookie = name + '=' + value + '; expires=' + now.toUTCString() + '; path=/';
	}

	function deleteCookie(name)
	{
		document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
		console.log('cookie deleted');
	}

	function FBcookieExists(a){
		var a = a.split('; ');
        for(var i=0;i < a.length;i++) {
            if (a[i].substr(0,4) !== 'fbsr') return false;
            return true;
        }
    }

	exports.setCookie = setCookie;
	exports.deleteCookie = deleteCookie;
	exports.FBcookieExists = FBcookieExists;

});