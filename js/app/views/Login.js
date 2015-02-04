define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        Login    			= require('app/views/Login'),
        tpl                 = require('text!tpl/Login.html'),
        cookies             = require('app/cookie_management'),
        template = _.template(tpl);

    return Backbone.View.extend({
        el: '#mainContent',
        initialize: function () {
            cookies.setCookie("Ling");
        },
        render: function () {
            this.$el.html(template);
        },
        events: {

        },

        // search: function (event) {
        //     var key = $('.search-key').val();
        //     this.employeeList.fetch({reset: true, data: {name: key}});
        // },

        // onkeypress: function (event) {
        //     if (event.keyCode === 13) { // enter key pressed
        //         event.preventDefault();
        //     }
        // }

    });

});