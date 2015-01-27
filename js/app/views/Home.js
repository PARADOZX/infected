define(function (require) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        // EmployeeListView    = require('app/views/EmployeeList'),
        // models              = require('app/models/employee'),
        tpl                 = require('text!tpl/Home.html'),

        template = _.template(tpl);


    return Backbone.View.extend({

        initialize: function () {
            this.render();
        },

        render: function () {
            console.log('home view rendered');
        },

        events: {
            
        }

    });

});
