define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/InterestView.html'),
        template            = _.template(tpl),
        namespace           = require('app/namespace');
        // io                  = require('socketio');     

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
            },
            // 'click .chat-request' : function(e) {
                // e.preventDefault();

                // //emit user and target ids to server via websocket connection
                // namespace.socket.emit('user target id', {
                //     user_id : namespace.fbData.me._id,
                //     target_id : e.target.attributes[0].nodeValue
                // });
            // }
        }
    });

});
