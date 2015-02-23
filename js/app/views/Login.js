define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Login.html'),
        fb                  = require('app/fb'),  //v.2
        template = _.template(tpl);

    return Backbone.View.extend({
        el: '#mainContent',
        render: function() {
            this.$el.html(template);
        },
        events: {
            "click #loginFB" : function() {     //v.2
                fb.checkLoginState();
            }
        }
        // onkeypress: function (event) {
        //     if (event.keyCode === 13) { // enter key pressed
        //         event.preventDefault();
        //     }
        // }

    });

});