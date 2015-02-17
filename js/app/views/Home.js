define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Home.html'),
        namespace           = require('app/namespace'),
        Interests           = require('app/collections/Interests'),
        InterestView        = require('app/views/InterestView'),
        template = _.template(tpl);

    return Backbone.View.extend({
        el : '#mainContent',
        initialize: function(options) {

            this.collection = new Interests();

            this.listenTo(this.collection, 'add', this.addOne);
            
            // this.options = options || {};
       
            //facebookData object exists only if user had to sign in.
            //debug v.1
            // if(this.options.facebookData) {
            //     console.log(this.options.facebookData);
            // } else {
            //     if(cookie.FBcookieExists) {
            //         var sr = cookie.getCookie('fbsr');
            //         if (sr) {
            //             // cookie.parseSignedRequest(sr);
            //             // fb.getFBdata();
            //         } else alert('Error parsing cookie.  Please try again.');
            //     } else alert('Error setting or finding cookie.  Please retry log in.')
            // }

            // namespace.collections = namespace.collections ? namespace.collections : {};

            // this.collection = namespace.collections.interests = new Interests();

        },
        render: function() {

            var that = this;

            //if fbData populated with facebook information from FB.login
            if(namespace.fbData) {

                //if browser has geolocation
                if(navigator.geolocation) {
                    
                    //get current position of user.
                    navigator.geolocation.getCurrentPosition(function(position){

                        //send facebook data and position to server
                        that.sendData(namespace.fbData, position)
                            .done(function(){ 

                                // that.collection.fetch();

                                //dummy data
                                that.collection.add([
                                    {
                                        firstName: 'Jane',
                                        lastName: 'Smith',
                                        interests: ['snowboarding', 'hiking']
                                    },
                                    {
                                        firstName: 'Jon',
                                        lastName: 'Doe',
                                        interests: ['cooking', 'snowboarding']
                                    }
                                ]);

                                console.log(that.collection);
                                //if server update / query fails...
                                //....
                            })
                            //ajax fail.
                            .fail(that.fail);

                    });
                } //if geolocation... add else 
            } //if namespace.fbData ... add else
     
        },
        events: {
          
        },
        sendData: function(fbData, position) {
            return $.ajax({
                url: '', //set URL
                type: 'post',
                data: {fbData: fbData, position: position}
            });
        },
        fail: function() {
            alert('Server error.  Please try again.');
        },
        addOne: function(interest) {
            var view = new InterestView({model: interest});
            this.$el.append(view.render().el);
        }

    });

});
