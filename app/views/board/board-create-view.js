define(function(require){
    var Backbone = require('backbone');
    var Board = require('models/board');

    var View = Backbone.View.extend({
        events: {
            'click button': 'create'
        },

        create: function(e){
            e.preventDefault();
            new Board().save();
        }
    });

    return View;
});