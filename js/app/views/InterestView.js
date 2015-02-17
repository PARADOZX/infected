define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/InterestView.html'),
        template            = _.template(tpl);     

    return Backbone.View.extend({
        tagName: 'li',
		initialize: function() {

        }, 
        render: function() {
            this.$el.html(this.model);
            return this;
        }
    });

});
