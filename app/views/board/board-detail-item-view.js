define(function(require){
    var Backbone = require('backbone');
    var Player = require('models/player');
    var BoardDetailItemSpotView = require('views/board/board-detail-item-spot-view');
    var boardDetailItemTemplate = require('hbs!templates/board/board-detail-item');

    var View = Backbone.View.extend({
        template: boardDetailItemTemplate,

        events: {
            'click .join': 'join'
        },

        initialize: function(){
            //FIX: make this use the template and auto serialize
            this.setElement(boardDetailItemTemplate(this.serialize()));
            
            this.model.on('change:spots', this.render.bind(this));
            this.model.on('change:players', this.updateJoinable.bind(this));
            this.model.on('change:status', this.render.bind(this));
        },

        serialize: function(){
            return this.model.toJSON();
        },

        beforeRender: function(){
            this.model.get('spots').forEach(function(spot, idx){
                this.insertView(
                    '.board',
                    new BoardDetailItemSpotView({
                        idx: idx,
                        spot: spot,
                        model: this.model
                    })
                );
            }.bind(this));
        },

        afterRender: function(){
            this.updateJoinable();
        },

        join: function(e){
            e.preventDefault();
            this.model.join(Player.get('id'));
        },

        updateJoinable: function(){
            if(this.model.canJoin(Player.get('id'))){
                this.$el.addClass('joinable');
            }
            else{
                this.$el.removeClass('joinable');
            }
        }
    });

    return View;
});