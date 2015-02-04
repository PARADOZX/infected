define(function (require, exports) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        HomeView    = require('app/views/Home'),
        LoginView   = require('app/views/Login'),
        homeView = new HomeView(),
        loginView = new LoginView();

    return Backbone.Router.extend({

        routes: {
            "": "home",
            "login": "login"
        },
        initialize: function(){

        },
        home: function(){
            homeView.render();
        },
        login: function(){
            loginView.render();
        }

    });

});