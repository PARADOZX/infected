define(function (require) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),

        HomeView    = require('app/views/Home'),

        homeView = new HomeView();

    return Backbone.Router.extend({

        routes: {
            "": "home"
        },

        home: function () {
        
        }

    });

});