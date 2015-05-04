var Color = require('randomcolor'),
    Person = require('./models/person'),
    People = require('./collections/people'),
    PersonView = require('./views/person'),
    PeopleView = require('./views/people');

module.exports = Backbone.Router.extend({
    el: '.random-people-container',
    routes: {
        '': 'home',
        'person/:seed': 'personDetails'
    },
    initialize: function () {
        var view = this;
        // we fetch 10 random people from the API
        view.collection = new People();
        view.color_mapping = view.collection.generate(10);
    },
    home: function () {
        // view of all the random people
        var view = this;
        new PeopleView({
            el: view.el,
            collection: view.collection
        });
    },
    personDetails: function (seed) {
        // view of a random person
        var view = this;
        var person = new Person({
            seed: seed,
            color: view.color_mapping[seed] || Color.randomcolor()
        });
        person.fetch({
            success: function (data) {
                new PersonView({
                    el: view.el,
                    model: data
                });
            }
        });
    }
});