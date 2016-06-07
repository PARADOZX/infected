define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        namespace           = require('app/namespace'),
        Interests           = require('app/collections/Interests'),
        SaveInterests       = require('app/models/SaveInterests'),
        InterestView        = require('app/views/InterestView'),
        ChatView            = require('app/views/ChatView'),
        User                = require('app/models/User'),
        geolocation         = require('app/geolocation'),
        io                  = require('socketio'),
        fb                  = require('app/fb');

    return Backbone.View.extend({
        initialize: function(options) {

            var that = this;

            this.collection = new Interests();

            this.listenTo(this.collection, 'reset', function() {
                this.sortCollection();
                this.add(this.collection);
            });

            this.initSocketListeners();
            this.renderLoggedIn();
            this.bindEvents();
            
        },
        render: function() {

            $('#mainContent').empty().append('<ul id="mainList"></ul>');

            var that = this;

            //if namespace.fbData populated with facebook information from FB.login
            if(namespace.fbData) {

                //if browser has geolocation
                if(navigator.geolocation) {

                    //get current position of user.
                    navigator.geolocation.getCurrentPosition(function(position){
            console.log('geolocation is good');            
                        if(position) {
                         
                            //obtain user's city and state from geolocation coordinates.  pass position to callback function that.connectServer
                            geolocation.getUserCityState(position.coords.latitude, position.coords.longitude, that.connectServer.bind(that), position);

                        }
                    }, 
                    //this is the geolocation fail function
                    function(){     
            console.log('geolocation failed');                                  
                            //San Francisco default city state if geolocation off or unavailable
                            geolocation.getUserCityState(37.7833, -122.4167, that.connectServer.bind(that));   
                    }, {timeout: 10000, enableHighAccuracy: true});  
                } //if geolocation... add else 
            } //if namespace.fbData ... add else
     
        },
        connectServer : function(cityState, position){

            var that = this;

            //position argument will be undefined if geolocation fails.
            var position = position || {};  

            //persist user's city and state in returned geolocation object if geolocation succesful or in a empty position obj if failed
            position.cityState = cityState;
            namespace.fbData.me.position = position;

            //checks if user aleady exists based on FB id
            $.ajax({
                url : 'http://localhost:3000/user',
                // url : 'http://localhost:5000/user',
                // url : 'https://fathomless-ravine-2480.herokuapp.com/user',
                method : 'get',
                data : {'id' : namespace.fbData.me.id}
            }).done(function(user){
                if(user) {

                    //persist user model with _id/id set
                    this.model = new User(user);

                    var model_id = this.model.get('_id');

                    namespace.fbData.me._id = model_id;

                    //Hack... cannot get Mongodb to properly parse JSON in ajax post body; using backbone obj instead.. no problems with this.
                    var saveInterests = new SaveInterests({fbData : namespace.fbData});

                    saveInterests.save(null, {
                        dataType: 'text',
                        success: function() {
                            //save user id in namespace for later reference when requesting chat
                            namespace.fbData.me._id = user._id;

                            //emit user id to server via websockets to initiate a socket.join
                            namespace.socket.emit('user id', user._id);

                            //calls set URL to set query string params
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
                var empty = false;
                if(model.get('matches').length === 0) empty = true;
                var view = new InterestView({model: model, empty: empty});  
                $('#mainList').append(view.render().el);
            });
        },
        bindEvents : function() {
            var that = this;

            //search bar feature
            $('#interestsSearch').on('keydown', function(e) {
                setTimeout(function(){
                        that.searchInterests($('#interestsSearch').val().toLowerCase());
                }, 50);
            });

            $('#logout-button').on('click', function(){

                //check if chat window is open; closes it if it is
                if(that.currentView) that.currentView.close();

                fb.logOut();
                that.renderLoggedOut();
                namespace.router.navigate('login', true); 
            });
        },
        initSocketListeners : function() {

            var that = this;

            namespace.socket = io.connect('http://localhost:3000', {'forceNew': true});
            // namespace.socket = io.connect('http://localhost:5000', {'forceNew': true});
            // namespace.socket = io.connect('https://fathomless-ravine-2480.herokuapp.com', {'forceNew': true});

            //initialize web socket listeners
            namespace.socket.on('open chat window', function(msg){
                if(msg){
                    var chatView = new ChatView({target_id : msg.target_id}); 
                    
                    that.renderView(chatView);
                }
            });

            namespace.socket.on('invite to chat', function(msg){
                console.log('user with id ' + msg.inviter_id + ' invited user with id ' + msg.invitee_id + ' to chat');
            });

            namespace.socket.on('chat requester id', function(msg){
                console.log(msg.requester_id + ' is requesting to chat');

                namespace.socket.emit('target available', {requester_id : msg.requester_id});
                
                var chatView = new ChatView({target_id : msg.requester_id, message : msg.message, type : 'receive'});

                that.renderView(chatView);
            });          
                
        },
        renderLoggedIn : function() {
            $('#toolbar').removeClass('none');
            if($('#logout-button').length === 0) $('#main-header').append('<button id="logout-button">log out</button');
        },
        renderLoggedOut : function() {
            $('#toolbar').addClass('none').css('display', 'none');
            $('#logout-button').remove();
        },
        //checks if a view was previously open and calls the close method if so.  
        renderView : function(view) {
            if(this.currentView) {
                this.currentView.close();
            }
            this.currentView = view;
            this.currentView.render();
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
