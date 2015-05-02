var HomeView = require('./views/home'),
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
    personDetails: function () {
    }
});