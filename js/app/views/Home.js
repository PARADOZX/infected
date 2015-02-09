define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Home.html'),
        cookie             = require('app/cookie_management'),
        template = _.template(tpl);

    return Backbone.View.extend({
        el : '#mainContent',
        initialize: function () {
        },
        render: function () {
            if(!cookie.FBcookieExists(document.cookie)) {
                ns.router.navigate('login', true); 
            } else this.$el.html(template);       
        },
        events: {
          
        }
    });

});
