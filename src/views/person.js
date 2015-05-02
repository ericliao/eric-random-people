module.exports = Backbone.View.extend({
    initialize: function () {
        var view = this;
        view.render();
    },
    render: function () {
        var view = this;
        console.log(this.model);
        return this;
    }
});