var Person = require('../models/person');

module.exports = Backbone.Collection.extend({
    model: Person,
    seed: function () {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    },
    generate: function (number) {
        // generate list of seeds to fetch random people
        var view = this;
        var seeds = _.range(number).map(function () {
            return view.seed();
        });
        _.each(seeds, function (seed) {
            var person = new Person({seed: seed});
            person.fetch({
                success: function (data) {
                    view.add(data);
                }
            });
        });
    }
});