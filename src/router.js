var Person = require('./models/person'),
    PersonView = require('./views/person'),
    HomeView = require('./views/home'),
    homeView = new HomeView();

module.exports = Backbone.Router.extend({
    routes: {
        '': 'home',
        'person/:id': 'personDetails'
    },
    initialize: function () {
        // this.headerView = new HeaderView();
        // $('.header').html(this.headerView.render().el);
    },
    home: function () {
    },
    personDetails: function (id) {
        var person = new Person({seed: id});
        person.fetch({
            success: function (data) {
                new PersonView({model: data});
            }
        });
    }
});