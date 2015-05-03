var Person = require('./models/person'),
    PersonView = require('./views/person'),
    HomeView = require('./views/home');

module.exports = Backbone.Router.extend({
    routes: {
        '': 'home',
        'person/:seed': 'personDetails'
    },
    home: function () {
        new HomeView({
            el: '.random-people-container'
        });
    },
    personDetails: function (seed) {
        var person = new Person({seed: seed});
        person.fetch({
            success: function (data) {
                new PersonView({
                    el: '.random-people-container',
                    model: data
                });
            }
        });
    }
});