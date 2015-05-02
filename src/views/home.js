var People = require('../collections/people'),
    PeopleView = require('../views/people');

module.exports = Backbone.View.extend({
    initialize: function () {
        var view = this;
        view.collection = new People([], {'number': 10});
        view.collection.fetch({
            success: function () {
                view.render();
            }
        });
    },
    render: function () {
        var view = this;
        view.peopleView = new PeopleView({
            collection: view.collection,
            el: $('.topcoat-list__container')
        });
    }
});