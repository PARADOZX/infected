define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        Interest    		= require('app/models/Interest');

    return Backbone.Collection.extend({
        url: 'http://localhost:3000/dummydata', //define URL to backend 
        model: Interest,
		initialize : function()	{
            console.log('collection initialized');
		}
    });

});
