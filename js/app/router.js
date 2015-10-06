define(function (require, exports) {

    "use strict";

    var $           = require('jquery'),
        Backbone    = require('backbone'),
        HomeView    = require('app/views/Home'),
        cookie      = require('app/cookie_management'),
        namespace   = require('app/namespace'),
        LoginView   = require('app/views/Login'), 
        User        = require('app/models/User'),
        ProfileView = require('app/views/ProfileView'),
        ChatView    = require('app/views/ChatView');
        
    return Backbone.Router.extend({

        routes: {
            "": "home",
            "login": "login", 
            "users/:id": "users",
            "chat/:id": "chat"
        },
        home: function(){
            //prevents rendering of homeView unless logged into Facebook and fbData set.
            if(cookie.FBcookieExists(document.cookie) && namespace.fbData) {  
                console.log(namespace.fbData);   
                var homeView = new HomeView();
                    homeView.render();
            } else {
                if(!cookie.FBcookieExists(document.cookie)) {  
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
            //assign MongoDB id as both _id (alias of backbone ID for User Model) and as 'id' attribute (not '_id' so Mongo will recognize it)
            var user = new User({_id:id});  

            var profile = new ProfileView({model:user});
            profile.render();
        }, 
        chat: function(id){
            console.log(id);
            var chat = new ChatView({targetID:id});  //pass id to view
        }

    });

});