var Color = require('randomcolor'),
    Person = require('../models/person');

module.exports = Backbone.Collection.extend({
    model: Person,
    seed: function () {
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    },
    generate: function (number) {
        // generate list of seeds to fetch random people we have
        // to do this because the seeds fetched by requesting
        // multiple users (see https://randomuser.me/documentation#multiple)
        // does not generate the same users when specified separately.
        var view = this;
        var seeds = _.range(number).map(function () {
            return view.seed();
        });
        var color_mapping = {};
        _.each(seeds, function (seed) {
            var color = Color.randomColor();
            color_mapping[seed] = color;
            var person = new Person({seed: seed, color: color});
            person.fetch({
                success: function (data) {
                    view.add(data);
                }
            });
        });
        return color_mapping;
    }
});