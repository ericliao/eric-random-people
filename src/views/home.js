var People = require('../collections/people');

module.exports = Backbone.View.extend({
    initialize: function () {
        this.people = new People();
        this.render();
    },
    render: function () {
    }
});