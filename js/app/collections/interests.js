define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        namespace           = require('app/namespace'),
        Interest    		= require('app/models/Interest');

    return Backbone.Collection.extend({
        url: 'http://localhost:3000/interests', //define URL to backend 
        model: Interest,
		initialize : function()	{
            // this.url = 'http://localhost:3000/interests?id=' + namespace.fbData.me.id;
		},
        setURL : function() {
            this.url = 'http://localhost:3000/interests?id=' + namespace.fbData.me.id + '&city=' + namespace.fbData.me.position.cityState.city + '&state=' + namespace.fbData.me.position.cityState.state;
        }
    });

});
