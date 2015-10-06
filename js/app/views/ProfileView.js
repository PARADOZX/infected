define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/ProfileView.html'),
        template            = _.template(tpl),
        namespace           = require('app/namespace'); 

    return Backbone.View.extend({
        el: '#mainContent',
		initialize: function() {
            //disconnects any websocket connection to avoid multiple occurences upon page refresh after exiting view
            namespace.socket.disconnect();
        }, 
        render: function() {
            var that = this;
            this.model.fetch({
                success: function(model, response){
                    that.$el.html(template(model.toJSON()));
                }
            });
        },
        events: {
          
        }
    });

});
