module.exports = Backbone.Router.extend({

    routes: {
        '': 'home',
        'person/:id': personDetails
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.render().el);

        // Close the search dropdown on click anywhere in the UI
        $('body').click(function () {
            $('.dropdown').removeClass("open");
        });
    },
});