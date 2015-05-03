/* @jsx React.DOM */
/* jshint ignore:start */
'use strict';

var React = require('react'),
    People = require('../collections/people'),
    PeopleView = require('../views/people');

module.exports = Backbone.View.extend({
    initialize: function () {
        var view = this;

        // we fetch 10 random users from the API
        view.collection = new People([], {'number': 10});
        view.collection.fetch({
            success: function () {
                view.render();
            }
        });
    },
    render: function () {
        var view = this;
        // initialize view to display list of randome people

        /*
            <div className="topcoat-navigation-bar">
                <div className="topcoat-navigation-bar__item center full">
                    <h1 className="topcoat-navigation-bar__title">Random Person</h1>
                </div>
            </div>
        */
        new PeopleView({
            collection: view.collection,
            el: this.el
        });
    }
});
/* jshint ignore:end */