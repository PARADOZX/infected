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

require(['jquery', 'backbone', 'app/router'], function ($, Backbone, Router) {

    var router = new Router();

    // $("body").on("click", ".back-button", function (event) {
    //     event.preventDefault();
    //     window.history.back();
    // });

    Backbone.history.start();
});

