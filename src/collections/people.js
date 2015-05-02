var Person = require('../models/person');

module.exports = Backbone.Collection.extend({
    url: 'http://api.randomuser.me/?results=25',
    model: Person,
    parse: function(response) {
        return response.results;
    }
});