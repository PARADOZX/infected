define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Home.html'),
        namespace           = require('app/namespace'),
        geolocation         = require('app/geolocation'),
        template = _.template(tpl);

    return Backbone.View.extend({
        el : '#mainContent',
        initialize: function(options) {
            
            this.options = options || {};

            if(namespace.fbData) {
                //send fbData / geolocation to server

                //test geolocation
                geolocation.getLocation();
            } 

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
            this.$el.html(template);       
        },
        events: {
          
        },

    });

});
