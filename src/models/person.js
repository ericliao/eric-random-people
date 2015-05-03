module.exports = Backbone.Model.extend({
    initialize: function (options) {
        this.seed = options.seed || this.attributes._id;
        this.fetch();
    },
    url: function () {
        // api url to just return this person
        return 'http://api.randomuser.me/?seed=' + this.seed;
    },
    parse: function (response, options) {
        return _.map(response.results, function (result) {
            result.user.seed = result.seed;
            return result.user;
        })[0];
    },
    card_info: function () {
        var person = this.toJSON();
        return {
            'name': person.name,
            'location': person.location,
            'picture': person.picture
        };
    }
});