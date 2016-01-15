define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/ChatView.html'),
        User                = require('app/models/User'),
        template            = _.template(tpl),
        namespace           = require('app/namespace'); 

    return Backbone.View.extend({
        el: '#chat-overlay',
        initialize: function(options) {

            this.options = options || {};

            var that = this;

            this.resetSocketListeners();
            
            // //if user is receiving a chat request fetch the requesting user's information and save as view's model
            // if(this.options.type === 'receive') {
            //     namespace.socket.emit('join request room', {target_id : this.options.target_id, user_id : namespace.fbData.me._id});

            //     var otherUser = new User({_id : this.options.target_id});
            //     otherUser.fetch({
            //         success: function(model, response){
            //             that.model = model;
            //             that.render();
            //             that.initSocketListeners();
            //         }
            //     });
            // } else {
            //     namespace.socket.on('receive chat message', function(msg){
            //         that.pushToChat('someone', msg.message);
            //     });
            // }
            
        }, 
        render: function() {

             //if user is receiving a chat request fetch the requesting user's information and save as view's model
             var that = this;

            if(this.options.type === 'receive') {
                namespace.socket.emit('join request room', {target_id : this.options.target_id, user_id : namespace.fbData.me._id});

                var otherUser = new User({_id : this.options.target_id});
                otherUser.fetch({
                    success: function(model, response){
                        that.model = model;
                        
                        that.hideMainContent();
            
                        that.$el.html(template(namespace.fbData.me));

                        that.initChatEventHandlers();

                        that.pushToChat(that.model.get('first_name'), that.options.message);
                        // that.render();
                        that.initSocketListeners();
                    }
                });
            } else {
                namespace.socket.on('receive chat message', function(msg){
                    that.pushToChat('someone', msg.message);
                });

                this.hideMainContent();
            
                this.$el.html(template(namespace.fbData.me));

                this.initChatEventHandlers(); 
            }

            
        },
        initSocketListeners: function() {

            var that = this;

            namespace.socket.on('receive chat message', function(msg){
                that.pushToChat(that.model.get('first_name'), msg.message);
            });

        },
        resetSocketListeners: function() {
            namespace.socket.removeAllListeners('receive chat message');
            // namespace.socket.removeAllListeners('invite to chat');
        },
        hideMainContent : function() {
            $('#mainContent, #toolbar').css('display', 'none');
        }, 
        initChatEventHandlers : function() {
            // $('#chat-back').click(function(){
            //     $('#mainContent, #toolbar').css('display', 'block');
            //     $('#chat-container').remove();
            // });
        },
        pushToChat: function(user, msg) {
            $('#chat-content').append('<div>' + user + ':  ' + msg + '</div>');
        }, 
        events: {
            'click #chat-send' : function(e) {
                var message = $('#chat-input>input').val();
                this.pushToChat("Me", message);
                $('#chat-input>input').val('');

                var options = {
                    target_id:this.options.target_id,
                    user_id: namespace.fbData.me._id,
                    message: message
                };

                if(this.options.type !== 'receive') {
                    namespace.socket.emit('send id to target', options);
                    this.options.type = 'receive';
                } else {
                    namespace.socket.emit('send chat message', options);
                }

            },
            'click #chat-back' : 'close'
        },
        close: function() {
            this.undelegateEvents();
            $('#mainContent, #toolbar').css('display', 'block');
            $('#chat-container').remove();
        }
    });
});
