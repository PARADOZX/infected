define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        Login    			= require('app/views/Login'),
        tpl                 = require('text!tpl/Login.html'),
        cookies             = require('app/cookie_management'),
        FB                  = require('app/fb'),
        template = _.template(tpl);
    
    return Backbone.View.extend({
        el: '#mainContent',
        initialize: function () {
            
        },
        render: function () {
            cookies.setCookie("Ling");
            this.$el.html(template);
        },
        events: {
           
        },

        // onkeypress: function (event) {
        //     if (event.keyCode === 13) { // enter key pressed
        //         event.preventDefault();
        //     }
        // }

    });

});