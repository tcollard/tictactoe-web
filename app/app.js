define(function(require, exports, module) {

    // External dependencies.
    var _ = require('underscore');
    var $ = require('jquery');
    var Backbone = require('backbone');
    var LayoutManager = require('backbone.layoutmanager');
    var Player = require('models/player');

    var app = module.exports = {};

    // The root path to run the application through.
    app.root = '/';

    // Configure LayoutManager with Backbone Boilerplate defaults.
    LayoutManager.configure({ manage: true });

    $.ajaxPrefilter(function(options){
        var token = Player.getToken();
        if(typeof token !== 'undefined' && token !== null){
            options.url += '?access_token=' + token;
        }
    });

    // The application user interface handles link hijacking and can be modified
    // to handle other application global actions as well.
    app.ui = new Backbone.View({
        el: '#main',

        events: {
            'click a[href]:not([data-bypass])': 'hijackLinks'
        },

        hijackLinks: function(ev) {
            // Get the absolute anchor href.
            var $link = $(ev.currentTarget);
            var href = {
                prop: $link.prop('href'),
                attr: $link.attr('href')
            };
            // Get the absolute root.
            var root = location.protocol + '//' + location.host + app.root;

            // Ensure the root is part of the anchor href, meaning it's relative.
            if (href.prop.slice(0, root.length) === root) {
                // Stop the default event to ensure the link will not cause a page
                // refresh.
                ev.preventDefault();

                // `Backbone.history.navigate` is sufficient for all Routers and will
                // trigger the correct events. The Router's internal `navigate` method
                // calls this anyways.  The fragment is sliced from the root.
                Backbone.history.navigate(href.attr, true);
            }
        }
    });
});