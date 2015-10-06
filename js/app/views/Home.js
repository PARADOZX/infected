define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        namespace           = require('app/namespace'),
        Interests           = require('app/collections/Interests'),
        SaveInterests       = require('app/models/SaveInterests'),
        InterestView        = require('app/views/InterestView'),
        User                = require('app/models/User'),
        geolocation         = require('app/geolocation'),
        io                  = require('socketio');

    return Backbone.View.extend({
        // el added dynamically below.
        initialize: function(options) {

            var that = this;

            //search bar feature
            $('#interestsSearch').on('keydown', function(e) {
                setTimeout(function(){
                        that.searchInterests($('#interestsSearch').val());
                }, 50);
            });

            this.collection = new Interests();

            // this.listenTo(this.collection, 'add', this.add);
            this.listenTo(this.collection, 'reset', function() {
                this.sortCollection();
                this.add(this.collection);
            });

            //initialize web socket connection and listeners
            this.initSocketListeners();
           
        },
        render: function() {

            $('#toolbar').removeClass('none');

            $('#mainContent').empty().append('<ul id="mainList"></ul>');

            var that = this;

            //if fbData populated with facebook information from FB.login
            if(namespace.fbData) {

                //if browser has geolocation
                if(navigator.geolocation) {

                    //get current position of user.
                    navigator.geolocation.getCurrentPosition(function(position){
                        // alert('called get current position');      //live  -- THIS IS THE PROBLEM!!! DOES NOT WORK ON MOBILE

                        if(position) {

                            //send facebook data and position to server
                            function connectServer(cityState) {

                                //persist user city state in returned geolocation object
                                position.cityState = cityState;
                                namespace.fbData.me.position = position;

                                //queries database for user
                                $.ajax({
                                    url : 'http://localhost:3000/user',
                                    // url : 'http://localhost:5000/user',
                                    method : 'get',
                                    data : {'id' : namespace.fbData.me.id}
                                }).done(function(user){
                                    if(user) {

                                        //persist user model with _id/id set
                                        that.model = new User(user);

                                        //Hack... cannot get Mongodb to properly parse JSON in ajax post body; using backbone obj instead.. no problems with this.
                                        var saveInterests = new SaveInterests({fbData : namespace.fbData});

                                        saveInterests.save(null, {
                                            dataType: 'text',
                                            success: function() {
                                                //save user id in namespace for later reference when requesting chat
                                                namespace.fbData.me._id = user._id;

                                                //emit user id to server via websockets to initiate a socket.join
                                                namespace.socket.emit('user id', user._id);

                                                that.collection.setURL();
                                                that.collection.fetch({reset:true});
                                            },
                                            error: function(){
                                                that.fail();
                                            }
                                        });

                                    } else {

                                        that.model = new User({fbData : namespace.fbData});

                                        that.model.save(null, {
                                            success: function(model, response) {

                                                //create instance of user with _id/id set
                                                that.model = new User(response[0]);

                                                var model_id = that.model.get('_id');
                                                
                                                //save user id in namespace for later reference when requesting chat
                                                namespace.fbData.me._id = model_id;

                                                //emit user id to server via websockets to initiate a socket.join
                                                namespace.socket.emit('user id', model_id);

                                                //Hack... cannot get Mongodb to properly parse JSON in ajax post body; using backbone obj instead.. no problems with this.
                                                var saveInterests = new SaveInterests({fbData : namespace.fbData});

                                                //update users interests in server with most up-to-date FB data
                                                saveInterests.save(null, {
                                                    dataType: 'text',
                                                    success: function() {
                                                        that.collection.setURL();
                                                        that.collection.fetch({reset:true});
                                                    },
                                                    error: function(){
                                                        that.fail();
                                                    }
                                                });

                                            }
                                        })
                                    }
                                });
                            } //end function connectServer
                            
                            //obtain user city state from lat lng and callback 
                            geolocation.getUserCityState(position.coords.latitude, position.coords.longitude, connectServer);

                        }
                    }, that.failgeolocation, {timeout: 10000, enableHighAccuracy: true});  //navigator.getCurrentPosition error callback and timeout option
                } //if geolocation... add else 
            } //if namespace.fbData ... add else
     
        },
        events: {
          
        },
        fail: function() {
            alert('Server error.  Please try again.');
        },
        failgeolocation: function() {
            alert('Failed to obtain geolocation.'); 
        },
        add: function(collection) {
            collection.each(function(model){
                var view = new InterestView({model: model});  
                $('#mainList').append(view.render().el);
            });
        },
        initSocketListeners : function() {

            namespace.socket = io.connect('http://localhost:3000', {'forceNew': true});
            // namespace.socket = io.connect('http://localhost:5000', {'forceNew': true});

            //initialize web socket listeners
            namespace.socket.on('open chat window', function(msg){
                if(msg) {
                    //STOPPED HERE
                       
                }
            });

            // namespace.socket.on('connect', function(){
                // console.log('user connected client side');
                
                // socket.on('open chat window',function(success){
                //     if(success){
                //         $('#chat_window').removeClass('none').prepend('<p>Chat with userID ' + success.otherUserID + ':');
                //     }
                // });
                
                // socket.on('chat message', function(msg){
                //     $('#messages').append($('<li>').text('User ' + msg.userID + ': ' + msg.msg)); 
                // });
                
                // socket.on('call to join', function(msg){
                //   socket.emit('join request user room', msg);    
                // });
            // });
        },
        searchInterests : function(string) {
            var that = this;

            $('#mainList').empty();
            this.searchCollection = new Interests();

            this.collection.each(function(model){
                var patt = new RegExp(string, "g");
                var interest = model.get('interest');
                if(interest.match(patt)){
                    that.searchCollection.add(model);
                }
            });

            this.add(this.searchCollection);
            
        },
        sortCollection : function(collection) {
            this.collection.comparator = 'interest';
            this.collection.sort();
        }
    });

});
