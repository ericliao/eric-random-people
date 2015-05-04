require('jquery');
require('backbone');

var Router = require('./router');
var router = new Router();

// allow going back in history using .back-button
$('body').on('click', '.back-button', function (event) {
    event.preventDefault();
    window.history.back();
});

Backbone.history.start();