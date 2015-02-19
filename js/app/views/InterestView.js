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
                    .find('.matches-userslist')
                        .css('display', 'block')
                    .end()
                    .find('.collapse')
                        .css('display', 'block');
            },
            'click .collapse' : function(e) {
                $(e.target)
                    .next()
                        .css('display', 'none')
                    .end()
                    .css('display', 'none');
            }
        }
    });

});
