define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        // EmployeeListView    = require('app/views/EmployeeList'),
        // models              = require('app/models/employee'),
        tpl                 = require('text!tpl/Home.html'),
        cookies             = require('app/cookie_management'),
        template = _.template(tpl);
console.log(cookies.deleteCookie);
    return Backbone.View.extend({
        el : '#mainContent',
        initialize: function () {
            
        },
        render: function () {
            this.$el.html(template);
        },
        events: {
            // 'click #deleteCookie' : deleteCookie
        }

    });

});
