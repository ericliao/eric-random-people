require('backbone');

var Films = require('./collections/films.js');

module.exports = Backbone.Router.extend({
    routes: {
        'films': 'films'
    },
    films: function () {
		var films = new Films();
		films.fetch();
    }
});