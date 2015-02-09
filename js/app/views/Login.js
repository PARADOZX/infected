define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Login.html'),
        cookie              = require('app/cookie_management'),
        fb                  = require('app/fb'),
        template = _.template(tpl);

    return Backbone.View.extend({
        el: '#mainContent',
        render: function () {
            this.$el.html(template);
        },
        events: {
            'click #deleteCookie' : cookie.deleteCookie,
            'click #loginFB' : fb.checkLoginState,
            'click #logoutFB' : fb.logOut
        },

        // onkeypress: function (event) {
        //     if (event.keyCode === 13) { // enter key pressed
        //         event.preventDefault();
        //     }
        // }

    });

});