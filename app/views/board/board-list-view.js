define(function(require){
    var Backbone = require('backbone');
    var Boards = require('collections/boards');
    var BoardItemView = require('modules/board/board-item-view');

    var View = Backbone.View.extend({
        collection: Boards,

        initialize: function(){
            Boards.on('reset', this.renderList.bind(this));
        },

        renderOne: function(item){
            this.$el.append(new BoardItemView({ model: item }).render());
        },

        renderList: function(){
            this.collection.each(this.renderOne, this);
        }
    });

    return View;
});