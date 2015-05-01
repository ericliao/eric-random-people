require('backbone');

module.exports = Backbone.Router.extend({
    routes: {
        "": "home"
    },
    home: function () {
        console.log("home");
    }
});