define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Home.html'),
        namespace           = require('app/namespace'),
        Interests           = require('app/collections/Interests'),
        InterestView        = require('app/views/InterestView'),
        geolocation         = require('app/geolocation'),
        template = _.template(tpl);

    return Backbone.View.extend({
        // el : '#mainList',  //not defined b/c #mainList is added dynamically below.
        initialize: function(options) {

            this.collection = new Interests();

            this.listenTo(this.collection, 'add', this.add);
            
        },
        render: function() {

            $('#mainContent').empty().append('<ul id="mainList"></ul>');

            var that = this;

            //if fbData populated with facebook information from FB.login
            if(namespace.fbData) {

                //if browser has geolocation
                if(navigator.geolocation) {

                    //get current position of user.
                    navigator.geolocation.getCurrentPosition(function(position){
                        alert('called get current position');      //live  -- THIS IS THE PROBLEM!!! DOES NOT WORK ON MOBILE

                        if(position) {

                            //send facebook data and position to server
                            function connectServer(cityState){
                                that.sendData(namespace.fbData, position)
                                    .done(function(data){ 

                                        //fetch query results from server after facebook data and position 
                                        //successfully sent to server 
                                        that.collection.fetch({        //THIS IS REDUNDANT MAYbE??   
                                            success: function(coll, response) {

                                            }
                                        });

                                        //if server update / query fails...
                                        //....
                                    })
                                    //ajax fail.
                                    .fail(that.fail);
                            }
                            
                            geolocation.getUserCityState(position.coords.latitude, position.coords.longitude, connectServer);

                        }
                    }, that.failgeolocation, {timeout: 10000, enableHighAccuracy: true});  //navigator.getCurrentPosition error callback and timeout option
                } //if geolocation... add else 
            } //if namespace.fbData ... add else
     
        },
        events: {
          
        },
        sendData: function(fbData, position) {
            return $.ajax({
                url: 'http://localhost:3000', //set URL
                // url: '', //set url          //live
                type: 'get',
                data: {fbData: fbData, position: position}
            });
        },
        fail: function() {
            alert('Server error.  Please try again.');
        },
        failgeolocation: function() {
            alert('Failed to obtain geolocation.'); 
        },
        add: function(model) {
            var view = new InterestView({model: model});  
            // this.$('#mainList').append(view.render().el); 
            $('#mainList').append(view.render().el); 
        }

    });

});
