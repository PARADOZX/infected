require.config({

    baseUrl: 'js/lib',

    paths: {
        app: '../app',
        tpl: '../tpl',
        socketio : 'https://cdn.socket.io/socket.io-1.3.5'
        //debug v.1
        // 'facebook': 'http://connect.facebook.net/en_US/all'  //  remove http: when not on localhost
    },

    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'], 
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        //debug v.1 comment out 3 lines below
        'facebook' : {
            exports: 'FB'
        }
    }


});

require(['backbone', 'app/router', 'jquery', 'app/namespace', 'app/fb', 'socketio'], function (Backbone, Router, $, namespace, fb, io) {

        namespace.socket = io.connect('http://localhost:3000');

        namespace.router = new Router();

        Backbone.history.start();
        
});

