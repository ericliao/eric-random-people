module.exports = Backbone.View.extend({
    initialize: function () {
        var view = this;
        view.render();
        view.collection.on('reset', view.render, view);
    },
    render: function () {
        var view = this;
        console.log(view.collection);
    }
});