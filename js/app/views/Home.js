define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Home.html'),
        namespace           = require('app/namespace'),
        Interests           = require('app/collections/Interests'),
        // geolocation         = require('app/geolocation'),
        template = _.template(tpl);

    return Backbone.View.extend({
        el : '#mainContent',
        initialize: function(options) {
            
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

            this.$el.html(template);  

            if(namespace.fbData) {
                if(navigator.geolocation) {
                    
                    //get current position of user.
                    navigator.geolocation.getCurrentPosition(function(position){

                        //send facebook data and position to server
                        that.sendData(namespace.fbData, position)
                            .done(function(){ 
                                that.collection = new Interests;
                                // that.collection.fetch();
                                
                                that.collection.add([
                                    {name: 'Ling', },
                                    {name: 'Mike', }
                                ]);
                            })
                            .fail(that.fail);

                    });
                }
            } 
     
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
        }

    });

});
