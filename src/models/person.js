module.exports = Backbone.Model.extend({
    initialize: function (options) {
        this.seed = options.seed;
        this.color = options.color;
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
            if (k === 'street') {
                // separately capitalize street name
                return _.map(v.split(' '), function (_v) {
                    return _v.capitalize();
                }).join(' ');
            } else {
                return v.capitalize();
            }
        }).join(', ');
    },
    dob: function () {
        // convert date of birth to human readable
        var dob = this.get('dob');
        var age = moment().diff(moment.unix(dob), 'years');
        return moment.unix(dob).format('D MMM YYYY') + ' (' + age + ' years old)';
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