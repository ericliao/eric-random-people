/* @jsx React.DOM */
/* jshint ignore:start */
'use strict';

var React = require('react');

module.exports = Backbone.View.extend({
    initialize: function () {
        var view = this;
        view.render();
        view.collection.on('reset', view.render, view);
    },
    render: function () {
        var view = this;
    }
});
/* jshint ignore:end */