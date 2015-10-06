define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone');

    return Backbone.Model.extend({
        defaults : {
        	fbData : '',
        },
        urlRoot : 'http://localhost:3000/user',
        // urlRoot : 'http://localhost:5000/user',
        idAttribute : '_id'
    
    });

});