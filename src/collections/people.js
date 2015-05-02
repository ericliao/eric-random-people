var Person = require('../models/person');

module.exports = Backbone.Collection.extend({
    model: Person,
    initialize: function (models, options) {
        this.number = options.number;
    },
    url: function () {
        return 'http://api.randomuser.me/?results=' + this.number;
    },
    parse: function (response) {
        return response.results;
    }
});