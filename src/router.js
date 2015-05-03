var Person = require('./models/person'),
    PersonView = require('./views/person'),
    HomeView = require('./views/home'),
    homeView = new HomeView();

module.exports = Backbone.Router.extend({
    routes: {
        '': 'home',
        'person/:seed': 'personDetails'
    },
    initialize: function () {
        // this.headerView = new HeaderView();
        // $('.header').html(this.headerView.render().el);
    },
    home: function () {
    },
    personDetails: function (seed) {
        var person = new Person({seed: seed});
        person.fetch({
            success: function (data) {
                new PersonView({
                    el: '.topcoat-list__container',
                    model: data
                });
            }
        });
    }
});