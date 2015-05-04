define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/ProfileView.html'),
        template            = _.template(tpl);     

    return Backbone.View.extend({
        el: '#mainContent',
		initialize: function() {

        }, 
        render: function() {
            console.log(this.model);
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
