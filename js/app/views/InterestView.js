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
            this.$el.html(template(this.model.toJSON()));
            return this;
        },
        events: {
            'click .matches-interests' : function(e) {
                var target = e.target;
                $(target).find('.matches-users').css('display', 'block');
            }
        }
    });

});
