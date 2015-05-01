var Film = require('../models/film.js');

module.exports = Backbone.Collection.extend({
	model: Film,
	url: 'https://swapi.co/api/films/'
});