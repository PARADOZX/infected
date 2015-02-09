require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../tpl',
        'facebook': 'http://connect.facebook.net/en_US/all'  //  remove http: when not on localhost
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'], 
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'facebook' : {
            exports: 'FB'
        }
    }
});

//check for or create namespace.
var ns = ns || {};

require(['backbone', 'app/router', 'jquery'], function (Backbone, Router, $) {

        ns.router = new Router();

        // $("body").on("click", ".back-button", function (event) {
        //     event.preventDefault();
        //     window.history.back();
        // });

        Backbone.history.start();
        
});

