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
            var that = this;

            //search bar feature
            $('#interestsSearch').on('keydown', function(e){
                // if(that.isAlphaNum(e)){
                    setTimeout(function(){
                        that.searchInterests($('#interestsSearch').val());
                    }, 50);
                // }
            });

            this.collection = new Interests();

            // this.listenTo(this.collection, 'add', this.add);
            this.listenTo(this.collection, 'reset', function(){
                this.sortCollection();
                this.add(this.collection);
            });

            
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
                        alert('called get current position');      //live  -- THIS IS THE PROBLEM!!! DOES NOT WORK ON MOBILE

                        if(position) {

                            //send facebook data and position to server
                            function connectServer(cityState){
                                //persist user city state in returned geolocation object
                                position.cityState = cityState;
                                namespace.fbData.me.position = position;

                                that.sendData(namespace.fbData, position)
                                    .done(function(data){ 
                                        // console.log(data);
                                        //fetch query results from server after facebook data and position 
                                        //successfully sent to server 
                                        that.collection.fetch({reset: true});  //set reset option to true to enable collection's 'reset' event

                                        //if server update / query fails...
                                        //....
                                    })
                                    //ajax fail.
                                    .fail(that.fail);
                            }
                            
                            //obtain user city state from lat lng
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
        add: function(collection) {
            collection.each(function(model){
                var view = new InterestView({model: model});  
            // this.$('#mainList').append(view.render().el); 
                $('#mainList').append(view.render().el);
            });
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
        },
        isAlphaNum : function(e) {
            var charCode = (e.which) ? e.which : e.keyCode;

            var keynum;
            var keychar;
            var charcheck = /[a-zA-Z0-9]/;
            if (window.event) // IE
            {
                keynum = e.keyCode;
            }
            else {
                if (e.which) // Netscape/Firefox/Opera
                {
                    keynum = e.which;
                }
                else return true;
            }

            keychar = String.fromCharCode(keynum);
            return charcheck.test(keychar);
        }
    });

});
