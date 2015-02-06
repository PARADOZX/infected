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

require(['jquery', 'backbone', 'app/router', 'app/cookie_management'], function ($, Backbone, Router, cookie) {

    var router = new Router();

    // if(!cookie.FBcookieExists(document.cookie)) router.navigate('login', {trigger: true});
    if(!cookie.FBcookieExists(document.cookie)) !!left off here!!//redirect to homepage.  cannot get router.navigate to work.
        
    // $("body").on("click", ".back-button", function (event) {
    //     event.preventDefault();
    //     window.history.back();
    // });

    Backbone.history.start();
});

