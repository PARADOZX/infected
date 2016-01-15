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

            this.resetSocketListeners();
            
        }, 
        render: function() {

            //if user is receiving a chat request fetch the requesting user's information and save as view's model
            var that = this;

            if(this.options.type === 'receive') 
                namespace.socket.emit('join request room', {target_id : this.options.target_id, user_id : namespace.fbData.me._id});

            this.fetchOtherUserInfo();
                    
        },
        fetchOtherUserInfo: function() {
            var that = this;

            var otherUser = new User({_id : this.options.target_id});

            otherUser.fetch({
                success: function(model, response){
                    that.model = model;

                    that.hideMainContent();
            
                    that.$el.html(template({user : namespace.fbData.me, target : response}));

                    if(that.options.type === 'receive') 
                        that.pushToChat(that.model.get('first_name'), that.options.message);

                    that.initSocketListeners();

                    that.initEventListeners();
                }
            });
        },
        initEventListeners: function() {
            $('body').keypress(this.pressEnter);
        },
        initSocketListeners: function() {

            var that = this;
    
            namespace.socket.on('target confirmed available', function(){
                that.targetAvailable = true;
            });


            namespace.socket.on('receive chat message', function(msg){
                that.pushToChat(that.model.get('first_name'), msg.message);
            });

        },
        pressEnter: function(e){
            if(e.keyCode === 13) $('#chat-send').trigger('click');
        },
        resetSocketListeners: function() {
            namespace.socket.removeAllListeners('receive chat message');
        },
        hideMainContent : function() {
            $('#mainContent, #toolbar').css('display', 'none');
        }, 
        pushToChat: function(user, msg) {
            if (this.options.type != 'receive') {
                setTimeout(this.checkTarget.bind(this), 2000);
            }

            $('#chat-content').append('<div>' + user + ':  ' + msg + '</div>');

            var chatWindow = document.getElementById('chat-content');
            chatWindow.scrollTop = chatWindow.scrollHeight;
        },         
        targetAvailable : false,        
        checkTarget : function() {
            if(!this.targetAvailable)
                $('#chat-content').append('<div>Target not available</div>');
        },
        events: {
            'click #chat-send' : function(e) {
                if($('#chat-input>input').val() !== '') {
                    var message = $('#chat-input>input').val();
                    this.pushToChat("Me", message);
                    $('#chat-input>input').val('');

                    var options = {
                        target_id:this.options.target_id,
                        user_id: namespace.fbData.me._id,
                        user_name: namespace.fbData.me.first_name,
                        message: message
                    };

                    if(this.options.type !== 'receive') {
                        namespace.socket.emit('send id to target', options);
                        this.options.type = 'receive';
                    } else {
                        namespace.socket.emit('send chat message', options);
                    }
                }
            },
            'click #chat-back' : 'close'
        },
        close: function() {
            this.undelegateEvents();
            $('body').off('keypress', this.pressEnter);
            $('#mainContent, #toolbar').css('display', 'block');
            $('#chat-container').remove();
        }
    });
});
