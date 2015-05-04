var RSVP = require('rsvp'),
    Color = require('randomcolor'),
    Person = require('../models/person');

var fetch_json = function (model) {
    // return RSVP deferred promise so we know when fetch is completed
    var deferred = RSVP.defer();
    model.fetch({
        success: function (data) {
            deferred.resolve(data);
        }
    });
    return deferred.promise;
};

module.exports = Backbone.Collection.extend({
    model: Person,
    seed: function () {
        // random seed string generator
        return Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
    },
    generate: function (number, callback) {
        // generate list of seeds to fetch random people we have
        // to do this because the seeds fetched by requesting
        // multiple users (see https://randomuser.me/documentation#multiple)
        // does not generate the same users when specified separately.
        var view = this;
        var seeds = _.range(number).map(function () {
            return view.seed();
        });
        var color_mapping = {};
        var promises = [];
        _.each(seeds, function (seed) {
            var color = Color.randomColor();
            color_mapping[seed] = color;
            var person = new Person({seed: seed, color: color});
            promises.push(fetch_json(person));
        });
        RSVP.all(promises).then(function (fetched) {
            // once all random person are fetched, we set them in the collection
            view.set(fetched);
            callback(color_mapping);
        });
    }
});