define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone');

    return Backbone.Model.extend({
    	urlRoot : 'http://localhost:3000/interests',
    	// urlRoot : 'http://localhost:5000/interests',
    	// urlRoot : 'https://fathomless-ravine-2480.herokuapp.com/interests',
    });

});
