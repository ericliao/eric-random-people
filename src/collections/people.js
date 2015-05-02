var Person = require('../models/person');

module.exports = Backbone.Collection.extend({
    model: Person,
    initialize: function (models, options) {
        // allow max 100 random people
        this.number = Math.min(100, options.number);
    },
    url: function () {
        // api url
        return 'http://api.randomuser.me/?results=' + this.number;
    },
    parse: function (response) {
        return _.map(response.results, function (result) {
            result.user._id = result.seed;
            return result.user;
        });
    }
});