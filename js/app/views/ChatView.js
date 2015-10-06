define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/ChatView.html'),
        template            = _.template(tpl),
        namespace           = require('app/namespace'); 

    return Backbone.View.extend({
        el: '#mainContent',
		initialize: function(options) {

            this.options = options || {};

            this.initSocketListeners();
            
        }, 
        render: function() {
            console.log('chat view rendered.');
        },
        initSocketListeners: function() {
            var that = this;

            namespace.socket.emit('user target id', {
                user_id : namespace.fbData.me._id,
                target_id : this.options.targetID
            });

            namespace.socket.on('open chat window', function(msg){
                if(msg){
                    that.render();
                }
            });

            namespace.socket.on('invite to chat', function(msg){
                console.log('invited to chat');
            });
        }
    });
});
