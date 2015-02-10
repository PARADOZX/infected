define(function (require, exports) {

    "use strict";

    var $                   = require('jquery'),
        _                   = require('underscore'),
        Backbone            = require('backbone'),
        tpl                 = require('text!tpl/Home.html'),
        template = _.template(tpl);

    return Backbone.View.extend({
        el : '#mainContent',
        initialize: function(options) {
            this.options = options || {};
            console.log(this.options.facebookData);            
        },
        render: function() {
            this.$el.html(template);       
        },
        events: {
          
        }
    });

});
