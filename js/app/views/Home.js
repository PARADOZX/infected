define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Home.html'),
        cookies             = require('app/cookie_management'),
        fb                  = require('app/fb'),
        template = _.template(tpl);

    return Backbone.View.extend({
        el : '#mainContent',
        initialize: function () {
            
        },
        render: function () {
            this.$el.html(template);
        },
        events: {
            'click #deleteCookie' : cookies.deleteCookie,
            'click #loginFB' : fb.checkLoginState
        }

    });

});
