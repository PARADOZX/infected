define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone');

    return Backbone.Model.extend({
    	urlRoot : 'http://localhost:3000/interests',
    });

});
