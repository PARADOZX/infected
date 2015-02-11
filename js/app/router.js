define(function (require, exports) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        HomeView    = require('app/views/Home'),
        cookie      = require('app/cookie_management'),
        namespace   = require('app/namespace'),
        LoginView   = require('app/views/Login');
        
    return Backbone.Router.extend({

        routes: {
            "": "home",
            "login": "login"
        },
        initialize: function(){
        },
        home: function(){
            if(!cookie.FBcookieExists(document.cookie)) {
                namespace.router.navigate('login', true); 
            } else {
                var homeView = new HomeView();
                homeView.render();
            }
        },
        login: function(){
            var loginView = new LoginView();
            loginView.render();
        }

    });

});