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
    name: function () {
        return _.map(this.get('name'), function (v, k) {
            return v.capitalize();
        }).join(' ');
    },
    location: function () {
        return _.map(this.get('location'), function (v, k) {
            return v.capitalize();
        }).join(', ');
    },
    card_info: function () {
        var person = this.toJSON();
        return {
            'name': this.name(),
            'location': this.location(),
            'picture': person.picture
        };
    }
});