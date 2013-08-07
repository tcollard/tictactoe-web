define(function(require){
    var Backbone = require('backbone');
    var Boards = require('collections/boards');
    var BoardDetailItemView = require('views/board/board-detail-item-view');
    require('isotope');

    var View = Backbone.View.extend({
        collection: Boards,

        initialize: function(){
            this.$el.isotope({
                itemSelector: '.board-container',
                layoutMode: 'fitRows'
            });

            this.collection.on('reset', this.render.bind(this));
            this.collection.on('add', this.addView.bind(this));
        },

        reload: function(){
            this.$el.isotope('reloadItems');
        },

        insert: function(view){
            if(typeof view.$el !== 'undefined'){
                this.$el.isotope('insert', view.$el);
            }
        },

        addView: function(model){
            this.insert(this.insertView(
                new BoardDetailItemView({ model: model })
            ));
        },

        beforeRender: function(){
            this.collection.each(this.addView.bind(this));
        }
    });

    return View;
});