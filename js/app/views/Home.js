define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Home.html'),
        Interests           = require('app/collections/Interests'),
        cookie              = require('app/cookie_management'),
        namespace           = require('app/namespace'),
        template = _.template(tpl);

    return Backbone.View.extend({
        el : '#mainContent',
        initialize: function(options) {
            
            this.options = options || {};

            if(this.options.facebookData) {
                console.log(this.options.facebookData);
            } else {
                if(cookie.FBcookieExists) {
                    var sr = cookie.getCookie('fbsr');
                    if (sr) {
                        cookie.parseSignedRequest(sr);
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
