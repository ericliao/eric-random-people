var Person = require('../models/person');

module.exports = Backbone.Collection.extend({
    model: Person
});