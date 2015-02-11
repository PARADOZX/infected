define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Home.html'),
        Interests           = require('app/collections/Interests'),
        cookie              = require('app/cookie_management'),
        namespace           = require('app/namespace'),
        fb                  = require('app/fb2'),
        template = _.template(tpl);

    return Backbone.View.extend({
        el : '#mainContent',
        initialize: function(options) {
            
            this.options = options || {};

            //facebookData object exists only if user had to sign in.
            if(this.options.facebookData) {
                console.log(this.options.facebookData);
            } else {
                if(cookie.FBcookieExists) {
                    var sr = cookie.getCookie('fbsr');
                    if (sr) {
                        // cookie.parseSignedRequest(sr);
                        // fb.getFBdata();
                    } else alert('Error parsing cookie.  Please try again.');
                } else alert('Error setting or finding cookie.  Please retry log in.')
            }



            // namespace.collections = namespace.collections ? namespace.collections : {};

            // this.collection = namespace.collections.interests = new Interests();

        },
        render: function() {
            this.$el.html(template);       
        },
        events: {
          
        }
    });

});
