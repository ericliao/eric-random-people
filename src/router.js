require('backbone');

var Films = require('./collections/films.js');

module.exports = Backbone.Router.extend({
    routes: {
        '': 'home',
        'films': 'films'
    },
    home: function () {

    },
    films: function () {
		var films = new Films();
		films.fetch();
    }
});