define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/InterestView.html'),
        template            = _.template(tpl),
        tpl2                 = require('text!tpl/NoMatchesInterestView.html'),
        template2            = _.template(tpl2),
        namespace           = require('app/namespace');
   

    return Backbone.View.extend({
        tagName: 'li',
		initialize: function(options) {
            this.options = options || {};
        }, 
        render: function() {
            if(this.options.empty === true) this.$el.html(template2(this.model.toJSON()));
                else this.$el.html(template(this.model.toJSON()));
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
            'click .icon-expand' : function(e) {
                $(e.target)
                    .parent().next()
                        .css('display', 'block')
                    .end().end()
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
            },
            'click #open-chat' : function(e) {
                namespace.socket.emit('user target id', {
                    user_id : namespace.fbData.me._id,
                    target_id : $(e.target).data('id')
                });
            }
        }
    });

});
