define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/AppLogin.html'),
        template = _.template(tpl);

    return Backbone.View.extend({
        el: '#mainContent',
        render: function() {
            this.$el.html(template);
        },
        events: {
        }
    });

});