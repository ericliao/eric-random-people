var Person = require('../models/person.js');

module.exports = Backbone.Collection.extend({
    model: Person
});