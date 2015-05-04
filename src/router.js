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
        // we fetch 10 random people from the API
        var view = this;
        view.collection = new People();
        view.collection.generate(10, function (mapping) {
            view.color_mapping = mapping;
        });
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
        // only fetch from API if person does not exist in collection
        var view = this;
        var person = view.collection.findWhere({seed: seed});
        if (person) {
            new PersonView({
                el: view.el,
                model: person
            });
        } else {
            person = new Person({
                seed: seed,
                color: view.color_mapping[seed] || Color.randomColor()
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
    }
});