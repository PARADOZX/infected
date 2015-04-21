define(function (require, exports) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        HomeView    = require('app/views/Home'),
        cookie      = require('app/cookie_management'),
        namespace   = require('app/namespace'),
        LoginView   = require('app/views/Login'), 
        ProfileView = require('app/views/ProfileView');
        
    return Backbone.Router.extend({

        routes: {
            "": "home",
            "login": "login", 
            "users/:id": "users"
        },
        home: function(){
            //prevents rendering of homeView unless logged into Facebook and fbData set.
            if(cookie.FBcookieExists(document.cookie) && namespace.fbData) {  
                console.log(namespace.fbData);   
                var homeView = new HomeView();
                    homeView.render();
            } else {
                if(!cookie.FBcookieExists(document.cookie)) {  // v.2
                    var loginView = new LoginView();    
                    loginView.render();
                } else {
                    //if logged into facebook but fbData NOT loaded; redirect or alert an error message
                }
            }
        },
        login: function(){
            var loginView = new LoginView();
            loginView.render();
        },
        users: function(id){

            var profile = new Profile({urlRoot : ''});
            // var profileView = new ProfileView();
            // profileView.render();
        }

    });

});