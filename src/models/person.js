module.exports = Backbone.Model.extend({
    initialize: function (options) {
        this.seed = options.seed || this.attributes._id;
    },
    url: function () {
        // api url to just return this person
        return 'http://api.randomuser.me/?seed=' + this.seed;
    },
    parse: function (response) {
        return _.map(response.results, function (result) {
            result.user._id = result.seed;
            return result.user;
        });
    }
});