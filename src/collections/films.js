var Film = require('../models/film.js');

module.exports = Backbone.Collection.extend({
	model: Film,
	initialize: function () {
    }
});