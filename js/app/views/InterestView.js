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
                $(e.target)
                    .next()
                        .css('display', 'block')
                    .end()
                    .find('.icon-expand')
                        .attr('src', 'pics/icon/three_dots.svg')
                    .addClass('collapse');
            },
            'click .collapse' : function(e) {
                $(e.target)
                    .parent().next()
                        .css('display', 'none')
                    .end()
                    .find('.icon-expand')
                        .attr('src', 'pics/icon/plus.svg')
                    .removeClass('collapse');
            }
        }
    });

});
